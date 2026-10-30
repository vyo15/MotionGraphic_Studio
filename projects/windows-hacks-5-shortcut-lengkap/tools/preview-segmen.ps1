# Preview per segmen - render LANGSUNG dari source Remotion asli di Master.
# Tidak mengubah manifest, source, project lain, atau komposisi utama.
$ErrorActionPreference = 'Stop'

$projectFolder = Split-Path -Parent $PSScriptRoot
$projectSlug = Split-Path -Leaf $projectFolder
$projectsFolder = Split-Path -Parent $projectFolder
$master = Split-Path -Parent $projectsFolder
$manifestPath = Join-Path $projectFolder 'motiongraphic-video.json'

function Fail([string]$message) {
    Write-Host "[ERROR] $message" -ForegroundColor Red
    exit 1
}

if (!(Test-Path $manifestPath)) { Fail 'motiongraphic-video.json tidak ditemukan.' }
$manifest = Get-Content -Raw -Encoding UTF8 $manifestPath | ConvertFrom-Json
if ($projectSlug -ne $manifest.slug) { Fail "Folder '$projectSlug' harus sama dengan slug manifest '$($manifest.slug)'." }
if ((Split-Path -Leaf $projectsFolder) -ne 'projects') { Fail "Tempatkan folder add-on di MotionGraphic-Studio\projects\$projectSlug\ dahulu." }
if (!(Test-Path (Join-Path $master 'package.json'))) { Fail 'Master Studio tidak ditemukan dua tingkat di atas folder project.' }
if (!(Test-Path (Join-Path $master 'src\index.ts'))) { Fail 'src\index.ts Master tidak ditemukan.' }
$remotion = Join-Path $master 'node_modules\.bin\remotion.cmd'
if (!(Test-Path $remotion)) { Fail 'Remotion CLI belum tersedia. Dari Master jalankan npm install (satu kali), lalu coba lagi.' }

$sections = @(
    @{No='00';Label='HOOK — Opening';Start=0;End=239;File='00-hook.mp4'},
    @{No='01';Label='CTRL + SHIFT + T — Browser';Start=240;End=524;File='01-ctrl-shift-t.mp4'},
    @{No='02';Label='CTRL + SHIFT + ESC — Task Manager';Start=525;End=854;File='02-ctrl-shift-esc.mp4'},
    @{No='03';Label='WIN + SHIFT + S — Screenshot';Start=855;End=1184;File='03-win-shift-s.mp4'},
    @{No='04';Label='WIN + E — File Explorer';Start=1185;End=1514;File='04-win-e.mp4'},
    @{No='05';Label='CTRL + SHIFT + N — Folder dan Bonus';Start=1515;End=2084;File='05-ctrl-shift-n.mp4'},
    @{No='06';Label='CTA — Penutup';Start=2085;End=2204;File='06-cta.mp4'}
)

if ($manifest.id -ne 'WindowsHacks5ShortcutLengkap') { Fail "ID tidak cocok: $($manifest.id)." }
if ($manifest.durationInFrames -ne 2205 -or $manifest.fps -ne 30) {
    Fail 'Timing sumber berubah. Perbarui batas frame di tools\preview-segmen.ps1 sebelum menjalankan.'
}

Write-Host ''
Write-Host '=== WINDOWS HACKS: PREVIEW PER SEGMEN ===' -ForegroundColor Cyan
Write-Host 'Memakai source original, BUKAN video simulasi.'
Write-Host 'Pilih satu segmen untuk dilihat dahulu, atau 7 untuk semua segmen.'
Write-Host ''
foreach ($s in $sections) {
    Write-Host " $($s.No) - $($s.Label)  ($([math]::Round(($s.End-$s.Start+1)/30,1)) detik)"
}
Write-Host ' 07 - Semua segmen (7 file MP4)'
Write-Host ' Q  - Batal'
Write-Host ''
$choice = (Read-Host 'Masukkan nomor').Trim().ToUpperInvariant()
if ($choice -eq 'Q' -or $choice -eq '') { Write-Host 'Dibatalkan.'; exit 0 }

if ($choice -eq '07' -or $choice -eq '7') {
    $selected = $sections
} else {
    $selected = @($sections | Where-Object { $_.No -eq $choice -or [string][int]$_.No -eq $choice })
}
if ($selected.Count -eq 0) { Fail 'Pilihan tidak dikenal. Gunakan 00 sampai 07.' }

$outDir = Join-Path $master ("out\segment-previews\" + $projectSlug)
New-Item -Path $outDir -ItemType Directory -Force | Out-Null

Push-Location $master
try {
    Write-Host ''
    Write-Host '[SYNC] Memastikan source addon sudah terdaftar pada satu Master...' -ForegroundColor Yellow
    & npm.cmd run sync
    if ($LASTEXITCODE -ne 0) { Fail 'npm run sync gagal. Cek terminal dari Master.' }
    foreach ($s in $selected) {
        $outFile = Join-Path $outDir $s.File
        $range = "$($s.Start)-$($s.End)"
        Write-Host ''
        Write-Host "[RENDER] $($s.Label) | frames $range -> $outFile" -ForegroundColor Green
        & $remotion render 'src/index.ts' $manifest.id $outFile "--frames=$range" '--codec=h264' '--crf=20'
        if ($LASTEXITCODE -ne 0) { Fail "Render segmen $($s.No) gagal. Lihat pesan Remotion di atas." }
        if (!(Test-Path $outFile)) { Fail "File output tidak ditemukan: $outFile" }
        Write-Host "[OK] $outFile" -ForegroundColor Green
    }
} finally {
    Pop-Location
}
Write-Host ''
Write-Host '[SELESAI] File MP4 asli dipisah tanpa mengubah video utama.' -ForegroundColor Green
Write-Host "Lokasi: $outDir"
Start-Process explorer.exe -ArgumentList @($outDir) | Out-Null
