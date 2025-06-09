# PowerShell script to set up all dependencies for Script Kitty AGI (Windows)
# Installs Python, Node.js, Go, Poetry, and frontend dependencies for all services

$ErrorActionPreference = 'Stop'

Write-Host "[1/4] Installing Python, Node.js, and Go (if not present)"
# Recommend using winget or choco for Windows package management
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "Python not found. Please install Python 3.10+ manually or via winget/choco."
    exit 1
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js not found. Please install Node.js 18+ manually or via winget/choco."
    exit 1
}
if (-not (Get-Command go -ErrorAction SilentlyContinue)) {
    Write-Host "Go not found. Please install Go 1.22+ manually or via winget/choco if you need to build Go services."
}

Write-Host "[2/4] Installing Python dependencies for all services"
$serviceDirs = Get-ChildItem -Path "../services" -Directory
foreach ($service in $serviceDirs) {
    $req = Join-Path $service.FullName "requirements.txt"
    if (Test-Path $req) {
        Write-Host "Installing Python deps for $($service.Name)"
        pip install -r $req
    }
}

Write-Host "[3/4] Installing frontend dependencies"
if (Test-Path "../frontend/package.json") {
    Push-Location ../frontend
    npm install
    Pop-Location
}

Write-Host "[4/4] Installing Poetry (if needed)"
if (-not (Get-Command poetry -ErrorAction SilentlyContinue)) {
    pip install poetry
}

Write-Host "Setup complete. Run bin/gen_protos.ps1 to generate protobufs."
