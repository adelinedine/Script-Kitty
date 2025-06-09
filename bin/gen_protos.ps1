# PowerShell script to generate all protobufs for Script Kitty AGI
# Generates Python gRPC code for all services from shared/proto

$ErrorActionPreference = 'Stop'

$sharedProtoDir = Join-Path $PSScriptRoot "..\shared\proto"
$servicesPath = Join-Path $PSScriptRoot "..\services"
$serviceDirs = Get-ChildItem -Path $servicesPath -Directory
$workspaceRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Push-Location $workspaceRoot

foreach ($service in $serviceDirs) {
    $serviceName = Split-Path $service.FullName -Leaf
    $outDir = Join-Path $service.FullName "src\schemas"
    if (-not (Test-Path $outDir)) {
        continue
    }
    # Generate all shared protos into the service's schemas dir
    $sharedProtos = Get-ChildItem -Path "shared/proto" -Filter "*.proto" -File
    foreach ($proto in $sharedProtos) {
        $protoRel = [System.IO.Path]::GetRelativePath($workspaceRoot, $proto.FullName) -replace '\\', '/'
        Write-Host "Generating shared proto $($proto.Name) for $serviceName"
        python -m grpc_tools.protoc -I . --python_out="$outDir" --grpc_python_out="$outDir" "$protoRel"
    }
    # Generate any service-specific protos in the schemas dir
    $serviceProtoDir = "services/$serviceName/src/schemas"
    $serviceProtos = Get-ChildItem -Path $serviceProtoDir -Filter "*.proto" -File
    foreach ($proto in $serviceProtos) {
        $protoRel = [System.IO.Path]::GetRelativePath($workspaceRoot, $proto.FullName) -replace '\\', '/'
        Write-Host "Generating service proto $($proto.Name) for $serviceName"
        python -m grpc_tools.protoc -I . --python_out="$outDir" --grpc_python_out="$outDir" "$protoRel"
    }
}

Pop-Location
Write-Host "Protobuf generation complete."
