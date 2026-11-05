# ============================================================
# Royal Today — Manual Trigger Script
# ============================================================

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir
$nodeExe = "D:\laragon\bin\nodejs\node-v22\node.exe"

if (-not (Test-Path $nodeExe)) {
    $nodeCmd = Get-Command node -ErrorAction SilentlyContinue
    if ($nodeCmd) {
        $nodeExe = $nodeCmd.Source
    } else {
        $nodeExe = "node"
    }
}

$scriptPath = Join-Path $projectDir "scripts\generate-today.js"

Set-Location $projectDir
& $nodeExe "$scriptPath" @args
