# Stop proses Remotion Studio yang diluncurkan oleh launcher, tanpa membunuh app lain.
$root = Split-Path -Parent $PSScriptRoot
$store = Join-Path (Split-Path -Parent $root) 'MotionGraphic-Studio-Backups\Runtime\studio-process.json'
if (!(Test-Path -LiteralPath $store)) {Write-Host 'Tidak ada proses Remotion dari launcher yang tercatat.';exit 0}
try {$record=Get-Content -LiteralPath $store -Raw | ConvertFrom-Json} catch {Write-Host 'File proses tidak valid.';exit 1}
if (!$record.root -or $record.root -ne $root) {Write-Host 'Catatan proses berasal dari Master lain. Tidak dihentikan.';exit 1}
$p=Get-Process -Id $record.pid -ErrorAction SilentlyContinue
if (!$p) {Remove-Item -LiteralPath $store -Force;Write-Host 'Remotion sudah berhenti.';exit 0}
if ($p.StartTime.ToUniversalTime().ToString('o') -ne $record.started) {Write-Host 'PID telah digunakan proses lain. Tidak dihentikan.';exit 1}
& taskkill.exe /PID $record.pid /T /F | Out-Host
if ($LASTEXITCODE -eq 0) {Remove-Item -LiteralPath $store -Force;Write-Host 'Remotion Studio dihentikan.'} else {exit 1}
