# PowerShell script to tear down all Script Kitty AGI local deployments and clean up resources

$ErrorActionPreference = 'Continue'

Write-Host "Stopping all Script Kitty local Kubernetes clusters and containers..."

# Remove Helm release
$releaseName = "script-kitty-local"
$namespace = "default"
helm uninstall $releaseName -n $namespace 2>$null

# Delete all Kubernetes resources in the default namespace
kubectl delete all --all -n $namespace --ignore-not-found

# Remove Docker images for all services
$services = Get-ChildItem -Path "../services" -Directory | ForEach-Object { $_.Name }
$DOCKER_REGISTRY_PREFIX = "script-kitty-local"
foreach ($service in $services) {
    $image = "$DOCKER_REGISTRY_PREFIX/$service:latest"
    docker rmi -f $image 2>$null
}

Write-Host "All Script Kitty services and clusters have been stopped and cleaned up."
