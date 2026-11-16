#!/usr/bin/env bash
# Proves the contract the website's form actually uses, from a public network.
#
# What this does NOT do: run the page's JavaScript. It reproduces the exact
# request the bundle makes — same origin header, same preflight, same JSON
# shape — so a CORS mistake or a field-name drift shows up here instead of in a
# browser. The one thing it cannot catch is a JavaScript error inside the page.
set -uo pipefail

SITE_URL="https://tenmaypcba.com/"
API="https://api.tenmaypcba.com"
ORIGIN="https://tenmaypcba.com"
STAMP="$(date -u +%Y%m%d-%H%M%S)"
EMAIL="${SAMPLE_EMAIL:-check@tenmaypcba.com}"

pass=0; fail=0
ok()   { echo "    PASS $*"; pass=$((pass+1)); }
bad()  { echo "    FAIL $*"; fail=$((fail+1)); }
say()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }

say "1. the live page still ships the bundle that calls this endpoint"
HTML="$(curl -sSL -m 25 "$SITE_URL" 2>/dev/null)"
ENTRY="$(printf '%s' "$HTML" | grep -oE '/assets/index-[A-Za-z0-9_-]+\.js' | head -1)"
echo "    entry: ${ENTRY:-none}"
if [ -z "$ENTRY" ]; then bad "no bundle reference in the page"; else
  JS="$(curl -sSL -m 25 "https://tenmaypcba.com$ENTRY" 2>/dev/null)"
  echo "    bundle: $(printf '%s' "$JS" | wc -c | tr -d ' ') bytes"
  case "$JS" in
    *"api.tenmaypcba.com/intake"*) ok "bundle posts to api.tenmaypcba.com/intake" ;;
    *) bad "bundle does not contain the intake endpoint" ;;
  esac
  case "$JS" in
    *"workers.dev"*) bad "bundle still mentions the old worker" ;;
    *) ok "no reference to the old Cloudflare worker" ;;
  esac
fi

say "2. CORS preflight, exactly as the browser sends it"
PRE="$(curl -sS -i -m 20 -X OPTIONS "$API/intake" \
  -H "Origin: $ORIGIN" \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: content-type' 2>/dev/null | tr -d '\r')"
echo "$PRE" | sed -n '1p;/^[Aa]ccess-[Cc]ontrol/p' | sed 's/^/    /'
echo "$PRE" | head -1 | grep -qE ' 204| 200' && ok "preflight answered" || bad "preflight did not answer 204/200"
echo "$PRE" | grep -qiE "^access-control-allow-origin: *(\*|https://tenmaypcba\.com)" \
  && ok "origin allowed" || bad "allow-origin header missing or wrong"
echo "$PRE" | grep -qiE '^access-control-allow-headers:.*content-type' \
  && ok "content-type allowed" || bad "content-type not allowed in preflight"

say "3. one submission with the form's exact payload shape"
# Copy of what src/components/RfqFunnel.jsx sends. website is the honeypot and
# must stay empty; vid is absent when the tracker is disarmed, which is how
# JSON.stringify drops an undefined value.
BODY=$(printf '{"company":"SAMPLE ROW - acceptance check %s (safe to delete)","email":"%s","channel":"form","process":"turnkey","quantity":50,"need":"Service wanted: turnkey\\nQuantity band: 50 pcs\\n\\nProject notes:\\nWritten by browser-contract.sh to prove the public form path. Not a real buyer.","website":""}' "$STAMP" "$EMAIL")
OUT="$(curl -sS -m 25 -X POST "$API/intake" \
  -H "Origin: $ORIGIN" -H "Referer: $ORIGIN/" \
  -H 'content-type: application/json' -d "$BODY" \
  -w '\n__http=%{http_code}' 2>/dev/null)"
CODE="$(printf '%s' "$OUT" | sed -nE 's/.*__http=([0-9]+).*/\1/p')"
JSON="$(printf '%s' "$OUT" | sed 's/__http=.*//')"
echo "    http=$CODE body=${JSON:-<empty>}"
printf '%s' "$JSON" | grep -q '"ok": *true' && ok "accepted" || bad "not accepted"
REF="$(printf '%s' "$JSON" | sed -nE 's/.*"ref": *"([^"]+)".*/\1/p')"
ID="$(printf '%s' "$JSON" | sed -nE 's/.*"id": *([0-9]+).*/\1/p')"
echo "    reference: ${REF:-none}   id: ${ID:-none}"
[ -n "$REF" ] && ok "reference returned" || bad "no reference returned"

say "4. the row is really in the table the workbench reads"
if [ -n "${ID:-}" ]; then
  SITE="${SITE_ID:-q5o1kzml5qqstngt}"
  BASE="https://site-builder.alibaba.com/supabase/v1/sites/$SITE"
  ANON="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InBvbGFyZGIiLCJpYXQiOjE3OTAxNDQyNjksImV4cCI6MjEwNTUwNDI2OX0.iE1UtbF8SYx-v6I-3Kbm6aj-ulMtENANW1QLf6goUSg"
  LOGIN="$(printf '{"email":"%s","password":"%s"}' "${BOT_EMAIL:-}" "${BOT_PASS:-}")"
  tok="$(curl -sS -m 20 -X POST "$BASE/auth/v1/token?grant_type=password" \
    -H 'content-type: application/json' -H "apikey: $ANON" --data "$LOGIN" </dev/null 2>/dev/null \
    | sed -nE 's/.*"access_token":"([^"]+)".*/\1/p')"
  if [ -z "$tok" ]; then bad "could not sign in to read back"; else
    ROW="$(curl -sS -m 20 "$BASE/rest/v1/inquiries?select=id,email,customer,created_at&id=eq.$ID" \
      -H "apikey: $ANON" -H "authorization: Bearer $tok" </dev/null 2>/dev/null)"
    echo "    $ROW"
    printf '%s' "$ROW" | grep -q "\"id\": *$ID" && ok "row $ID readable in inquiries" || bad "row $ID not found"
  fi
fi

printf '\n    ---- %d passed, %d failed ----\n' "$pass" "$fail"
[ "$fail" -eq 0 ] && echo "browser contract complete: all checks passed" || echo "browser contract incomplete"
[ "$fail" -eq 0 ] || exit 1
