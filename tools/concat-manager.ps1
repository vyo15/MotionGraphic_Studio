# Concat GitHub SOURCE launcher for MotionGraphic Studio v1.8.1 (Windows PowerShell 5.1+).
# Uses official GitHub release MSI as an archive via administrative extraction (/a),
# never normal /i installation, never registers a Concat application in Windows.
# Keeps GitHub source for optional compilation. No Rust required for normal launch.
# Existing npm run concat command can keep invoking: -Action launch
[CmdletBinding()]
param(
    [ValidateSet('launch', 'setup', 'clone', 'status', 'build')]
    [string]$Action = 'launch',
    [switch]$SoftwareGraphics
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$appRoot = Join-Path $root 'apps\concat'
$sourceRoot = Join-Path $appRoot 'source'
$rustRoot = Join-Path $sourceRoot 'src'
$depsRoot = Join-Path $appRoot 'deps'
$repoUrl = 'https://github.com/jub0t/Concat.git'
$repoTag = $null # resolved from the latest official GitHub release; source tag matches binary release
$portableRoot = Join-Path $appRoot 'runtime'
$portableCurrent = Join-Path $portableRoot 'current'
$cacheRoot = Join-Path $appRoot 'cache'
$script:releaseCache = $null
$buildStamp = Join-Path $depsRoot 'build-stamp.json'

function Protect-FromMasterGit {
    $ignorePath = Join-Path $root '.gitignore'
    if (-not (Test-Path -LiteralPath $ignorePath -PathType Leaf)) { return }
    $oldText = Get-Content -LiteralPath $ignorePath -Raw
    if ($oldText -notmatch '(?m)^/?apps/concat/?\s*$') {
        Add-Content -LiteralPath $ignorePath -Value "`n# Concat source, build outputs and locally downloaded build dependencies`n/apps/concat/"
        Write-Host '[GIT] Folder apps/concat/ dikecualikan dari commit Master.'
    }
}

function Get-AvailableCommand([string]$name) {
    $result = Get-Command $name -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($null -eq $result) { return $null }
    return $result.Source
}

function Ensure-Source {
    $cargoFile = Join-Path $rustRoot 'Cargo.toml'
    $gitDir = Join-Path $sourceRoot '.git'
    if ((Test-Path -LiteralPath $gitDir) -and (Test-Path -LiteralPath $cargoFile -PathType Leaf)) {
        Write-Host '[SOURCE] Menggunakan hasil clone GitHub yang sudah ada (tidak melakukan git pull otomatis).'
        return
    }
    if (Test-Path -LiteralPath $sourceRoot) {
        throw 'apps\concat\source sudah ada tetapi bukan clone Concat yang lengkap. Pindahkan/backup folder tersebut, lalu coba lagi.'
    }
    $git = Get-AvailableCommand 'git.exe'
    if (-not $git) { $git = Get-AvailableCommand 'git' }
    if (-not $git) { throw 'Git tidak ditemukan. Git for Windows diperlukan untuk git clone repository Concat.' }
    Protect-FromMasterGit
    New-Item -ItemType Directory -Path $appRoot -Force | Out-Null
    $release = Get-OfficialRelease
    $repoTag = $release.tag
    Write-Host "[GITHUB] Clone source resmi ($repoTag): $repoUrl"
    Write-Host "[TUJUAN] $sourceRoot"
    $tempSource = Join-Path $appRoot ('source-downloading-' + [guid]::NewGuid().ToString('N'))
    try {
        & $git clone --depth 1 --branch $repoTag $repoUrl $tempSource
        if ($LASTEXITCODE -ne 0) { throw "git clone gagal, exit code $LASTEXITCODE. Periksa koneksi." }
        if (-not (Test-Path -LiteralPath (Join-Path $tempSource 'src\Cargo.toml') -PathType Leaf)) {
            throw 'Clone tidak lengkap: src\Cargo.toml tidak ditemukan.'
        }
        Move-Item -LiteralPath $tempSource -Destination $sourceRoot
    } finally {
        if (Test-Path -LiteralPath $tempSource) { Remove-Item -LiteralPath $tempSource -Recurse -Force -ErrorAction SilentlyContinue }
    }
}

function Get-OfficialRelease {
    if ($script:releaseCache) { return $script:releaseCache }
    # Only a release and download hosted by the official project are accepted.
    $apiUrl = 'https://api.github.com/repos/jub0t/Concat/releases/latest'
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $headers = @{ 'User-Agent' = 'MotionGraphic-Studio-Concat-Launcher'; 'Accept' = 'application/vnd.github+json' }
    Write-Host '[GITHUB] Membaca rilis Concat resmi (tidak memasang aplikasi).'
    $release = Invoke-RestMethod -Uri $apiUrl -Headers $headers -TimeoutSec 60
    $tag = [string]$release.tag_name
    if ($tag -notmatch '^v[0-9]+\.[0-9]+\.[0-9]+(?:[-.][a-zA-Z0-9.]+)?$') {
        throw "Tag GitHub tidak sesuai pola yang diharapkan: $tag"
    }
    $assetName = 'Concat-' + $tag.Substring(1) + '-windows-x86_64.msi'
    $assets = @($release.assets | Where-Object { $_.name -eq $assetName })
    if ($assets.Count -ne 1) { throw "Rilis $tag tidak menyediakan $assetName." }
    $asset = $assets[0]
    $url = [string]$asset.browser_download_url
    $prefix = "https://github.com/jub0t/Concat/releases/download/$tag/"
    if (-not $url.StartsWith($prefix, [StringComparison]::Ordinal)) {
        throw 'Link MSI tidak berasal dari release Concat resmi. Unduhan ditolak.'
    }
    $digest = [string]$asset.digest
    $digestMatch = [regex]::Match($digest, '^sha256:([0-9a-fA-F]{64})$')
    if (-not $digestMatch.Success) {
        throw 'Checksum SHA-256 tidak tersedia pada metadata rilis. Demi keamanan unduhan dibatalkan.'
    }
    $script:releaseCache = [PSCustomObject]@{
        tag = $tag
        assetName = $assetName
        url = $url
        hash = $digestMatch.Groups[1].Value.ToLowerInvariant()
    }
    return $script:releaseCache
}

function Get-PortableExecutable {
    $exe = Join-Path $portableCurrent 'concat.exe'
    if (Test-Path -LiteralPath $exe -PathType Leaf) { return $exe }
    return $null
}

function Ensure-Portable {
    $existing = Get-PortableExecutable
    if ($existing) {
        Write-Host "[PORTABLE] Concat sudah tersedia: $existing"
        return $existing
    }
    if (-not [Environment]::Is64BitOperatingSystem) {
        throw 'Concat Windows x86_64 memerlukan Windows 64-bit.'
    }
    $release = Get-OfficialRelease
    Protect-FromMasterGit
    New-Item -ItemType Directory -Path $cacheRoot,$portableRoot -Force | Out-Null
    $msiPath = Join-Path $cacheRoot $release.assetName
    $downloadPart = "$msiPath.download"
    $download = $true
    if (Test-Path -LiteralPath $msiPath -PathType Leaf) {
        $download = (Get-FileHash -LiteralPath $msiPath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $release.hash
    }
    if ($download) {
        Write-Host "[GITHUB] Mengunduh arsip aplikasi dari rilis $($release.tag) (tanpa instalasi)."
        Remove-Item -LiteralPath $downloadPart -Force -ErrorAction SilentlyContinue
        try {
            Invoke-WebRequest -Uri $release.url -OutFile $downloadPart -UseBasicParsing -TimeoutSec 1200
            $got = (Get-FileHash -LiteralPath $downloadPart -Algorithm SHA256).Hash.ToLowerInvariant()
            if ($got -ne $release.hash) { throw "SHA-256 tidak sesuai metadata GitHub. File dibatalkan." }
            Move-Item -LiteralPath $downloadPart -Destination $msiPath -Force
        } finally {
            Remove-Item -LiteralPath $downloadPart -Force -ErrorAction SilentlyContinue
        }
    }
    if ((Get-FileHash -LiteralPath $msiPath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $release.hash) {
        throw 'Checksum arsip tidak valid.'
    }

    # MSI administrative extraction makes an image of the files; /i is NEVER used.
    # This keeps Concat out of Apps & Features and does not run its setup wizard.
    # The extracted EXE/DLLs remain beside each other under the Master folder.
    $scratch = Join-Path $portableRoot ('unpack-' + [guid]::NewGuid().ToString('N'))
    $log = Join-Path $cacheRoot 'portable-extract.log'
    New-Item -ItemType Directory -Path $scratch -Force | Out-Null
    try {
        $windowsInstaller = Join-Path $env:WINDIR 'System32\msiexec.exe'
        if (-not (Test-Path -LiteralPath $windowsInstaller -PathType Leaf)) {
            throw 'Windows Installer (msiexec.exe) tidak ditemukan.'
        }
        # Start-Process joins argument array in Windows PowerShell 5; quote paths explicitly.
        $msiArg = '"' + $msiPath + '"'
        $destArg = 'TARGETDIR="' + $scratch + '"'
        $logArg = '"' + $log + '"'
        Write-Host '[PORTABLE] Mengekstrak MSI ke folder Master menggunakan msiexec /a (BUKAN /i).'
        $extractArgs = @('/a',$msiArg,$destArg,'/qn','/norestart','/L*v',$logArg)
        $p = Start-Process -FilePath $windowsInstaller -ArgumentList $extractArgs -Wait -PassThru
        if ($p.ExitCode -ne 0) { throw "Ekstraksi MSI gagal (exit $($p.ExitCode)). Lihat log: $log" }
        $candidate = Get-ChildItem -LiteralPath $scratch -Recurse -File -Filter 'concat.exe' |
            Select-Object -First 1
        if (-not $candidate) { throw "Ekstraksi selesai, tetapi concat.exe tidak ditemukan. Lihat log: $log" }
        $sourceDir = Split-Path -Parent $candidate.FullName
        if (Test-Path -LiteralPath $portableCurrent) {
            # Never silently overwrite an existing user runtime.
            throw 'Folder runtime/current sudah ada namun tidak berisi concat.exe. Periksa folder sebelum mencoba lagi.'
        }
        $pending = Join-Path $portableRoot ('pending-' + [guid]::NewGuid().ToString('N'))
        Move-Item -LiteralPath $sourceDir -Destination $pending
        Move-Item -LiteralPath $pending -Destination $portableCurrent
        @{ source='https://github.com/jub0t/Concat'; tag=$release.tag; sha256=$release.hash; extractedAtUtc=[DateTime]::UtcNow.ToString('o'); mode='MSI administrative extraction, no app install' } |
            ConvertTo-Json | Set-Content -LiteralPath (Join-Path $portableRoot 'release.json') -Encoding UTF8
        $exe = Get-PortableExecutable
        if (-not $exe) { throw 'Executable Concat tidak ditemukan setelah ekstraksi.' }
        Write-Host '[SELESAI] Runtime portable tersimpan di apps\concat\runtime\current.'
        return $exe
    } finally {
        if (Test-Path -LiteralPath $scratch) {
            Remove-Item -LiteralPath $scratch -Force -Recurse -ErrorAction SilentlyContinue
        }
    }
}

function Get-BuildExecutable {
    # Prefer developer profile quick, as upstream recommends for iteration.
    $targetRoot = Join-Path $rustRoot 'target'
    if ($env:CARGO_TARGET_DIR) {
        if ([IO.Path]::IsPathRooted($env:CARGO_TARGET_DIR)) { $targetRoot = $env:CARGO_TARGET_DIR }
        else { $targetRoot = Join-Path $rustRoot $env:CARGO_TARGET_DIR }
    }
    foreach ($profile in @('quick', 'debug', 'release', 'app')) {
        $candidate = Join-Path $targetRoot (Join-Path $profile 'concat.exe')
        if (Test-Path -LiteralPath $candidate -PathType Leaf) { return $candidate }
    }
    return $null
}

function Get-SourceCommit {
    if (-not (Test-Path -LiteralPath (Join-Path $sourceRoot '.git'))) { return $null }
    $git=Get-AvailableCommand 'git'
    if (-not $git) { return $null }
    $result=(& $git -C $sourceRoot rev-parse HEAD 2>$null | Select-Object -First 1)
    if ($LASTEXITCODE -ne 0) { return $null }
    return [string]$result
}

function Test-BuildMatchesSource {
    $exe=Get-BuildExecutable
    if (-not $exe -or -not (Test-Path -LiteralPath $buildStamp -PathType Leaf)) { return $false }
    $commit=Get-SourceCommit
    if (-not $commit) { return $false }
    try {
        $stamp=Get-Content -LiteralPath $buildStamp -Raw | ConvertFrom-Json
        return $stamp.commit -eq $commit
    } catch { return $false }
}

function Get-ValidFFmpegDir {
    param([string]$base)
    if (-not $base) { return $null }
    if ((Test-Path -LiteralPath (Join-Path $base 'include') -PathType Container) -and
        (Test-Path -LiteralPath (Join-Path $base 'lib') -PathType Container) -and
        (Test-Path -LiteralPath (Join-Path $base 'bin') -PathType Container)) {
        return $base
    }
    return $null
}

function Configure-FFmpeg {
    $external = Get-ValidFFmpegDir $env:FFMPEG_DIR
    $savedPath = Join-Path $depsRoot 'ffmpeg'
    $saved = Get-ValidFFmpegDir $savedPath
    $ffmpeg = if ($external) { $external } elseif ($saved) { $saved } else { $null }
    if (-not $ffmpeg) {
        # GitHub Concat's own deps.lock lists both the archive URL and SHA256.
        $lockPath = Join-Path $sourceRoot 'scripts\ci\deps.lock'
        if (-not (Test-Path -LiteralPath $lockPath -PathType Leaf)) {
            throw 'Repository belum menyertakan scripts/ci/deps.lock; tidak dapat mengambil FFmpeg terverifikasi.'
        }
        $line = @(Get-Content -LiteralPath $lockPath | Where-Object { $_ -match '^ffmpeg-win64\s+' } | Select-Object -First 1)
        $match = if ($line.Count -eq 1) { [regex]::Match($line[0], '^ffmpeg-win64\s+(\S+)\s+([0-9a-fA-F]{64})\s*$') } else { $null }
        if ($null -eq $match -or -not $match.Success) {
            throw 'Entri ffmpeg-win64 di deps.lock berubah; periksa dokumentasi Concat terbaru.'
        }
        $downloadUrl = $match.Groups[1].Value
        $expectedHash = $match.Groups[2].Value.ToLowerInvariant()
        New-Item -ItemType Directory -Path $depsRoot -Force | Out-Null
        $zipFile = Join-Path $depsRoot 'ffmpeg-win64-verified.zip'
        $tempZip = "$zipFile.partial"
        $needsDownload = $true
        if (Test-Path -LiteralPath $zipFile -PathType Leaf) {
            $needsDownload = (Get-FileHash -LiteralPath $zipFile -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expectedHash
        }
        if ($needsDownload) {
            Write-Host '[DEPENDENCY] Download FFmpeg development libraries dari URL yang dikunci source Concat.'
            [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
            Remove-Item -LiteralPath $tempZip -Force -ErrorAction SilentlyContinue
            try {
                Invoke-WebRequest -Uri $downloadUrl -OutFile $tempZip -UseBasicParsing -TimeoutSec 900
                $got = (Get-FileHash -LiteralPath $tempZip -Algorithm SHA256).Hash.ToLowerInvariant()
                if ($got -ne $expectedHash) { throw 'SHA-256 FFmpeg tidak sesuai deps.lock. Unduhan ditolak.' }
                Move-Item -LiteralPath $tempZip -Destination $zipFile -Force
            } finally {
                Remove-Item -LiteralPath $tempZip -Force -ErrorAction SilentlyContinue
            }
        }
        $got = (Get-FileHash -LiteralPath $zipFile -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($got -ne $expectedHash) { throw 'SHA-256 arsip FFmpeg tidak sesuai deps.lock.' }
        Write-Host '[DEPENDENCY] Ekstrak FFmpeg ke apps\concat\deps (tanpa installer).'
        $tempDir = Join-Path $depsRoot 'ffmpeg-unpacking'
        if (Test-Path -LiteralPath $tempDir) { Remove-Item -LiteralPath $tempDir -Recurse -Force }
        try {
            Expand-Archive -LiteralPath $zipFile -DestinationPath $tempDir -Force
            $found = Get-ChildItem -LiteralPath $tempDir -Directory -Recurse |
                Where-Object { (Get-ValidFFmpegDir $_.FullName) -ne $null } |
                Select-Object -First 1
            if (-not $found) { throw 'FFmpeg diekstrak tetapi include/lib/bin tidak ditemukan.' }
            if (Test-Path -LiteralPath $savedPath) { Remove-Item -LiteralPath $savedPath -Recurse -Force }
            Move-Item -LiteralPath $found.FullName -Destination $savedPath
        } finally {
            if (Test-Path -LiteralPath $tempDir) { Remove-Item -LiteralPath $tempDir -Recurse -Force }
        }
        $ffmpeg = Get-ValidFFmpegDir $savedPath
        if (-not $ffmpeg) { throw 'Folder FFmpeg hasil extract tidak valid.' }
    }
    $env:FFMPEG_DIR = $ffmpeg
    $binPath = Join-Path $ffmpeg 'bin'
    if ($env:PATH -notlike "*$binPath*") { $env:PATH = "$binPath;$env:PATH" }
    Write-Host "[FFMPEG] $ffmpeg"
}

function Check-Toolchain {
    if (-not [Environment]::Is64BitOperatingSystem) { throw 'Build Concat ini memerlukan Windows 64-bit.' }
    $cargo = Get-AvailableCommand 'cargo.exe'
    if (-not $cargo) { $cargo = Get-AvailableCommand 'cargo' }
    if (-not $cargo) {
        throw 'Rust/Cargo tidak tersedia. Source Concat tidak dapat dijalankan tanpa dikompilasi. Instal Rust 1.93+ (rustup.rs) dan C++ Build Tools, lalu jalankan npm run concat lagi. Tidak ada installer Concat yang dijalankan.'
    }
    $rustc = Get-AvailableCommand 'rustc.exe'
    if (-not $rustc) { $rustc = Get-AvailableCommand 'rustc' }
    if (-not $rustc) { throw 'rustc tidak ditemukan meskipun cargo ada. Periksa instalasi Rust toolchain.' }
    $rustVersionLine = (& $rustc --version | Select-Object -First 1)
    if ($LASTEXITCODE -ne 0) { throw 'Gagal mendeteksi versi Rust.' }
    if ($rustVersionLine -match 'rustc\s+(\d+)\.(\d+)') {
        $major = [int]$Matches[1]; $minor = [int]$Matches[2]
        if ($major -lt 1 -or ($major -eq 1 -and $minor -lt 93)) {
            throw "Rust $major.$minor terlalu lama. Concat membutuhkan Rust 1.93 atau lebih baru."
        }
    }
    if (-not (Get-AvailableCommand 'cmake.exe') -and -not (Get-AvailableCommand 'cmake')) {
        throw 'CMake belum tersedia. Instal CMake dari cmake.org (tambahkan ke PATH), lalu jalankan npm run concat lagi.'
    }
    $vswhere = Join-Path ${env:ProgramFiles(x86)} 'Microsoft Visual Studio\Installer\vswhere.exe'
    if (-not (Get-AvailableCommand 'link.exe') -and (-not (Test-Path -LiteralPath $vswhere))) {
        throw 'Microsoft C++ Build Tools (MSVC) belum terdeteksi. Source Concat memerlukan C++ compiler dan Windows SDK. Instal Visual Studio Build Tools, lalu ulangi.'
    }
    if (-not $env:LIBCLANG_PATH) {
        foreach ($llvmPath in @('C:\Program Files\LLVM\bin', 'C:\llvm\bin')) {
            if (Test-Path -LiteralPath (Join-Path $llvmPath 'libclang.dll') -PathType Leaf) {
                $env:LIBCLANG_PATH = $llvmPath
                $env:PATH = "$llvmPath;$env:PATH"
                break
            }
        }
    }
    if (-not $env:LIBCLANG_PATH) {
        Write-Warning 'libclang belum terdeteksi. Jika build gagal karena bindgen/libclang, siapkan LLVM dan set LIBCLANG_PATH.'
    }
    Write-Host "[BUILD] Cargo terdeteksi: $cargo"
    Write-Host '[BUILD] Build source membutuhkan C++ toolchain MSVC (Visual Studio Build Tools).'
    return $cargo
}

function Build-ConcatSource {
    Ensure-Source
    $cargo = Check-Toolchain
    Configure-FFmpeg
    Write-Host '[BUILD] Kompilasi Concat dari SOURCE GitHub (profile quick). Tidak menginstal aplikasi Concat.'
    Push-Location $rustRoot
    try {
        & $cargo build --profile quick -p concat
        $buildExit = $LASTEXITCODE
    } finally {
        Pop-Location
    }
    if ($buildExit -ne 0) {
        throw "Kompilasi Rust gagal (exit $buildExit). Pastikan MSVC C++ Build Tools, LLVM/libclang, dan dependency native lainnya tersedia. Lihat pesan build di atas."
    }
    $binary = Get-BuildExecutable
    if (-not $binary) { throw 'Cargo berhasil tetapi concat.exe tidak ditemukan pada target build.' }
    $commit=Get-SourceCommit
    if (-not $commit) { throw 'Build berhasil tetapi commit Git tidak dapat dibaca; tidak menandai hasil sebagai up-to-date.' }
    New-Item -ItemType Directory -Path $depsRoot -Force | Out-Null
    @{commit=$commit; builtAtUtc=[DateTime]::UtcNow.ToString('o'); exe=$binary} | ConvertTo-Json | Set-Content -LiteralPath $buildStamp -Encoding UTF8
    Write-Host "[BUILD SELESAI] $binary"
}

function Launch-ConcatSource {
    # If user explicitly compiled the matching GitHub source, prefer that.
    $binary = $null
    if (Test-BuildMatchesSource) {
        $binary = Get-BuildExecutable
        Configure-FFmpeg
        Write-Host '[SOURCE] Menggunakan build lokal dari GitHub source.'
    } else {
        # Default: clone the repository for source/inspection, then extract the
        # verified official GitHub artifact. No Rust, CMake or MSVC required.
        $binary = Get-PortableExecutable
        if (-not $binary) {
            try { Ensure-Source }
            catch { Write-Warning "Clone source belum berhasil: $($_.Exception.Message). Editor portable tetap dicoba." }
            $binary = Ensure-Portable
        }
    }
    if (-not $binary) { throw 'Tidak ada executable Concat yang bisa dijalankan.' }
    Write-Host "[LAUNCH] $binary"
    $args = @{}
    if ($SoftwareGraphics) { $args['ArgumentList'] = @('--software') }
    Start-Process -FilePath $binary -WorkingDirectory (Split-Path -Parent $binary) @args
}

try {
    switch ($Action) {
        'launch' { Launch-ConcatSource }
        'setup' { $null = Ensure-Portable }
        'clone' { Ensure-Source }
        'build' { Build-ConcatSource }
        'status' {
            Write-Host "[MASTER] $root"
            Write-Host "[GITHUB SOURCE] $sourceRoot"
            Write-Host "[CLONE ADA] $([bool](Test-Path -LiteralPath (Join-Path $sourceRoot '.git')))"
            $binary = Get-BuildExecutable
            $portable = Get-PortableExecutable
            if ($portable) { Write-Host "[PORTABLE GITHUB] $portable" } else { Write-Host '[PORTABLE GITHUB] Belum tersedia.' }
            if ($binary) { Write-Host "[BINARY BUILD] $binary" }
            else { Write-Host '[BINARY BUILD] Belum dikompilasi.' }
            Write-Host "[BUILD COCOK SOURCE] $(Test-BuildMatchesSource)"
            foreach ($name in @('git','cargo','rustc','cmake')) {
                if (Get-AvailableCommand $name) { Write-Host "[OK] $name" }
                else { Write-Host "[BELUM ADA] $name" }
            }
        }
    }
} catch {
    Write-Host "[GAGAL] $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
