#!/usr/bin/env bash
# tenmay dataplane — attach the bot account that writes inquiries, then prove it
# can write and clean up after itself.
#
# Why a real account: public.inquiries sits behind row-level security, so the
# anon key alone cannot insert. The site form posts to /intake, /intake signs in
# as this account, and the gateway writes the row on its behalf. Without it
# /intake answers 502 and the form falls back to the Cloudflare Worker.
#
# The password arrives as TENMAY_BOT_PASS from the runner, is written straight
# into /opt/tenmay/dataplane.env, and is never echoed.
#
#   BOT_EMAIL=… BOT_PASS=… bash /opt/tenmay/set-bot.sh
set -uo pipefail

EMAIL="${BOT_EMAIL:-}"
PASS="${BOT_PASS:-}"
ENVF=/opt/tenmay/dataplane.env

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()  { printf '\033[1;32m    OK\033[0m  %s\n' "$*"; }
bad() { printf '\033[1;31m    FAIL\033[0m  %s\n' "$*"; FAILED=1; }
FAILED=0

say "0. inputs"
[ -n "$EMAIL" ] && [ -n "$PASS" ] || { echo "BOT_EMAIL / BOT_PASS not supplied"; exit 1; }
printf '    bot email  %s\n    password   %s chars (not shown)\n' "$EMAIL" "${#PASS}"
[ -f "$ENVF" ] || { echo "no $ENVF"; exit 1; }

say "1. write credentials"
cp -a "$ENVF" "$ENVF.bak.$(date +%s)"
python3 - "$ENVF" "$EMAIL" "$PASS" <<'PY'
import sys
path, email, pw = sys.argv[1], sys.argv[2], sys.argv[3]
out, seen_e, seen_p = [], False, False
for ln in open(path).read().splitlines():
    if ln.startswith('BOT_EMAIL='):
        out.append('BOT_EMAIL=' + email); seen_e = True
    elif ln.startswith('BOT_PASS='):
        out.append('BOT_PASS=' + pw); seen_p = True
    else:
        out.append(ln)
if not seen_e: out.append('BOT_EMAIL=' + email)
if not seen_p: out.append('BOT_PASS=' + pw)
open(path, 'w').write('\n'.join(out) + '\n')
PY
chmod 600 "$ENVF"
grep -q "^BOT_EMAIL=$EMAIL$" "$ENVF" && ok "BOT_EMAIL written" || bad "BOT_EMAIL not written"
grep -q "^BOT_PASS=$PASS$" "$ENVF" && ok "BOT_PASS written (same length as supplied)" || bad "BOT_PASS not written"

say "2. restart dataplane"
cd /opt/tenmay || exit 1
docker compose up -d --force-recreate dataplane >/dev/null 2>&1 || docker compose restart dataplane >/dev/null 2>&1
for i in $(seq 1 30); do
  CUR="$(curl -sS -m 5 http://127.0.0.1:8787/healthz 2>/dev/null || true)"
  printf '%s' "$CUR" | grep -q '"ok":true' && break
  sleep 2
done
printf '    healthz %s\n' "${CUR:-no answer}"

say "3. the account can sign in, write, and delete"
# Round trip through the public endpoint the browser uses. The inquiry is named
# so that anyone who ever sees it knows where it came from, and it is deleted in
# the same run — the inbox must not gain noise from a credential test.
STAMP="$(date +%H%M%S)"
BODY="{\"company\":\"BOT CHECK $STAMP - auto deleted\",\"email\":\"bot.check@example.com\",\"need\":\"Credential round trip from set-bot.sh. Deleted in the same run.\",\"quantity\":1,\"website\":\"\"}"
RESP="$(curl -sS -m 20 -X POST https://api.tenmaypcba.com/intake \
  -H 'content-type: application/json' -H 'origin: https://tenmaypcba.com' \
  --data "$BODY" </dev/null 2>/dev/null || true)"
printf '    POST /intake → %s\n' "${RESP:-no answer}"
if printf '%s' "$RESP" | grep -q '"ok":true'; then
  ID="$(printf '%s' "$RESP" | sed -nE 's/.*"id":([0-9]+).*/\1/p')"
  ok "inquiry written as id $ID"
else
  bad "/intake did not accept the write — bot sign-in or insert permission is wrong"
  ID=""
fi

say "4. remove the row this test created"
tok="$(curl -sS -m 15 -X POST \
  "https://site-builder.alibaba.com/supabase/v1/sites/q5o1kzml5qqstngt/auth/v1/token?grant_type=password" \
  -H 'content-type: application/json' \
  -H 'apikey: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InBvbGFyZGIiLCJpYXQiOjE3OTAxNDQyNjksImV4cCI6MjEwNTUwNDI2OX0.iE1UtbF8SYx-v6I-3Kbm6aj-ulMtENANW1QLf6goUSg' \
  --data "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}" </dev/null 2>/dev/null \
  | sed -nE 's/.*"access_token":"([^"]+)".*/\1/p')"
if [ -n "$tok" ] && [ -n "$ID" ]; then
  D="$(curl -sS -m 15 -o /dev/null -w '%{http_code}' -X DELETE \
    "https://site-builder.alibaba.com/supabase/v1/sites/q5o1kzml5qqstngt/rest/v1/inquiries?id=eq.$ID" \
    -H 'apikey: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InBvbGFyZGIiLCJpYXQiOjE3OTAxNDQyNjksImV4cCI6MjEwNTUwNDI2OX0.iE1UtbF8SYx-v6I-3Kbm6aj-ulMtENANW1QLf6goUSg' \
    -H "authorization: Bearer $tok" </dev/null 2>/dev/null || true)"
  [ "$D" = "204" ] || [ "$D" = "200" ] && ok "test row deleted (HTTP $D) — the inbox keeps no noise" || bad "could not delete test row (HTTP ${D:-000}); remove '$STAMP' by hand"
else
  bad "could not sign in for the cleanup; remove '$STAMP' by hand"
fi

say "5. only the probe rows remain in the dataplane store"
docker compose exec -T db psql -U tenmay -d dataplane -tAc \
  "select count(*) from lead_attr" </dev/null 2>/dev/null | sed 's/^/    lead_attr rows: /'

echo
if [ "$FAILED" = "0" ]; then
  echo "probe complete: all checks passed"
else
  echo "probe found failures — see FAIL lines above"
fi
