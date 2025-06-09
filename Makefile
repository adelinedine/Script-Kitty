# Makefile for Script Kitty AGI - Universal Dev & Build Automation

.PHONY: all proto proto-all proto-clean test lint build docker-up docker-down clean

all: proto test lint

# --- Protobuf Generation ---
proto:
	@echo "Generating protobufs for all Python services..."
	python -m grpc_tools.protoc -I=shared/proto -I=core/CoreService/schemas -I=skills/src/schemas -I=guardian/src/schemas -I=nexus/src/schemas -I=foundry/src/schemas -I=armory/src/schemas \
		--python_out=core/CoreService --grpc_python_out=core/CoreService \
		shared/proto/*.proto core/CoreService/schemas/core_messages.proto skills/src/schemas/skills_messages.proto guardian/src/schemas/guardian_messages.proto nexus/src/schemas/nexus_messages.proto foundry/src/schemas/foundry_messages.proto armory/src/schemas/armory_messages.proto
	python -m grpc_tools.protoc -I=shared/proto -I=skills/src/schemas --python_out=skills/src/schemas --grpc_python_out=skills/src/schemas shared/proto/*.proto skills/src/schemas/skills_messages.proto
	python -m grpc_tools.protoc -I=shared/proto -I=guardian/src/schemas --python_out=guardian/src/schemas --grpc_python_out=guardian/src/schemas shared/proto/*.proto guardian/src/schemas/guardian_messages.proto
	python -m grpc_tools.protoc -I=shared/proto -I=nexus/src/schemas --python_out=nexus/src/schemas --grpc_python_out=nexus/src/schemas shared/proto/*.proto nexus/src/schemas/nexus_messages.proto
	python -m grpc_tools.protoc -I=shared/proto -I=foundry/src/schemas --python_out=foundry/src/schemas --grpc_python_out=foundry/src/schemas shared/proto/*.proto foundry/src/schemas/foundry_messages.proto
	python -m grpc_tools.protoc -I=shared/proto -I=armory/src/schemas --python_out=armory/src --grpc_python_out=armory/src shared/proto/*.proto armory/src/schemas/armory_messages.proto

proto-all: proto

proto-clean:
	@echo "Cleaning all generated *_pb2.py and *_pb2_grpc.py files..."
	find . -type f \( -name '*_pb2.py' -o -name '*_pb2_grpc.py' \) -delete

# --- Testing ---
test:
	@echo "Running all Python and frontend tests..."
	pytest core/tests
	pytest skills/src/tests
	pytest armory/src/tests
	pytest guardian/src/tests
	pytest foundry/src/tests
	pytest nexus/src/tests
	cd frontend && npm test

# --- Linting ---
lint:
	@echo "Linting all Python and frontend code..."
	flake8 core/CoreService
	flake8 skills/src
	flake8 armory/src
	flake8 guardian/src
	flake8 foundry/src
	flake8 nexus/src
	cd frontend && npm run lint

# --- Docker Compose (if used) ---
docker-up:
	docker compose up -d

docker-down:
	docker compose down

# --- Clean ---
clean:
	@echo "Cleaning build artifacts..."
	find . -type d -name '__pycache__' -exec rm -rf {} +
	find . -type f -name '*.pyc' -delete
	find . -type f -name '*.pyo' -delete
	find . -type f -name '*.log' -delete
