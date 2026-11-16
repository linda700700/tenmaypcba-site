#!/usr/bin/env bash
# tenmay dataplane — phase 2: public HTTPS entry for api. and rt.
#
# Prerequisites: phase 1 done, and these two records must already resolve to this
# server. Caddy asks Let's Encrypt over HTTP-01 on port 80, so DNS must be live
# before this runs, otherwise the challenge fails and it retries with backoff.
#
#   api.tenmaypcba.com  A  47.82.97.141
#   rt.tenmaypcba.com   A  47.82.97.141
#
#   bash /opt/tenmay/enable-tls.sh
#
set -euo pipefail

DOMAINS="api.tenmaypcba.com rt.tenmaypcba.com"
MAIL="admin@tenmaypcba.com"

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()  { printf '\033[1;32m    OK\033[0m  %s\n' "$*"; }
die() { printf '\n\033[1;31m!!  %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" = "0" ] || die "run as root"

# ------------------------------------------------------------ DNS pre-check
say "checking DNS"
MYIP="$(curl -fsS -m 8 https://api.ipify.org || true)"
printf '    this server  %s\n' "${MYIP:-unknown}"
MISS=""
for d in $DOMAINS; do
  RIP="$(getent ahostsv4 "$d" | awk 'NR==1{print $1}' || true)"
  if [ -z "$RIP" ]; then
    printf '\033[1;33m    pending\033[0m      %s → no A record yet\n' "$d"
    MISS="$MISS $d"
  elif [ "$RIP" != "$MYIP" ]; then
    printf '\033[1;33m    pending\033[0m      %s → %s (not this server)\n' "$d" "$RIP"
    MISS="$MISS $d"
  else
    printf '\033[1;32m    OK\033[0m           %s → %s\n' "$d" "$RIP"
  fi
done
if [ -n "$MISS" ]; then
  printf '\n\033[1;31m!!  DNS not ready:%s\033[0m\n' "$MISS"
  echo "Add those A records first, wait for propagation, then re-run this script."
  echo "Caddy is installed but stays stopped — nothing is broken, just deferred."
  exit 2
fi

# ---------------------------------------------------------------- install
say "installing caddy"
if ! command -v caddy >/dev/null 2>&1; then
  apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https curl gnupg >/dev/null
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    > /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -qq
  apt-get install -y -qq caddy >/dev/null
fi
ok "caddy $(caddy version | awk '{print $1}')"

# ---------------------------------------------------------------- config
say "writing Caddyfile"
{
  echo "{"
  echo "	email $MAIL"
  echo "}"
  echo
  cat /opt/tenmay/Caddyfile
} > /etc/caddy/Caddyfile
caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1 \
  || { caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile; die "Caddyfile is invalid"; }
ok "Caddyfile valid (flush_interval -1 on rt. keeps SSE unbuffered)"

systemctl enable --now caddy >/dev/null 2>&1
systemctl reload caddy 2>/dev/null || systemctl restart caddy
ok "caddy running"

# ---------------------------------------------------------------- verify
say "verifying from the public side"
FAIL=""
for d in $DOMAINS; do
  CODE=""
  for i in $(seq 1 30); do
    CODE="$(curl -sS -o /dev/null -m 8 -w '%{http_code}' "https://$d/healthz" 2>/dev/null || true)"
    [ "$CODE" = "200" ] && break
    sleep 2
  done
  if [ "$CODE" = "200" ]; then
    ok "https://$d/healthz → 200  $(curl -sS -m 6 "https://$d/healthz")"
  else
    printf '\033[1;31m    FAIL\033[0m   https://%s/healthz → %s\n' "$d" "${CODE:-000}"
    echo "----- caddy log (last 40) -----"
    journalctl -u caddy -n 40 --no-pager 2>/dev/null || true
    FAIL="$FAIL $d"
  fi
done
[ -z "$FAIL" ] || die "HTTPS not reachable for:$FAIL (see caddy log above)"

echo
echo "phase 2 complete. Next: point the site at the dataplane"
echo "  public/tm-data.js:  var ENDPOINT = 'https://api.tenmaypcba.com';"
