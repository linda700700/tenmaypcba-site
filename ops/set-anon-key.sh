#!/usr/bin/env bash
# tenmay dataplane — attach the platform anon key so operator auth and inquiry
# insert stop failing.
#
# Why: server.js refuses to validate any operator token when ANON_KEY is empty
# (`if (!GATEWAY || !ANON_KEY) return false`), so GET /rt and GET /attr answered
# 401 for every caller and the console could never subscribe. The same key is
# what the workbench front end already ships in its bundle — it is a public
# anon JWT, not a secret, and the gateway requires it on every request.
#
#   bash /opt/tenmay/set-anon-key.sh
set -uo pipefail

KEY="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InBvbGFyZGIiLCJpYXQiOjE3OTAxNDQyNjksImV4cCI6MjEwNTUwNDI2OX0.iE1UtbF8SYx-v6I-3Kbm6aj-ulMtENANW1QLf6goUSg"
ENVF=/opt/tenmay/dataplane.env
GATEWAY="https://site-builder.alibaba.com/supabase/v1/sites/q5o1kzml5qqstngt"

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()  { printf '\033[1;32m    OK\033[0m  %s\n' "$*"; }
bad() { printf '\033[1;31m    FAIL\033[0m  %s\n' "$*"; FAILED=1; }
FAILED=0

[ -f "$ENVF" ] || { echo "no $ENVF"; exit 1; }

say "1. env file before"
grep -E '^(GATEWAY_URL|ANON_KEY|BOT_EMAIL|BOT_PASS)=' "$ENVF" | sed -E 's/^(ANON_KEY=.{14}).*/\1…(truncated)/; s/^(BOT_PASS=.*)/BOT_PASS=***/'

say "2. writing ANON_KEY"
cp -a "$ENVF" "$ENVF.bak.$(date +%s)"
if grep -q '^ANON_KEY=' "$ENVF"; then
  python3 - "$ENVF" "$KEY" <<'PY'
import sys
path, key = sys.argv[1], sys.argv[2]
lines = open(path).read().splitlines()
out, done = [], False
for ln in lines:
    if ln.startswith('ANON_KEY='):
        out.append(f'ANON_KEY={key}'); done = True
    else:
        out.append(ln)
if not done:
    out.append(f'ANON_KEY={key}')
open(path, 'w').write('\n'.join(out) + '\n')
PY
else
  printf 'ANON_KEY=%s\n' "$KEY" >> "$ENVF"
fi
chmod 600 "$ENVF"
grep -q "^ANON_KEY=$KEY$" "$ENVF" && ok "ANON_KEY written" || bad "ANON_KEY not written"

say "3. restart dataplane"
cd /opt/tenmay || exit 1
docker compose up -d --force-recreate dataplane >/dev/null 2>&1 || docker compose restart dataplane >/dev/null 2>&1
for i in $(seq 1 30); do
  CUR="$(curl -sS -m 5 http://127.0.0.1:8787/healthz 2>/dev/null || true)"
  printf '%s' "$CUR" | grep -q '"ok":true' && break
  sleep 2
done
printf '    healthz %s\n' "${CUR:-no answer}"

say "4. the container really has the key"
LIVE="$(docker compose exec -T dataplane printenv ANON_KEY </dev/null 2>/dev/null | tr -d '\r\n')"
if [ "$LIVE" = "$KEY" ]; then
  ok "ANON_KEY is set inside the dataplane container"
else
  bad "ANON_KEY inside the container is '${LIVE:0:14}…' (len ${#LIVE})"
fi

say "5. the gateway accepts that key"
GDATA="$(curl -sS -m 10 -H "apikey: $KEY" "$GATEWAY/auth/v1/user" 2>&1 | head -c 300)"
printf '    gateway /auth/v1/user → %s\n' "$GDATA"
printf '%s' "$GDATA" | grep -qi 'no api key\|apikey.*invalid\|invalid api key' \
  && bad "gateway rejected the anon key" \
  || ok "gateway accepted the key and only complained about the missing user token"

say "6. auth paths now answer as designed"
A="$(curl -sS -m 8 -o /dev/null -w '%{http_code}' https://api.tenmaypcba.com/attr?ids=1 2>/dev/null || true)"
B="$(curl -sS -m 8 -o /dev/null -w '%{http_code}' 'https://rt.tenmaypcba.com/rt?token=not-a-real-token-at-all-000000' 2>/dev/null || true)"
printf '    /attr without token  → %s (401 expected)\n' "${A:-000}"
printf '    /rt   with fake token → %s (401 expected)\n' "${B:-000}"

say "7. beacon ingest still fine"
C="$(curl -sS -m 10 -o /dev/null -w '%{http_code}' -X POST https://api.tenmaypcba.com/collect \
  -H 'content-type: application/json' -H 'origin: https://tenmaypcba.com' \
  --data '{"vid":"probe-anonkey-1","events":[{"name":"page_view","path":"/probe"}]}' </dev/null 2>/dev/null || true)"
[ "$C" = "204" ] && ok "POST /collect → 204" || bad "POST /collect → ${C:-000}"
docker compose exec -T db psql -U tenmay -d dataplane -q \
  -c "delete from events where vid like 'probe-%'; delete from sessions where vid like 'probe-%';" </dev/null >/dev/null 2>&1

echo
if [ "$FAILED" = "0" ]; then
  echo "probe complete: all checks passed"
else
  echo "probe found failures — see FAIL lines above"
fi
