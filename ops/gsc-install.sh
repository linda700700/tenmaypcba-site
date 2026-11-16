#!/usr/bin/env bash
# Search Console: install the key, apply the schema, take the first pull.
#
# Runs on the Hong Kong box as root, streamed over ssh by the `server` workflow
# on the ops-run branch. The service-account JSON is written to
# /opt/tenmay/secrets/gsc.json by the workflow step just before this runs; it is
# never echoed, never committed and never appears in a log line — every message
# here prints the file's size and the account's client_email, nothing else.
#
# Safe to re-run. Three guards, because this restarts a container that carries
# live inquiries and the realtime stream:
#   * the previous dataplane tree is kept in /opt/tenmay/dataplane.prev and the
#     container is restored from it if the new code does not come back healthy
#   * every changed .js file is syntax-checked inside the container before the
#     restart, so a typo cannot take the service down
#   * the aggregate SQL is executed against the live schema before the restart
#
#   ./tmssh -p 22 root@47.82.97.141 'bash -s' < ops/gsc-install.sh
set -euo pipefail

RAW="https://raw.githubusercontent.com/linda700700/tenmaypcba-site/src/ops"
ROOT="/opt/tenmay"
KEY="$ROOT/secrets/gsc.json"
ENVF="$ROOT/dataplane.env"
DC="docker compose"

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()  { printf '\033[1;32m    OK\033[0m  %s\n' "$*"; }
die() { printf '\n\033[1;31m!!  %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" = "0" ] || die "run as root"
[ -d "$ROOT" ] || die "$ROOT missing — run ops/provision.sh first"
cd "$ROOT"

say "1/8  checking what arrived"
[ -s "$KEY" ] || die "no key at $KEY — the workflow step that writes it did not run"
chmod 700 "$ROOT/secrets"; chmod 600 "$KEY"
BYTES=$(wc -c < "$KEY" | tr -d ' ')
EMAIL=$(python3 - "$KEY" <<'PY' 2>/dev/null || true
import json,sys
print(json.load(open(sys.argv[1])).get("client_email",""))
PY
)
if [ -z "$EMAIL" ]; then
  # python3 is not guaranteed on a minimal image; fall back to grep so a valid
  # key is not rejected just because the interpreter is missing.
  EMAIL=$(tr -d '\n' < "$KEY" | grep -o '"client_email"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"\([^"]*\)"$/\1/')
fi
[ -n "$EMAIL" ] || die "$KEY does not look like a service-account json (no client_email)"
case "$EMAIL" in
  *iam.gserviceaccount.com) ;;
  *) die "client_email '$EMAIL' is not a service account address" ;;
esac
ok "key $BYTES bytes, account $EMAIL"

say "2/8  fetching the current dataplane code (previous tree kept for rollback)"
rm -rf "$ROOT/dataplane.prev"
cp -a "$ROOT/dataplane" "$ROOT/dataplane.prev"
for f in server.js gsc-sync.mjs schema-gsc.sql lib/db.js lib/gsc.js lib/gsc-sync.js; do
  curl -fsS -m 30 "$RAW/dataplane/$f" -o "$ROOT/dataplane/$f" || die "could not fetch $f"
done
curl -fsS -m 30 "$RAW/compose.yml" -o "$ROOT/compose.yml" || die "could not fetch compose.yml"
ok "code updated from the src branch · rollback copy at $ROOT/dataplane.prev"

say "3/8  environment"
touch "$ENVF"; chmod 600 "$ENVF"
add_env() {
  local k="$1" v="$2"
  if grep -qE "^${k}=" "$ENVF"; then
    sed -i "s|^${k}=.*|${k}=${v}|" "$ENVF"
  else
    printf '%s=%s\n' "$k" "$v" >> "$ENVF"
  fi
}
add_env GSC_SA_FILE "/etc/tenmay/secrets/gsc.json"
add_env GSC_SITE "https://tenmaypcba.com/"
add_env GSC_DAYS "10"
add_env GSC_LAG_DAYS "3"
ok "GSC_SA_FILE / GSC_SITE / GSC_DAYS written to $ENVF"

