# Script Kitty AGI

# WORK IN PROGRESS 

## Project Structure

- `core/` - Core Orchestrator service (gRPC, LLM, planning, tracing, metrics)
- `skills/` - Specialized agent skills (Knowledge, Code, Data, etc.)
- `armory/` - Tool execution, resource provisioning
- `foundry/` - Agent/model registry and provisioning
- `guardian/` - Policy enforcement, compliance, safety
- `nexus/` - User/session management, API gateway
- `frontend/` - Web UI (Vite/React)
- `shared/proto/` - Shared protobuf definitions for all services
- `bin/` - Automation scripts (setup, deploy, proto generation)
- `templates/` - Kubernetes Helm YAMLs for all services
- `tools/` - CLI, scripts, dev helpers
- `data/` - Data storage (features, raw, processed)
- `docs/` - Architecture, design, and implementation docs

## Quickstart

1. **Install dependencies:**
   - Run `bin/dev_setup.ps1` (Windows) or `bin/dev_setup.sh` (Linux/macOS)
2. **Generate protobufs:**
   - Run `bin/gen_protos.ps1` or `make proto`
3. **Build and deploy locally:**
   - Run `bin/deploy_local.ps1` (Kubernetes/Helm)
4. **Run tests:**
   - `make test` or run pytest in each service

## Current Implementation 
- All cross-service messages use shared protobufs in `shared/proto/`
- Each service has its own `requirements.txt`, `Dockerfile`, and `tests/`
- Observability: Prometheus metrics and OpenTelemetry tracing in every service
- Use `.env` for environment variables (see `.env.example`)
- All automation scripts are in `bin/` and are cross-platform
- Proto generation is automated and required before building images

## Helm Chart Packaging Note

The Helm chart context is now strictly limited to only the following files:
- `Chart.yaml`
- `values.yaml`
- `templates/` (all service deployment YAMLs)
- `README.md` (optional)

All service source code, build artifacts (e.g., `dist/`, `node_modules/`), and dependencies are excluded from the chart package via `.helmignore`. This ensures the chart remains small and deployable, and avoids file size errors during `helm upgrade/install`.


## Generating TypeScript Types from Protobufs (Frontend)

To ensure strict type safety and contract enforcement between backend and frontend, TypeScript types are generated from proto files using [ts-proto](https://github.com/stephenh/ts-proto):

1. **Install dependencies:**
   - Already handled by `npm install` in `frontend/` (see `devDependencies` for `ts-proto` and `protobufjs`).
2. **Generate types:**
   - Run `npm run gen:proto` from the `frontend/` directory (Windows/PowerShell)
   - Or run `npm run gen:proto:sh` (Linux/macOS)
   - This will generate TypeScript files in `frontend/src/shared/proto/` for all proto files in `shared/proto/`.

## Contributing
- See `docs/architecture/` for design and implementation details
- Run `make lint` before submitting PRs
- All new features must include tests

---

For more, see the full documentation in `docs/` and the implementation status in `IMPLEMENTATION_STATUS.md`.
