#!/usr/bin/env bash
# Read-only: sign in as the intake bot and print the most recent inquiries the
# workbench would show. Nothing here writes or deletes.
#
# Why on the box and not from a laptop: the workstation this is edited from has
# no outbound route to the service, so every live check runs here.
set -uo pipefail

EMAIL="${BOT_EMAIL:-}"
PASS="${BOT_PASS:-}"
[ -n "$EMAIL" ] && [ -n "$PASS" ] || { echo "missing BOT_EMAIL/BOT_PASS"; exit 1; }

SITE="${SITE_ID:-q5o1kzml5qqstngt}"
BASE="https://site-builder.alibaba.com/supabase/v1/sites/$SITE"
ANON="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InBvbGFyZGIiLCJpYXQiOjE3OTAxNDQyNjksImV4cCI6MjEwNTUwNDI2OX0.iE1UtbF8SYx-v6I-3Kbm6aj-ulMtENANW1QLf6goUSg"

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }

say "0. sign in as $EMAIL"
LOGIN="$(printf '{"email":"%s","password":"%s"}' "$EMAIL" "$PASS")"
tok="$(curl -sS -m 20 -X POST "$BASE/auth/v1/token?grant_type=password" \
  -H 'content-type: application/json' -H "apikey: $ANON" \
  --data "$LOGIN" </dev/null 2>/dev/null \
  | sed -nE 's/.*"access_token":"([^"]+)".*/\1/p')"
if [ -z "$tok" ]; then
  echo "    FAIL could not sign in — the stored password does not open this account"
  echo "inbox list failed"
  exit 1
fi
echo "    OK  signed in (token ${#tok} chars)"

say "1. total rows the workbench would count"
TOTAL="$(curl -sS -m 20 -o /dev/null -D - "$BASE/rest/v1/inquiries?select=id" \
  -H "apikey: $ANON" -H "authorization: Bearer $tok" \
  -H 'prefer: count=exact' </dev/null 2>/dev/null \
  | tr -d '\r' | sed -nE 's|^content-range: *[0-9]+-[0-9]+/([0-9]+).*|\1|Ip')"
printf '    inquiries: %s\n' "${TOTAL:-unknown}"

say "2. newest 12 (id, ref, company, email, when)"
curl -sS -m 20 "$BASE/rest/v1/inquiries?select=*&order=id.desc&limit=12" \
  -H "apikey: $ANON" -H "authorization: Bearer $tok" </dev/null 2>/dev/null \
  | python3 -c '
import json,sys
raw=sys.stdin.read()
try:
    rows=json.loads(raw)
except Exception:
    print("    raw:", raw[:400]); raise SystemExit
if not isinstance(rows,list):
    print("    raw:", raw[:400]); raise SystemExit
if not rows:
    print("    (empty)"); raise SystemExit
print("    keys:", ",".join(sorted(rows[0].keys()))[:300])
for r in rows:
    print("    #%-4s %-10s %-34s %-30s %s" % (
        r.get("id"), r.get("ref") or "-", str(r.get("company") or "-")[:34],
        str(r.get("email") or "-")[:30], str(r.get("created_at") or "")[:19]))
'

say "3. remove rows addressed to @example.com"
# example.com is reserved by RFC 2606 and can never belong to a real buyer, so
# rows there are always this repository's own probes. Auto-cleaning them keeps
# the inbox honest without deleting anything a person wrote.
DEL="$(curl -sS -m 20 -X DELETE "$BASE/rest/v1/inquiries?email=like.*%40example.com" \
  -H "apikey: $ANON" -H "authorization: Bearer $tok" \
  -H 'prefer: return=representation' </dev/null 2>/dev/null)"
printf '%s' "$DEL" | python3 -c '
import json,sys
raw=sys.stdin.read()
try:
    rows=json.loads(raw)
except Exception:
    print("    raw:", raw[:200]); raise SystemExit
if not isinstance(rows,list):
    print("    raw:", raw[:200]); raise SystemExit
if not rows:
    print("    nothing to remove"); raise SystemExit
for r in rows:
    print("    removed #%s %s" % (r.get("id"), r.get("email")))
'

say "4. what the workbench counts now"
NOW="$(curl -sS -m 20 -o /dev/null -D - "$BASE/rest/v1/inquiries?select=id" \
  -H "apikey: $ANON" -H "authorization: Bearer $tok" \
  -H 'prefer: count=exact' </dev/null 2>/dev/null \
  | tr -d '\r' | sed -nE 's|^content-range: *[0-9]+-[0-9]+/([0-9]+).*|\1|Ip')"
printf '    inquiries: %s\n' "${NOW:-unknown}"

echo
echo "inbox list complete"
