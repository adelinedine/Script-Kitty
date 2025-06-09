# PowerShell script to build and deploy all Script Kitty AGI services locally using Helm
# Builds Docker images for all services and deploys via infrastructure/helm

$ErrorActionPreference = 'Stop'

$services = Get-ChildItem -Path "../services" -Directory | ForEach-Object { $_.Name }
$DOCKER_REGISTRY_PREFIX = "script-kitty-local"

Write-Host "[1/3] Building Docker images for all services"
foreach ($service in $services) {
    $servicePath = "../services/$service"
    if (Test-Path (Join-Path $servicePath "Dockerfile")) {
        Write-Host "Building Docker image for $service"
        docker build -t "$DOCKER_REGISTRY_PREFIX/$service:latest" $servicePath
    }
}

Write-Host "[2/3] Deploying all services via Helm"
$helmChartPath = "../infrastructure/helm"
$releaseName = "script-kitty-local"
$namespace = "default"

helm upgrade --install $releaseName $helmChartPath --namespace $namespace --wait

Write-Host "[3/3] Deployment complete. Run 'kubectl get pods -n $namespace' to check status."
