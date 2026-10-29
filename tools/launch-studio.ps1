# Membuka Remotion Studio saja. Tidak ada server Editor/Hub lain.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$runtime = Join-Path (Split-Path -Parent $root) 'MotionGraphic-Studio-Backups\Runtime'
New-Item -ItemType Directory -Force -Path $runtime | Out-Null
$processFile = Join-Path $runtime 'studio-process.json'
$url = 'http://127.0.0.1:3000'
function Is-Ready {
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
    return ($response.StatusCode -eq 200 -and $response.Content -match 'remotion')
  } catch {return $false}
}
function Same-Process($record) {
  if (!$record -or !$record.pid -or !$record.root -or $record.root -ne $root) {return $false}
  $p=Get-Process -Id $record.pid -ErrorAction SilentlyContinue
  if (!$p) {return $false}
  return ($p.StartTime.ToUniversalTime().ToString('o') -eq $record.started)
}
$record=$null
if(Test-Path -LiteralPath $processFile){
  try {$record=Get-Content -LiteralPath $processFile -Raw | ConvertFrom-Json} catch {}
}
if (Same-Process $record) {
  if (Is-Ready) {Start-Process $url;exit 0}
  Write-Host 'Remotion Studio sedang disiapkan...' -ForegroundColor Yellow
} else {
  if (Is-Ready) {
    Write-Host 'Port 3000 sudah berisi Remotion Studio lain. Tutup server lama sebelum membuka Master ini.' -ForegroundColor Yellow
    Read-Host 'Tekan Enter untuk menutup'
    exit 1
  }
  $cmd = (Get-Command cmd.exe -ErrorAction Stop).Source
  $stamp = (Get-Date).ToString('yyyyMMdd-HHmmss')
  $stdout = Join-Path $runtime "remotion-$stamp.out.log"
  $stderr = Join-Path $runtime "remotion-$stamp.err.log"
  $env:MOTION_STUDIO_LAUNCHER='1'
  $p=Start-Process -FilePath $cmd -ArgumentList '/d','/c','npm run dev' -WorkingDirectory $root -WindowStyle Hidden -RedirectStandardOutput $stdout -RedirectStandardError $stderr -PassThru
  @{pid=$p.Id;root=$root;started=$p.StartTime.ToUniversalTime().ToString('o');stdout=$stdout;stderr=$stderr} | ConvertTo-Json | Set-Content -LiteralPath $processFile -Encoding UTF8
  $record=Get-Content -LiteralPath $processFile -Raw | ConvertFrom-Json
}
for($i=0;$i -lt 150;$i++) {
  if(Is-Ready){Start-Process $url;exit 0}
  Start-Sleep -Seconds 2
  if(!(Same-Process $record)){break}
}
Write-Host 'Remotion Studio belum terbuka. Periksa log berikut:' -ForegroundColor Red
Write-Host $record.stdout
Write-Host $record.stderr
Read-Host 'Tekan Enter untuk menutup'
exit 1
