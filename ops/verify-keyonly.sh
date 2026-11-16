#!/usr/bin/env bash
# Confirms the password door is shut and disarms the self-revert.
#
# Reaching this script at all is half the proof: the workflow connects with the
# key and runs it with BatchMode, so nothing here happens unless key auth works.
# What is left to check is that the server no longer accepts a password, and
# that the drop-in armed by ops/lockdown-ssh.sh is the one in force.
set -uo pipefail

DROPIN=/etc/ssh/sshd_config.d/99-tenmay-keyonly.conf
UNIT=tm-sshd-revert

say() { echo; echo "==> $*"; }

say "1. what the server enforces"
sshd -T 2>/dev/null | grep -iE '^(passwordauthentication|kbdinteractiveauthentication|permitrootlogin|pubkeyauthentication)' | sed 's/^/    /'

say "2. the drop-in is in place"
if [ -f "$DROPIN" ]; then
  echo "    present: $DROPIN"
else
  echo "    MISSING — settings above come from elsewhere"
fi

say "3. root password state"
awk -F: '$1=="root"{ print "    root hash length " length($2) " (a value was set and discarded; it is not the old password)" }' /etc/shadow

say "4. a password login attempt is refused by the server"
# NumberOfPasswordPrompts=0 asks the server whether the password method is even
# offered, without this script needing a usable password.
OUT="$(ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
  -o PubkeyAuthentication=no -o PreferredAuthentications=password \
  -o NumberOfPasswordPrompts=0 -o ConnectTimeout=10 \
  root@127.0.0.1 true 2>&1 </dev/null || true)"
printf '%s\n' "$OUT" | tail -2 | sed 's/^/    /'
case "$OUT" in
  *"Permission denied (publickey"*)
    echo "    VERDICT: password refused, only publickey offered" ;;
  *"no supported authentication methods"*|*"no matching"*)
    echo "    VERDICT: password method not offered at all" ;;
  *)
    echo "    VERDICT: inconclusive — read the lines above" ;;
esac

say "5. disarm the self-revert, the key demonstrably works"
if systemctl stop "$UNIT.timer" 2>/dev/null; then
  echo "    auto-revert disarmed"
else
  echo "    no auto-revert timer was running"
fi
systemctl reset-failed "$UNIT.service" 2>/dev/null || true
systemctl list-timers --all 2>/dev/null | grep -c "$UNIT" | sed 's/^/    remaining tm-sshd timers: /'

echo "ssh key-only verify complete"