say "4/8  schema"
$DC exec -T db psql -U tenmay -d dataplane -v ON_ERROR_STOP=1 -f - < "$ROOT/dataplane/schema-gsc.sql" >/dev/null \
  || die "schema failed"
ok "gsc_daily / gsc_sync present"

say "5/8  pre-flight: do the new queries and files hold up?"
# The same three aggregates the endpoints run, forced to return zero rows. A typo
# in a column name fails here instead of after the restart.
$DC exec -T db psql -U tenmay -d dataplane -v ON_ERROR_STOP=1 -q \
  -c "select coalesce(sum(clicks),0)::int, (sum(position*impressions)/nullif(sum(impressions),0))::float8 from gsc_daily where dim='date' and false" \
  -c "select key, sum(clicks)::int, (sum(position*impressions)/nullif(sum(impressions),0))::float8 from gsc_daily where dim='page' and false group by key" \
  -c "select day::text, clicks, impressions, position from gsc_daily where dim='date' and false" >/dev/null \
  || die "the /seo queries do not run against this schema - not restarting"
# The fetched files are already visible inside the container through the /app mount.
for f in server.js gsc-sync.mjs lib/db.js lib/gsc.js lib/gsc-sync.js; do
  $DC exec -T dataplane node --check "/app/$f" >/dev/null || die "syntax error in $f - not restarting"
done
ok "queries and files check out"

say "6/8  restarting the dataplane so it sees the key mount"
$DC up -d --force-recreate dataplane >/dev/null
HEALTHY=0
for i in $(seq 1 60); do
  if curl -fsS -m 3 http://127.0.0.1:8787/healthz >/dev/null 2>&1; then HEALTHY=1; break; fi
  sleep 2
done
if [ "$HEALTHY" != "1" ]; then
  printf '\n\033[1;31m!!  the new build did not come up - rolling back to the previous tree\033[0m\n'
  $DC logs --tail 40 dataplane || true
  rm -rf "$ROOT/dataplane.rollback"
  mv "$ROOT/dataplane" "$ROOT/dataplane.rollback"
  mv "$ROOT/dataplane.prev" "$ROOT/dataplane"
  $DC up -d --force-recreate dataplane >/dev/null || true
  sleep 10
  curl -fsS -m 5 http://127.0.0.1:8787/healthz && printf '\nrolled back, service healthy again\n'
  die "aborted; the box is running the previous version"
fi
ok "healthy again"

say "7/8  first pull (180 days - GSC keeps 16 months)"
$DC exec -T dataplane node gsc-sync.mjs --days=180 2>&1 | tail -3
ok "pull finished"

say "8/8  daily schedule"
cat > /etc/cron.d/tenmay-gsc <<'CRON'
# Search Console pull, every morning. GSC finalises a day 2-3 days late, so each
# run re-pulls the last 10 days and overwrites them rather than trusting one shot.
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
17 6 * * * root cd /opt/tenmay && docker compose exec -T dataplane node gsc-sync.mjs --days=10 >> /var/log/tenmay-gsc.log 2>&1
CRON
chmod 644 /etc/cron.d/tenmay-gsc
ok "cron: 06:17 daily, log /var/log/tenmay-gsc.log"

printf '\n--- rows stored per dimension ---\n'
$DC exec -T db psql -U tenmay -d dataplane -A -F' | ' -c \
  "select dim, count(*) as rows, min(day) as first_day, max(day) as last_day from gsc_daily group by dim order by dim" || true

printf '\n--- what the console will now see ---\n'
curl -fsS -m 10 http://127.0.0.1:8787/healthz | tr ',' '\n' | grep -E 'configured|status|window_from|window_to|rows_written|note' || true

printf '\n\033[1;32mgsc install complete: %s\033[0m\n' "$EMAIL"
