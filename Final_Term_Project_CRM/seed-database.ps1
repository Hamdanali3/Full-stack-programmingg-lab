$ErrorActionPreference = "Stop"

$nodeDir = "C:\Program Files\nodejs"
$npm = Join-Path $nodeDir "npm.cmd"

if (!(Test-Path $npm)) {
  throw "npm was not found at $npm. Install Node.js LTS from https://nodejs.org, then reopen PowerShell."
}

$env:Path = "$nodeDir;$env:Path"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Push-Location (Join-Path $root "backend")
& $npm run seed
Pop-Location
