#!/usr/bin/env bash
# Remove the inquiry row the browser e2e check created.
#
# The check has to write a real row to prove the path works, and a row in the
# inbox looks exactly like a real lead. This deletes only rows whose company
# column carries the check's own marker, so it can never touch a buyer.
#
# Kept as a file rather than inline in the workflow: the request needs quotes
# and a JSON body, and escaping both inside a YAML block scalar is a way to
# ship a broken URL without noticing.
set -uo pipefail

EMAIL="${BOT_EMAIL:-}"
PASS="${BOT_PASS:-}"
if [ -z "$EMAIL" ] || [ -z "$PASS" ]; then
  echo "::warning::no bot credentials; leaving the check row for ops/inspect-inbox.sh"
  exit 0
fi

SITE="${SITE_ID:-q5o1kzml5qqstngt}"
BASE="https://site-builder.alibaba.com/supabase/v1/sites/$SITE"
ANON="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InBvbGFyZGIiLCJpYXQiOjE3OTAxNDQyNjksImV4cCI6MjEwNTUwNDI2OX0.iE1UtbF8SYx-v6I-3Kbm6aj-ulMtENANW1QLf6goUSg"

LOGIN="$(printf '{"email":"%s","password":"%s"}' "$EMAIL" "$PASS")"
TOK="$(curl -sS -m 20 -X POST "$BASE/auth/v1/token?grant_type=password" \
  -H 'content-type: application/json' -H "apikey: $ANON" \
  --data "$LOGIN" </dev/null 2>/dev/null \
  | sed -nE 's/.*"access_token":"([^"]+)".*/\1/p')"

if [ -z "$TOK" ]; then
  echo "::warning::could not sign in; leaving the check row for ops/inspect-inbox.sh"
  exit 0
fi

RESP="$(curl -sS -m 20 -X DELETE "$BASE/rest/v1/inquiries?customer=like.SAMPLE%20ROW*" \
  -H "apikey: $ANON" -H "authorization: Bearer $TOK" \
  -H 'prefer: return=representation' </dev/null 2>/dev/null)"

printf 'cleanup removed: %s\n' "$(printf '%s' "$RESP" | head -c 300)"
