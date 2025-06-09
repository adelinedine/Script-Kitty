#!/bin/bash
# Generate all protobufs for Script Kitty AGI (Linux/macOS)
set -euo pipefail

shared_proto="../shared/proto"
for d in ../services/*; do
  if [ -d "$d/src/schemas" ]; then
    for proto in "$d"/src/schemas/*.proto; do
      [ -f "$proto" ] || continue
      echo "Generating proto for $(basename $proto) in $(basename $d)"
      python3 -m grpc_tools.protoc -I $shared_proto -I "$d/src/schemas" --python_out="$d/src/schemas" --grpc_python_out="$d/src/schemas" $shared_proto/*.proto "$proto"
    done
  fi
done

echo 'Protobuf generation complete.'
