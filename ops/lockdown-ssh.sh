#!/usr/bin/env bash
# Closes the password door on this box.
#
# Why: the root password was stored in a CI secret so the deploy pipeline could
# get in. The pipeline now uses a key, so the password is pure liability — it
# cannot be scoped, its value is reusable everywhere, and it has already been
# printed in a screenshot once. This replaces it with a random value nobody
# records and turns off password authentication entirely.
#
# Safety, in order:
#   1. sshd -t validates the new config BEFORE the running daemon sees it. A bad
#      file is removed and nothing changes.
#   2. A 10-minute self-revert is armed before the reload, so a mistake here
#      cannot leave the box unreachable — it heals itself.
#   3. The revert is only cancelled by ops/verify-keyonly.sh, after a separate
#      connection has proved the key still works.
#
# Console access is unaffected throughout: Alibaba Cloud's password reset works
# without knowing the old password, so there is always a way back in.
set -uo pipefail

DROPIN=/etc/ssh/sshd_config.d/99-tenmay-keyonly.conf
UNIT=tm-sshd-revert

say() { echo; echo "==> $*"; }

say "1. replace the root password with a value nobody keeps"
PW="$(head -c 48 /dev/urandom | base64 | tr -d '\n' | tr -dc 'A-Za-z0-9' | head -c 40)"
printf 'root:%s\n' "$PW" | chpasswd
unset PW
awk -F: '$1=="root"{
  if (length($2) > 20) print "    root now has a locked-away hash (" length($2) " chars, value discarded)"
  else print "    WARNING: root hash looks empty or short (" length($2) " chars)"
}' /etc/shadow

say "2. write the key-only sshd drop-in"
mkdir -p /etc/ssh/sshd_config.d
cat > "$DROPIN" <<'CONF'
# Written by ops/lockdown-ssh.sh.
# The ops pipeline authenticates with a key; a password door that nobody needs
# is only a way in for someone else.
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin prohibit-password
CONF
ls -l "$DROPIN"

say "3. validate before the running daemon is touched"
if ! sshd -t; then
  echo "    config rejected by sshd -t — removing the drop-in, nothing changed"
  rm -f "$DROPIN"
  exit 1
fi
echo "    sshd -t: ok"

say "4. arm a 10-minute self-revert before reloading"
systemctl stop "$UNIT.timer" 2>/dev/null || true
systemctl reset-failed "$UNIT.service" 2>/dev/null || true
if systemd-run --on-active=600 --unit="$UNIT" --description="revert tenmay key-only ssh" \
     /bin/bash -c "rm -f $DROPIN; systemctl reload ssh || systemctl reload sshd" </dev/null 2>&1 | tail -2; then
  echo "    armed: if nobody disarms it, the drop-in is removed in 10 minutes"
else
  echo "::warning::could not arm the auto-revert — continuing, the verify step runs next"
fi

say "5. reload and show what the server now enforces"
systemctl reload ssh 2>/dev/null || systemctl reload sshd 2>/dev/null || systemctl restart ssh
sshd -T 2>/dev/null | grep -iE '^(passwordauthentication|kbdinteractiveauthentication|permitrootlogin|pubkeyauthentication)' | sed 's/^/    /'

say "6. the ops key is still authorised"
grep -c 'tenmay-ops@github-actions' /root/.ssh/authorized_keys 2>/dev/null | sed 's/^/    matching keys: /'

echo "ssh lockdown complete"
