$ErrorActionPreference = "Stop"

$nodeDir = "C:\Program Files\nodejs"
$npm = Join-Path $nodeDir "npm.cmd"

if (!(Test-Path $npm)) {
  throw "npm was not found at $npm. Install Node.js LTS from https://nodejs.org, then reopen PowerShell."
}

$env:Path = "$nodeDir;$env:Path"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Installing backend dependencies..."
Push-Location (Join-Path $root "backend")
& $npm install

Write-Host "Seeding MongoDB Atlas with demo user and 15 customers..."
& $npm run seed
Pop-Location

Write-Host "Installing frontend dependencies..."
Push-Location (Join-Path $root "frontend")
& $npm install
Pop-Location

Write-Host ""
Write-Host "Setup complete."
Write-Host "Open two PowerShell terminals and run:"
Write-Host "  .\run-backend.ps1"
Write-Host "  .\run-frontend.ps1"
