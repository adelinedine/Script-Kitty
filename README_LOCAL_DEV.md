# Script Kitty AGI: Local Development & Testing Guide

## Quickstart (Windows, PowerShell)

1. **Clone the repository**
2. **Open a PowerShell terminal in the project root**
3. **Run the all-in-one setup and deployment script:**

```pwsh
pwsh bin/setup_and_deploy.ps1
```

- This will install all dependencies, generate protobufs, build Docker images, start a local Kubernetes cluster, and deploy all services.
- No user input is required.

## Project Structure Overview
- `core/`, `armory/`, `skills/`, `guardian/`, `foundry/`, `nexus/`: Python microservices (each with Dockerfile, requirements, and tests)
- `frontend/`: Modern web UI (Vite/TypeScript)
- `shared/proto/`: All protobuf definitions (regenerate with `bin/gen_protos.ps1`)
- `bin/`: All automation scripts (PowerShell and Bash)
- `templates/`: Kubernetes manifests (used by Helm umbrella chart)

## Regenerating Protobufs
If you change any `.proto` files, run:
```pwsh
pwsh bin/gen_protos.ps1
```

## Running/Stopping Everything
- **Deploy all:** `pwsh bin/setup_and_deploy.ps1`
- **Stop all:** `pwsh bin/kill_script_kitty.ps1`

## Running Tests
Each service has a `tests/` directory. To run all Python tests:
```pwsh
pytest
```
Or run service-specific tests from the relevant directory.

## Troubleshooting
- Ensure Docker Desktop is running before starting.
- If you see import errors, check that all `__init__.py` files exist and that you are running from the project root.
- For proto issues, always regenerate with the provided script.

## Contributing
- Tylenol
---
For more, see `README.md` and `docs/`.
