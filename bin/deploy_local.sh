#!/bin/bash
# Build and deploy all Script Kitty AGI services locally using Helm (Linux/macOS)
set -euo pipefail

DOCKER_REGISTRY_PREFIX=script-kitty-local

# 1. Build Docker images
for d in ../services/*; do
  if [ -f "$d/Dockerfile" ]; then
    echo "Building Docker image for $(basename $d)"
    docker build -t "$DOCKER_REGISTRY_PREFIX/$(basename $d):latest" "$d"
  fi
done

# 2. Deploy via Helm
helm upgrade --install script-kitty-local ../infrastructure/helm --namespace default --wait

echo "Deployment complete. Run 'kubectl get pods -n default' to check status."
