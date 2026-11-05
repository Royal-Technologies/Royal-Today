# ============================================================
# Royal Today — Windows Task Scheduler Setup
# Runs daily at 00:01 AM (Midnight) to generate today's card
# ============================================================

$taskName = "RoyalToday_DailyGenerator"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir
$nodeExe = "D:\laragon\bin\nodejs\node-v22\node.exe"

if (-not (Test-Path $nodeExe)) {
    $nodeCmd = Get-Command node -ErrorAction SilentlyContinue
    if ($nodeCmd) {
        $nodeExe = $nodeCmd.Source
    } else {
        Write-Error "Node.js executable could not be found. Please install Node.js."
        exit 1
    }
}

$scriptPath = Join-Path $projectDir "scripts\generate-today.js"

Write-Host "Setting up Windows Task Scheduler for Royal Today..." -ForegroundColor Cyan
Write-Host "Task Name:   $taskName"
Write-Host "Node Path:   $nodeExe"
Write-Host "Script Path: $scriptPath"

# Action
$action = New-ScheduledTaskAction -Execute $nodeExe -Argument "`"$scriptPath`"" -WorkingDirectory $projectDir

# Trigger: Daily at 12:01 AM
$trigger = New-ScheduledTaskTrigger -Daily -At "00:01AM"

# Settings
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# Register Task
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Force

Write-Host "`n✅ Scheduled task '$taskName' registered successfully!" -ForegroundColor Green
Write-Host "To run manually anytime: npm run generate" -ForegroundColor Yellow
