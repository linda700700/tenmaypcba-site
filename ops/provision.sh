#!/usr/bin/env bash
# tenmay dataplane — phase 1 provisioning for Ubuntu 24.04 (Alibaba Cloud SWAS, Hong Kong)
#
# What it does, in order:
#   1  checks it is root on Ubuntu 24.04 and shows the machine identity
#   2  timezone, base packages, 2 GB swap
#   3  firewall (22/80/443 only), fail2ban, unattended security updates
#   4  Docker Engine + compose plugin, with log rotation
#   5  /opt/tenmay layout + code pulled from the public repo
#   6  secrets generated locally (Postgres password never leaves this box)
#   7  Postgres + dataplane containers up, health check until it answers
#
# Safe to re-run: every step is idempotent. It never deletes /opt/tenmay/dbdata.
#
#   bash <(curl -fsSL https://raw.githubusercontent.com/linda700700/tenmaypcba-site/src/ops/provision.sh)
#
set -euo pipefail

RAW="https://raw.githubusercontent.com/linda700700/tenmaypcba-site/src/ops"
ROOT="/opt/tenmay"

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()  { printf '\033[1;32m    OK\033[0m  %s\n' "$*"; }
die() { printf '\n\033[1;31m!!  %s\033[0m\n' "$*" >&2; exit 1; }

# unattended-upgrades and apt-daily can hold the dpkg lock for minutes right after
# boot; waiting is correct, killing them is not.
wait_apt() {
  local n=0
  while fuser /var/lib/dpkg/lock-frontend /var/lib/dpkg/lock /var/lib/apt/lists/lock >/dev/null 2>&1; do
    n=$((n+1)); [ "$n" -gt 60 ] && die "apt lock still held after ~10 min — run: ps aux | grep -E 'apt|dpkg'"
    printf '.'; sleep 5
  done
}

# ---------------------------------------------------------------- 1 identity
say "1/7  machine identity"
[ "$(id -u)" = "0" ] || die "run as root (you are $(id -un))"
[ -r /etc/os-release ] || die "/etc/os-release missing — unknown OS"
. /etc/os-release
[ "${ID:-}" = "ubuntu" ] || die "expected Ubuntu, found ${ID:-unknown}"
[ "${VERSION_ID:-}" = "24.04" ] || printf '\033[1;33m    note\033[0m  expected 24.04, found %s — continuing\n' "${VERSION_ID:-?}"
printf '    host      %s\n' "$(hostname)"
printf '    os        %s %s\n' "$PRETTY_NAME" "$(uname -m)"
printf '    cpu/mem   %s vCPU / %s\n' "$(nproc)" "$(free -h | awk '/^Mem:/{print $2}')"
printf '    disk /    %s\n' "$(df -h / | awk 'NR==2{print $2" total, "$4" free"}')"
PUBIP="$(curl -fsS -m 8 https://api.ipify.org 2>/dev/null || true)"
printf '    public ip %s\n' "${PUBIP:-unknown}"

# ------------------------------------------------------- 2 base + swap + tz
say "2/7  base system"
export DEBIAN_FRONTEND=noninteractive
timedatectl set-timezone Asia/Shanghai

# A fresh Ubuntu image starts apt-daily / unattended-upgrades on its own, and that
# can hold the dpkg lock for 10+ minutes (measured: lock still held at 7 min).
# Stop the timers and the running job, then repair anything it left half-configured.
say "2a/7  quieting the automatic apt jobs so they stop holding the lock"
systemctl stop apt-daily.timer apt-daily-upgrade.timer >/dev/null 2>&1 || true
systemctl stop unattended-upgrades.service apt-daily.service apt-daily-upgrade.service >/dev/null 2>&1 || true
pkill -TERM -f '/usr/bin/unattended-upgrade' >/dev/null 2>&1 || true
pkill -TERM -f '/usr/bin/apt-get' >/dev/null 2>&1 || true
sleep 3
dpkg --configure -a >/dev/null 2>&1 || true
ok "automatic apt jobs stopped for the duration of this run"
wait_apt
apt-get update -qq
wait_apt
apt-get install -y -qq --no-install-recommends \
  curl ca-certificates gnupg jq ufw fail2ban unattended-upgrades openssl psmisc procps >/dev/null
ok "packages installed"

if ! swapon --show | grep -q '/swapfile'; then
  if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048 status=none
    chmod 600 /swapfile
    mkswap /swapfile >/dev/null
  fi
  swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  ok "2 GB swap on"
else
  ok "2 GB swap already on"
fi
# Keep the box responsive under a burst rather than OOM-killing the dataplane.
sysctl -qw vm.swappiness=10
grep -q '^vm.swappiness' /etc/sysctl.conf || echo 'vm.swappiness=10' >> /etc/sysctl.conf

# ------------------------------------------------------------- 3 hardening
say "3/7  firewall, fail2ban, security updates"
ufw allow 22/tcp   >/dev/null
ufw allow 80/tcp   >/dev/null
ufw allow 443/tcp  >/dev/null
ufw default deny incoming  >/dev/null
ufw default allow outgoing >/dev/null
ufw --force enable >/dev/null
ok "ufw: $(ufw status | awk 'NR==1{print $2}') — 22, 80, 443 open, everything else denied"

cat >/etc/fail2ban/jail.local <<'EOF'
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5
backend  = systemd

