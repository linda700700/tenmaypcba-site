#!/usr/bin/env bash
# Authorises one specific key for root@ this box, so the deploy pipeline can stop
# using the root password.
#
# Why this exists: the ops workflow used to authenticate with the root password
# held in a GitHub secret. A password cannot be scoped, cannot be revoked on its
# own, and its value is reusable everywhere. A key can be deleted from
# authorized_keys in one line, and revoking it never touches the account
# password.
#
# The public key below is public by definition. The matching private key lives
# only in the SWAS_SSH_KEY secret; nothing in this repository can authenticate.
set -uo pipefail

PUB='ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAsLgyRTw/r1W2qT/G727xSwtY0onLobY6hM9TALQmVA tenmay-ops@github-actions'
MARK='tenmay-ops@github-actions'

echo "== installing the ops key =="
install -d -m 700 /root/.ssh
touch /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys

if grep -qF "$MARK" /root/.ssh/authorized_keys; then
  echo "key already authorised — nothing to add"
else
  printf '%s\n' "$PUB" >> /root/.ssh/authorized_keys
  echo "key appended to /root/.ssh/authorized_keys"
fi

echo
echo "== authorized keys now =="
awk '{print $1, $NF}' /root/.ssh/authorized_keys
echo
echo "== fingerprints =="
ssh-keygen -lf /root/.ssh/authorized_keys 2>/dev/null || echo "(could not read fingerprints)"

echo
# Report the effective setting rather than editing it. PubkeyAuthentication is
# "yes" by default, and appending a stanza to sshd_config risks landing inside a
# Match block, which is a good way to break the very login being tested.
echo "== sshd effective settings =="
sshd -T 2>/dev/null | grep -iE '^(pubkeyauthentication|passwordauthentication|permitrootlogin)' || echo "(sshd -T unavailable)"

echo "ssh key install complete"
