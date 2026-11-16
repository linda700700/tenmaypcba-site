#!/usr/bin/env bash
# tenmay dataplane — phase 3 probe: is the beacon armed and does /collect actually store?
#
# Read-only except for one probe event, which is deleted again before this exits.
# Run from the server (it has public egress; the local box does not).
#
#   bash /opt/tenmay/probe-live.sh
set -uo pipefail

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()  { printf '\033[1;32m    OK\033[0m  %s\n' "$*"; }
bad() { printf '\033[1;31m    FAIL\033[0m  %s\n' "$*"; FAILED=1; }
FAILED=0

say "1. public site reachable"
CODE="$(curl -sS -o /dev/null -m 15 -w '%{http_code}' https://tenmaypcba.com/ || true)"
[ "$CODE" = "200" ] && ok "https://tenmaypcba.com/ → 200" || bad "https://tenmaypcba.com/ → ${CODE:-000}"

say "2. beacon file served and armed"
BEACON="$(curl -sS -m 15 https://tenmaypcba.com/tm-data.js || true)"
if printf '%s' "$BEACON" | grep -q "var ENDPOINT = 'https://api.tenmaypcba.com';"; then
  ok "tm-data.js has ENDPOINT armed"
else
  bad "tm-data.js is still disarmed or not served"
  printf '    first 3 lines: %s\n' "$(printf '%s' "$BEACON" | head -3 | tr '\n' ' ')"
fi

say "3. page loads the beacon"
HTML="$(curl -sSL -m 20 https://tenmaypcba.com/ || true)"
N="$(printf '%s' "$HTML" | grep -c 'tm-data.js' || true)"
if [ "${N:-0}" -ge 1 ]; then
  ok "index.html references tm-data.js ($N refs, ${#HTML} bytes)"
else
  bad "index.html does not reference tm-data.js (${#HTML} bytes fetched)"
  printf '    first 160 chars: %s\n' "$(printf '%s' "$HTML" | head -c 160 | tr '\n' ' ')"
fi
ARMED="$(printf '%s' "$HTML" | grep -o "ENDPOINT = '[^']*'" | head -1 || true)"
printf '    inline copy: %s\n' "${ARMED:-none}"

say "4. ingest accepts a beacon event"
VID="probe-$(date +%s)-$RANDOM"
BODY="{\"vid\":\"$VID\",\"events\":[{\"name\":\"page_view\",\"path\":\"/probe\",\"ref\":\"probe\",\"utm_source\":\"probe\",\"utm_medium\":\"probe\",\"utm_campaign\":\"probe\"}]}"
OUT="$(curl -sS -m 15 -o /dev/null -w '%{http_code}' \
  -X POST https://api.tenmaypcba.com/collect \
  -H 'content-type: application/json' \
  -H 'origin: https://tenmaypcba.com' \
  --data "$BODY" || true)"
[ "$OUT" = "204" ] && ok "POST /collect → 204" || bad "POST /collect → ${OUT:-000}"

say "5. row landed in postgres, then removed"
cd /opt/tenmay || exit 1
# stdin must be /dev/null on every exec: this whole script is being fed to bash on
# stdin, and a container that reads stdin eats the rest of the script.
ROWS="$(docker compose exec -T db psql -U tenmay -d dataplane -tAc \
  "select count(*) from events where vid='$VID'" </dev/null 2>/dev/null | tr -d '[:space:]')"
SESS="$(docker compose exec -T db psql -U tenmay -d dataplane -tAc \
  "select landing from sessions where vid='$VID'" </dev/null 2>/dev/null | tr -d '[:space:]')"
if [ "$ROWS" = "1" ]; then
  ok "events row stored, sessions.landing=$SESS"
else
  bad "expected 1 event row for $VID, got '${ROWS:-none}'"
fi
# also sweeps up the row left behind by the earlier interrupted probe run
docker compose exec -T db psql -U tenmay -d dataplane -q \
  -c "delete from events where vid like 'probe-%'; delete from sessions where vid like 'probe-%';" \
  </dev/null >/dev/null 2>&1 \
  && ok "all probe rows deleted" || bad "could not delete probe rows"

say "6. console stream is up"
ON="$(curl -sS -m 10 https://api.tenmaypcba.com/stats/online || true)"
printf '    /stats/online → %s\n' "${ON:-no answer}"
printf '    open SSE clients: %s\n' "$(curl -sS -m 10 https://api.tenmaypcba.com/healthz || true)"

say "7. tls certificate"
echo | openssl s_client -connect api.tenmaypcba.com:443 -servername api.tenmaypcba.com 2>/dev/null \
  | openssl x509 -noout -issuer -dates 2>/dev/null | sed 's/^/    /'

echo
if [ "$FAILED" = "0" ]; then
  echo "probe complete: all checks passed"
else
  echo "probe found failures — see FAIL lines above"
fi
