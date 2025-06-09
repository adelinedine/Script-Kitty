#!/bin/bash
# Unified setup script for Script Kitty AGI (Linux/macOS)
set -euo pipefail

# 1. Python, Node, Go check
command -v python3 || { echo 'Python 3.10+ required'; exit 1; }
command -v node || { echo 'Node.js 18+ required'; exit 1; }
command -v go || echo 'Go not found (required only for Go services)'

# 2. Python deps
for d in ../services/*; do
  [ -f "$d/requirements.txt" ] && pip3 install -r "$d/requirements.txt"
done

# 3. Frontend deps
if [ -f ../frontend/package.json ]; then
  (cd ../frontend && npm install)
fi

# 4. Poetry
command -v poetry || pip3 install poetry

echo 'Setup complete. Run bin/gen_protos.sh to generate protobufs.'
