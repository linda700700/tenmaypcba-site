#!/usr/bin/env bash
# The one way the ops workflow reaches the box. Kept as a file so both ssh calls
# cannot drift apart on which credential they use.
#
# BatchMode in key mode is deliberate: it makes "the key did not work" a visible
# failure instead of a silent fall-through to a password prompt that a CI
# runner cannot answer anyway.
set -uo pipefail

if [ "${AUTH:-}" = "key" ]; then
  exec ssh -i "$HOME/.ssh/id_tenmay" -o IdentitiesOnly=yes -o BatchMode=yes \
    -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    -o ServerAliveInterval=30 -o ServerAliveCountMax=20 "$@"
fi

exec sshpass -e ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
  -o ServerAliveInterval=30 -o ServerAliveCountMax=20 "$@"