[sshd]
enabled = true
EOF
systemctl enable --now fail2ban >/dev/null 2>&1 || true
systemctl restart fail2ban || true
ok "fail2ban: $(fail2ban-client status sshd 2>/dev/null | awk -F: '/Currently banned/{print $2}' | tr -d ' ' || echo '?') currently banned"

# Switched on at the end of the run instead: enabling it here starts an immediate
# apt run that collides with the docker install below (this actually happened).
ok "unattended security updates deferred to step 6"

# ---------------------------------------------------------------- 4 docker
say "4/7  docker"
if ! command -v docker >/dev/null 2>&1; then
  DOCKER_OK=0
  for attempt in 1 2 3; do
    wait_apt
    if curl -fsSL https://get.docker.com | sh >/dev/null 2>&1; then DOCKER_OK=1; break; fi
    printf '    attempt %s failed, retrying in 15s\n' "$attempt"; sleep 15
  done
  [ "$DOCKER_OK" = "1" ] || { wait_apt; curl -fsSL https://get.docker.com | sh; die "docker install failed"; }
  ok "docker $(docker --version | awk '{print $3}' | tr -d ,)"
else
  ok "docker already installed ($(docker --version | awk '{print $3}' | tr -d ,))"
fi
mkdir -p /etc/docker
cat >/etc/docker/daemon.json <<'EOF'
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" },
  "live-restore": true
}
EOF
systemctl enable --now docker >/dev/null 2>&1
systemctl restart docker
sleep 2
docker info >/dev/null 2>&1 || die "docker daemon is not responding"
ok "docker daemon up, log rotation 10m x3"

# ------------------------------------------------------------ 5 code on box
say "5/7  code into $ROOT"
mkdir -p "$ROOT/dataplane/lib"
fetch() { curl -fsSL -m 30 "$RAW/$1" -o "$2" || die "download failed: $1"; }
fetch dataplane/server.js        "$ROOT/dataplane/server.js"
fetch dataplane/lib/db.js        "$ROOT/dataplane/lib/db.js"
fetch dataplane/package.json     "$ROOT/dataplane/package.json"
fetch dataplane/schema.sql       "$ROOT/dataplane/schema.sql"
fetch compose.yml                "$ROOT/compose.yml"
fetch Caddyfile                  "$ROOT/Caddyfile"
fetch enable-tls.sh              "$ROOT/enable-tls.sh"
chmod +x "$ROOT/enable-tls.sh"
ok "server.js $(wc -c <"$ROOT/dataplane/server.js") bytes, schema.sql, compose.yml, Caddyfile"

# --------------------------------------------------------------- 6 secrets
say "6/7  secrets (generated here, never sent anywhere)"
if [ ! -f "$ROOT/.env" ]; then
  PG_PASS="$(openssl rand -hex 24)"
  umask 077
  cat >"$ROOT/.env" <<EOF
PG_PASSWORD=$PG_PASS
EOF
  ok "postgres password generated"
else
  PG_PASS="$(awk -F= '/^PG_PASSWORD=/{print $2}' "$ROOT/.env")"
  ok "postgres password reused from existing $ROOT/.env"
fi

umask 077
cat >"$ROOT/dataplane.env" <<EOF
PORT=8787
STORE=pg
DATABASE_URL=postgres://tenmay:${PG_PASS}@db:5432/dataplane
ALLOWED_ORIGINS=https://tenmaypcba.com,https://www.tenmaypcba.com,https://tenmay-workbench.site.accio.ai
GATEWAY_URL=https://site-builder.alibaba.com/supabase/v1/sites/q5o1kzml5qqstngt
ANON_KEY=
BOT_EMAIL=
BOT_PASS=
DRY_RUN=0
DEV_ALLOW=0
EOF
chmod 600 "$ROOT/.env" "$ROOT/dataplane.env"
chmod 755 "$ROOT"
ok "env files written, mode 600"

# ------------------------------------------------- 6b security updates on
say "6b/7  switching on unattended security updates"
cat >/etc/apt/apt.conf.d/20auto-upgrades <<'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
EOF
systemctl enable --now unattended-upgrades >/dev/null 2>&1 || true
systemctl start apt-daily.timer apt-daily-upgrade.timer >/dev/null 2>&1 || true
ok "unattended security updates on"

# ------------------------------------------------------------- 7 bring up
say "7/7  starting containers"
cd "$ROOT"
docker compose up -d
printf '    waiting for the dataplane to answer /healthz'
for i in $(seq 1 60); do
  if curl -fsS -m 2 http://127.0.0.1:8787/healthz >/dev/null 2>&1; then
    printf '\n'
    ok "healthz answers after ${i}s: $(curl -fsS -m 2 http://127.0.0.1:8787/healthz)"
    break
  fi
  printf '.'
  sleep 1
  [ "$i" = "60" ] && { printf '\n'; docker compose logs --tail 40 dataplane; die "dataplane did not come up — logs above"; }
done

echo
echo "----------------------------- containers -----------------------------"
docker compose ps
echo
echo "-------------------------- memory footprint --------------------------"
free -h
echo
echo "-------------------------------- done --------------------------------"
echo "phase 1 complete. Public entry (TLS) is phase 2 — it needs DNS first:"
echo "  api.tenmaypcba.com  A  47.82.97.141"
echo "  rt.tenmaypcba.com   A  47.82.97.141"
echo "then run:  bash $ROOT/enable-tls.sh"
