# Script Kitty AGI: Proto & Service Standardization - CONTINUATION PLAN

## Current Status (as of June 9, 2025)
- All `.proto` files and generated proto Python files have been deleted from the workspace.
- All main service entrypoints have been standardized (logging, imports, exception handling, etc.).
- All proto-related automation scripts and Makefile have been audited and reference a consistent set of proto files.
- All `schemas/` and `shared/proto/` directories have been audited for structure and contents.
- All import and proto attribute errors have been flagged in main service files.

## Next Steps (To Continue)

### 1. Restore Required `.proto` Files
- Restore the following `.proto` files to their correct locations:
  - `shared/proto/agent_status.proto`
  - `shared/proto/common_types.proto`
  - `shared/proto/llm_service.proto`
  - `shared/proto/script_kitty_messages.proto`
  - `core/CoreService/schemas/core_messages.proto`
  - `skills/src/schemas/skills_messages.proto`
  - `guardian/src/schemas/guardian_messages.proto`
  - `nexus/src/schemas/nexus_messages.proto`
  - `foundry/src/schemas/foundry_messages.proto`
  - `armory/src/schemas/armory_messages.proto`

### 2. Update Proto Generation Scripts (if needed)
- Ensure `bin/gen_protos.ps1`, `bin/gen_protos.sh`, and the Makefile reference the correct proto file paths and output directories.

### 3. Regenerate Proto Python Files
- Run `pwsh bin/gen_protos.ps1` (or the appropriate script) to regenerate all proto Python files.
- Confirm that generated files are placed in the correct `schemas/` directories for each service.

### 4. Update Service Imports
- Update all service code to use the correct import paths for generated proto files.
- Remove any stale or incorrect proto imports.

### 5. Revalidate and Fix Errors
- Revalidate all imports and proto attribute usage in all services.
- Fix any remaining errors or inconsistencies.

### 6. Final Audit
- Ensure all logging, imports, and proto usage are correct and consistent across the codebase.
- Document any remaining issues or TODOs for future contributors.

---

**This document should be updated as progress continues.**
