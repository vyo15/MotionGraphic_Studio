# Concat GitHub SOURCE launcher for MotionGraphic Studio v1.8.1 (Windows PowerShell 5.1+).
# Uses official GitHub release MSI as an archive via administrative extraction (/a),
# never normal /i installation, never registers a Concat application in Windows.
# Keeps GitHub source for optional compilation. No Rust required for normal launch.
# Existing npm run concat command can keep invoking: -Action launch
# Normal launch uses a verified portable release. Source cloning/build is NEVER a startup prerequisite.
[CmdletBinding()]
param(
    [ValidateSet('launch', 'launch-cpu', 'setup', 'clone', 'status', 'build', 'build-cpu', 'import-cpu', 'gpu-reset')]
    [string]$Action = 'launch',
    [switch]$SoftwareGraphics,
    [switch]$DebugLogging,
    [string]$Package
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
$script:currentSessionDir = $null
$cpuPortableRoot = Join-Path $appRoot 'cpu-portable'
$cpuPortableCurrent = Join-Path $cpuPortableRoot 'current'

function Write-LauncherEvent([string]$message) {
    # Explicit launcher log for failures before concat.exe is created.
    if (-not $script:currentSessionDir) { return }
    try {
        $file = Join-Path $script:currentSessionDir 'launcher.log'
        $time = [DateTime]::UtcNow.ToString('o')
        Add-Content -LiteralPath $file -Value "[$time] $message" -Encoding UTF8 -ErrorAction Stop
    } catch { Write-Warning "Tidak bisa menyimpan launcher.log: $($_.Exception.Message)" }
}

function Save-StartupPreflight([string]$sessionDir) {
    $exe = Join-Path $portableCurrent 'concat.exe'
    $displayAdapters = @()
    try {
        $displayAdapters = @(Get-CimInstance -ClassName Win32_VideoController -ErrorAction Stop |
            ForEach-Object { [ordered]@{ name=$_.Name; driverVersion=$_.DriverVersion } })
    } catch { Write-LauncherEvent 'GPU preflight inventory unavailable (non-fatal).' }
    $info = [ordered]@{
        displayAdapters = $displayAdapters
        platform = 'Windows'
        os64Bit = [Environment]::Is64BitOperatingSystem
        system = [Environment]::OSVersion.VersionString
        powershellVersion = $PSVersionTable.PSVersion.ToString()
        portableExePresent = [bool](Test-Path -LiteralPath $exe -PathType Leaf)
        runtimeCurrentPresent = [bool](Test-Path -LiteralPath $portableCurrent -PathType Container)
        sourcePresent = [bool](Test-Path -LiteralPath (Join-Path $sourceRoot '.git'))
        gpuModeFromUser = if ($env:CONCAT_GPU) { $env:CONCAT_GPU } else { 'default' }
        localAppDataPresent = [bool]$env:LOCALAPPDATA
        checkedAtUtc = [DateTime]::UtcNow.ToString('o')
    }
    Write-JsonFile (Join-Path $sessionDir 'preflight.json') $info
    Write-LauncherEvent "Preflight: portableExePresent=$($info.portableExePresent); runtimeCurrentPresent=$($info.runtimeCurrentPresent); os64Bit=$($info.os64Bit)"
}

# Collect display-driver evidence with the session. This is diagnostic only:
# it never changes drivers, registry values, user projects, or GPU preferences.
function Save-GpuDriverInventory([string]$sessionDir) {
    $data = [ordered]@{
        checkedAtUtc = [DateTime]::UtcNow.ToString('o')
        graphicsAdapters = @()
        note = 'Identifikasi driver/adapter. Tidak membuktikan GPU ini dipilih Concat; adapter aktif harus dilihat dari log native.'
    }
    try {
        $adapters = @(Get-CimInstance Win32_VideoController -ErrorAction Stop)
        $data.graphicsAdapters = @($adapters | ForEach-Object {
            [ordered]@{
                name = [string]$_.Name
                driverVersion = [string]$_.DriverVersion
                driverDate = if ($_.DriverDate) { [string]$_.DriverDate } else { $null }
                videoProcessor = [string]$_.VideoProcessor
                status = [string]$_.Status
            }
        })
    } catch {
        $data.error = 'Inventaris GPU tidak tersedia: ' + $_.Exception.Message
        Write-LauncherEvent 'GPU driver inventory unavailable; application launch will continue.'
    }
    try { Write-JsonFile (Join-Path $sessionDir 'gpu-drivers.json') $data }
    catch { Write-LauncherEvent 'Could not save GPU inventory (nonfatal).' }
}

function Save-RuntimeInventory([string]$binary, [string]$sessionDir) {
    # An MSI administrative extraction may leave media DLLs in another directory.
    # Record which libraries are truly beside the selected concat.exe. Do not
    # delete or overwrite a working runtime based on a guessed DLL version.
    $directory = Split-Path -Parent $binary
    $groups = [ordered]@{}
    foreach ($pattern in @('avcodec-*.dll','avformat-*.dll','avutil-*.dll','swscale-*.dll','swresample-*.dll')) {
        $libraryNames = @(Get-ChildItem -LiteralPath $directory -Filter $pattern -File -ErrorAction SilentlyContinue |
            Select-Object -ExpandProperty Name)
        $groups[$pattern] = $libraryNames
    }
    $version = $null
    try { $version = (Get-Item -LiteralPath $binary).VersionInfo.ProductVersion } catch { }
    Write-JsonFile (Join-Path $sessionDir 'runtime-inventory.json') ([ordered]@{
        selectedExecutable = $binary
        productVersion = $version
        directory = $directory
        bundledMediaDlls = $groups
        note = 'Pemeriksaan metadata; tanpa perubahan pada DLL/runtime.'
    })
    foreach ($essential in @('avcodec-*.dll','avformat-*.dll','avutil-*.dll')) {
        if (@($groups[$essential]).Count -eq 0) {
            Write-LauncherEvent "Media library not seen beside executable: $essential (check package layout)."
            Write-Warning "DLL $essential tidak terlihat di samping concat.exe. Jika impor video gagal, periksa runtime-inventory.json dan struktur rilisan resmi."
        }
    }
}

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
    $digest = if ($asset.PSObject.Properties['digest']) { [string]$asset.digest } else { '' }
    $digestMatch = [regex]::Match($digest, '^sha256:([0-9a-fA-F]{64})$')
    if ($digestMatch.Success) {
        $hash = $digestMatch.Groups[1].Value.ToLowerInvariant()
    } else {
        # Some GitHub API/mirror responses omit the asset digest. The release
        # publishes SHA256SUMS; use it ONLY from this same official tag.
        $sumsName = 'SHA256SUMS'
        $sumsAsset = @($release.assets | Where-Object { $_.name -eq $sumsName })
        if ($sumsAsset.Count -ne 1) { throw 'Metadata SHA256 dan SHA256SUMS resmi tidak tersedia. Unduhan dibatalkan.' }
        $sumsUrl = [string]$sumsAsset[0].browser_download_url
        if (-not $sumsUrl.StartsWith($prefix, [StringComparison]::Ordinal)) {
            throw 'Link SHA256SUMS tidak berasal dari rilis Concat resmi.'
        }
        $sumsResponse = Invoke-WebRequest -Uri $sumsUrl -UseBasicParsing -TimeoutSec 90
        $safeName = [regex]::Escape($assetName)
        $hashLine = [regex]::Match([string]$sumsResponse.Content, "(?m)^([0-9a-fA-F]{64})\s+\*?$safeName\s*$")
        if (-not $hashLine.Success) { throw "SHA256SUMS resmi tidak memuat $assetName. Unduhan dibatalkan." }
        $hash = $hashLine.Groups[1].Value.ToLowerInvariant()
    }
    Write-LauncherEvent "Release verified: $tag / $assetName (SHA256 available)"
    $script:releaseCache = [PSCustomObject]@{
        tag = $tag
        assetName = $assetName
        url = $url
        hash = $hash
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
    Write-Host '[SETUP] Runtime Concat belum ada. Menyiapkan rilisan portable resmi (download hanya saat diperlukan).'
    Write-LauncherEvent 'Portable executable missing; preparing signed-by-hash official release (no source clone).'
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
        Write-LauncherEvent 'Starting msiexec administrative extraction; installer log in apps/concat/cache/portable-extract.log'
        $extractArgs = @('/a',$msiArg,$destArg,'/qn','/norestart','/L*v',$logArg)
        $p = Start-Process -FilePath $windowsInstaller -ArgumentList $extractArgs -Wait -PassThru
        if ($p.ExitCode -ne 0) { throw "Ekstraksi MSI gagal (exit $($p.ExitCode)). Lihat $log. Coba folder Master non-system (bukan Program Files)." }
        $candidate = Get-ChildItem -LiteralPath $scratch -Recurse -File -Filter 'concat.exe' |
            Select-Object -First 1
        if (-not $candidate) { throw "Ekstraksi selesai, tetapi concat.exe tidak ditemukan. Lihat log: $log" }
        $sourceDir = Split-Path -Parent $candidate.FullName
        if (Test-Path -LiteralPath $portableCurrent) {
            # An interrupted extraction used to block EVERY subsequent launch.
            # Preserve it as a backup (never delete or overwrite user files).
            $incomplete = Join-Path $portableRoot ('backup-incomplete-' + [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss') + '-' + [guid]::NewGuid().ToString('N').Substring(0,6))
            Move-Item -LiteralPath $portableCurrent -Destination $incomplete -ErrorAction Stop
            Write-Host "[RECOVERY] Runtime tidak lengkap diamankan ke $incomplete"
            Write-LauncherEvent "Incomplete runtime moved to backup folder, before installing verified portable files."
        }
        $pending = Join-Path $portableRoot ('pending-' + [guid]::NewGuid().ToString('N'))
        Move-Item -LiteralPath $sourceDir -Destination $pending
        Move-Item -LiteralPath $pending -Destination $portableCurrent
        @{ source='https://github.com/jub0t/Concat'; tag=$release.tag; sha256=$release.hash; extractedAtUtc=[DateTime]::UtcNow.ToString('o'); mode='MSI administrative extraction, no app install' } |
            ConvertTo-Json | Set-Content -LiteralPath (Join-Path $portableRoot 'release.json') -Encoding UTF8
        $exe = Get-PortableExecutable
        if (-not $exe) { throw 'Executable Concat tidak ditemukan setelah ekstraksi.' }
        Write-Host '[SELESAI] Runtime portable tersimpan di apps\concat\runtime\current.'
        Write-LauncherEvent 'Portable release extracted successfully and concat.exe found.'
        return $exe
    } finally {
        if (Test-Path -LiteralPath $scratch) {
            Remove-Item -LiteralPath $scratch -Force -Recurse -ErrorAction SilentlyContinue
        }
    }
}

# Cloud-built CPU UI: verified, isolated from official Concat portable runtime.
function Test-CloudCpuPackage([string]$folder) {
    if (-not $folder -or -not (Test-Path -LiteralPath $folder -PathType Container)) { return $false }
    $exe = Join-Path $folder 'concat.exe'
    $manifestPath = Join-Path $folder 'cpu-build-manifest.json'
    if (-not (Test-Path -LiteralPath $exe -PathType Leaf) -or -not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) { return $false }
    try {
        $manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
        if ($manifest.kind -ne 'motiongraphic-concat-cpu-native-v1' -or
            $manifest.sourceCommit -ne '79116bd0f9a103c633d888603ad27890e929dbdc' -or
            $manifest.patchMarker -ne 'MOTIONGRAPHIC_STUDIO_CPU_UI_PATCH_V1' -or
            $manifest.executableSha256 -notmatch '^[0-9a-fA-F]{64}$') { return $false }
        $actual = (Get-FileHash -LiteralPath $exe -Algorithm SHA256).Hash
        if ($actual -ne $manifest.executableSha256) { return $false }
        if (-not (Test-Path -LiteralPath (Join-Path $folder 'onnxruntime.dll') -PathType Leaf)) { return $false }
        if (@(Get-ChildItem -LiteralPath $folder -Filter 'avcodec*.dll' -File).Count -lt 1) { return $false }
        return $true
    } catch { return $false }
}

function Import-CloudCpuPackage([string]$file) {
    if ([string]::IsNullOrWhiteSpace($file)) {
        throw 'Pilih ZIP artifact GitHub Actions: npm run concat:cpu:import -- "C:\path\Concat-CPU-Portable-Windows-x64.zip"'
    }
    $resolved = Resolve-Path -LiteralPath $file -ErrorAction Stop
    $filePath = [string]$resolved.Path
    if (-not (Test-Path -LiteralPath $filePath -PathType Leaf) -or [IO.Path]::GetExtension($filePath) -ne '.zip') {
        throw 'File harus .zip hasil unduh GitHub Actions (bukan source ZIP atau Master ZIP).'
    }
    New-Item -ItemType Directory -Force $cpuPortableRoot | Out-Null
    $scratch = Join-Path $cpuPortableRoot ('_extract-' + [guid]::NewGuid().ToString('N').Substring(0,8))
    $backup = Join-Path $cpuPortableRoot ('previous-' + [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss'))
    try {
        Expand-Archive -LiteralPath $filePath -DestinationPath $scratch -Force
        $source = $scratch
        if (-not (Test-Path -LiteralPath (Join-Path $source 'cpu-build-manifest.json') -PathType Leaf)) {
            $nested = @(Get-ChildItem -LiteralPath $scratch -Directory)
            if ($nested.Count -eq 1 -and (Test-Path -LiteralPath (Join-Path $nested[0].FullName 'cpu-build-manifest.json') -PathType Leaf)) {
                $source = $nested[0].FullName
            }
        }
        if (-not (Test-CloudCpuPackage $source)) {
            throw 'Paket ditolak: CPU manifest, SHA256 concat.exe, atau DLL utama tidak cocok. Gunakan artifact dari workflow Build Concat CPU-only.'
        }
        if (Test-Path -LiteralPath $cpuPortableCurrent) { Move-Item -LiteralPath $cpuPortableCurrent -Destination $backup -ErrorAction Stop }
        try {
            Move-Item -LiteralPath $source -Destination $cpuPortableCurrent -ErrorAction Stop
        } catch {
            if (Test-Path -LiteralPath $backup -PathType Container) {
                Move-Item -LiteralPath $backup -Destination $cpuPortableCurrent -ErrorAction SilentlyContinue
            }
            throw
        }
        Write-Host '[CPU PORTABLE] Paket terverifikasi dan dipasang terpisah dari Concat resmi.'
        Write-Host "[CPU PORTABLE] $cpuPortableCurrent"
        if (Test-Path -LiteralPath $backup -PathType Container) { Write-Host "[BACKUP] $backup" }
        Write-Host '[BERIKUTNYA] Jalankan npm run concat:cpu'
    } finally {
        if (Test-Path -LiteralPath $scratch -PathType Container) {
            Remove-Item -LiteralPath $scratch -Recurse -Force -ErrorAction SilentlyContinue
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

function Test-CpuSourcePatched {
    $cpuFile = Join-Path $rustRoot 'crates\concat\src\platform.rs'
    if (-not (Test-Path -LiteralPath $cpuFile -PathType Leaf)) { return $false }
    return [bool](Select-String -LiteralPath $cpuFile -SimpleMatch 'MOTIONGRAPHIC_STUDIO_CPU_UI_PATCH_V1' -Quiet)
}

function Test-BuildMatchesSource {
    $exe=Get-BuildExecutable
    if (-not $exe -or -not (Test-Path -LiteralPath $buildStamp -PathType Leaf)) { return $false }
    $commit=Get-SourceCommit
    if (-not $commit) { return $false }
    try {
        $stamp=Get-Content -LiteralPath $buildStamp -Raw | ConvertFrom-Json
        $wasCpuBuilt = [bool]($stamp.PSObject.Properties['cpuUiBuild'] -and $stamp.cpuUiBuild)
        $isCpuPatched = [bool](Test-CpuSourcePatched)
        if ($stamp.commit -ne $commit -or $wasCpuBuilt -ne $isCpuPatched) { return $false }
        if ($isCpuPatched) {
            # Also reject stale CPU builds if platform.rs changed after compilation.
            $platformFile = Join-Path $rustRoot 'crates\concat\src\platform.rs'
            $shaNow = (Get-FileHash -LiteralPath $platformFile -Algorithm SHA256).Hash
            return [bool]($stamp.PSObject.Properties['platformSha256'] -and $stamp.platformSha256 -eq $shaNow)
        }
        return $true
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
        throw 'Rust/Cargo lokal tidak tersedia. Untuk TANPA INSTALL RUST, jalankan GitHub Actions > Build Concat CPU-only (Windows portable), download artifact lalu npm run concat:cpu:import. Alternatif build lokal membutuhkan Rust/Cargo dan Visual Studio C++ Build Tools.'
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
    $platformFile = Join-Path $rustRoot 'crates\concat\src\platform.rs'
    $platformSha256 = if (Test-Path -LiteralPath $platformFile -PathType Leaf) { (Get-FileHash -LiteralPath $platformFile -Algorithm SHA256).Hash } else { $null }
    @{commit=$commit; builtAtUtc=[DateTime]::UtcNow.ToString('o'); exe=$binary; cpuUiBuild=[bool](Test-CpuSourcePatched); platformSha256=$platformSha256} | ConvertTo-Json | Set-Content -LiteralPath $buildStamp -Encoding UTF8
    Write-Host "[BUILD SELESAI] $binary"
}

function Build-CpuOnlySource {
    # A new native build is required; runtime environment flags alone cannot
    # bypass Concat v0.2.8's forced WGPU/DX12 window renderer.
    $null = Check-Toolchain
    Ensure-Source
    $node = Get-AvailableCommand 'node.exe'
    if (-not $node) { $node = Get-AvailableCommand 'node' }
    if (-not $node) { throw 'Node.js diperlukan untuk memvalidasi patch source CPU.' }
    & $node (Join-Path $root 'tools\concat-cpu-source.mjs') apply
    if ($LASTEXITCODE -ne 0) { throw 'Patch source CPU ditolak. Source lokal tidak diubah bila commit / checksum berbeda.' }
    Build-ConcatSource
    if (-not (Test-BuildMatchesSource) -or -not (Test-CpuSourcePatched)) { throw 'Build CPU selesai tetapi status source tidak sesuai; executable tidak boleh digunakan sebagai CPU-only.' }
    Write-Host '[CPU] Build source selesai. Jalankan npm run concat:cpu untuk renderer software tanpa DX12/WARP pada jendela.'
}

function Ensure-LocalPortableFolder([string]$binary) {
    # Concat official: a folder named `portable` beside concat.exe switches
    # config, downloaded models AND native logs to that folder. No installer.
    if ($binary -ne (Join-Path $portableCurrent 'concat.exe')) { return }
    $folder = Join-Path (Split-Path -Parent $binary) 'portable'
    if (-not (Test-Path -LiteralPath $folder -PathType Container)) {
        if ($env:LOCALAPPDATA -and (Test-Path -LiteralPath (Join-Path $env:LOCALAPPDATA 'app.concat.editor'))) {
            Write-Host '[PORTABLE] Profil Concat lama di LOCALAPPDATA tidak dipindah atau dihapus; profil baru akan ada di Master.'
        }
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
    }
}

function Write-JsonFile([string]$file, $value) {
    # Save a complete JSON at once, not half a session on interruption.
    $temp = "$file.tmp"
    $value | ConvertTo-Json -Depth 9 | Set-Content -LiteralPath $temp -Encoding UTF8
    Move-Item -LiteralPath $temp -Destination $file -Force
}

function Get-SessionRoot {
    $sessions = Join-Path $appRoot 'logs\sessions'
    New-Item -ItemType Directory -Path $sessions -Force | Out-Null
    $name = [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss') + '-' + [guid]::NewGuid().ToString('N').Substring(0,6)
    $directory = Join-Path $sessions $name
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
    # Keep last 30 sessions including each captured crash. Does NOT delete native Concat logs
    # or user projects. Prevent deleting this running session.
    $old = @(Get-ChildItem -LiteralPath $sessions -Directory | Sort-Object Name -Descending | Select-Object -Skip 30)
    foreach ($item in $old) {
        if ($item.FullName -ne $directory) {
            Remove-Item -LiteralPath $item.FullName -Recurse -Force -ErrorAction SilentlyContinue
        }
    }
    return $directory
}

function Save-WindowsEvents([string]$file, [datetime]$since) {
    # Optional evidence. Windows Event Viewer may be disabled or inaccessible.
    try {
        $events = @(Get-WinEvent -FilterHashtable @{
            LogName = 'Application'
            StartTime = $since.AddSeconds(-5)
            EndTime = (Get-Date).AddSeconds(8)
            Id = @(1000,1001,1026)
        } -ErrorAction Stop | Where-Object { $_.Message -match '(?i)concat(?:\.exe)?' } | Select-Object -First 12)
        if ($events.Count -gt 0) {
            $events | ForEach-Object {
                "Time: $($_.TimeCreated) | Provider: $($_.ProviderName) | EventID: $($_.Id)`r`n$($_.Message)`r`n---"
            } | Set-Content -LiteralPath $file -Encoding UTF8
        } else {
            'Tidak ada event Concat relevan yang tersedia (bukan bukti tidak terjadi crash).' | Set-Content -LiteralPath $file -Encoding UTF8
        }
    } catch {
        "Windows Event Viewer tidak tersedia: $($_.Exception.Message)" | Set-Content -LiteralPath $file -Encoding UTF8
    }
}

function Start-ObservedConcat([string]$binary, [string]$sessionDir, [string]$label, [bool]$safe, [bool]$cpuUi = $false) {
    $attemptDir = Join-Path $sessionDir $label
    New-Item -ItemType Directory -Path $attemptDir -Force | Out-Null
    $stdout = Join-Path $attemptDir 'stdout.log'
    $stderr = Join-Path $attemptDir 'stderr.log'
    $started = Get-Date
    $startedUtc = $started.ToUniversalTime().ToString('o')
    Write-LauncherEvent "Starting process attempt=$label safe=$safe"
    $p = $null
    $exitCode = $null
    $note = $null
    $mode = if ($cpuUi) { 'cpu-ui' } elseif ($safe) { 'software' } else { 'normal' }
    # Concat v0.2.8 officially uses CONCAT_GPU=software, NOT a --software CLI flag.
    # PowerShell 5.1 Start-Process inherits the parent process environment.
    # Preserve the previous value so a retry cannot affect later commands.
    $previousGpu = [Environment]::GetEnvironmentVariable('CONCAT_GPU', 'Process')
    $previousLog = [Environment]::GetEnvironmentVariable('CONCAT_LOG', 'Process')
    $previousBacktrace = [Environment]::GetEnvironmentVariable('RUST_BACKTRACE', 'Process')
    $previousCpuUi = [Environment]::GetEnvironmentVariable('CONCAT_CPU_UI', 'Process')
    # DEBUG from wgpu/naga/ffmpeg emitted ~118 MB of stderr in under 3 minutes
    # in the user's crash reproductions; Concat also caps native logs at 16 MB.
    # INFO retains ERROR/PANIC/GPU adapter lines without flooding the CPU renderer.
    $effectiveLog = if ($DebugLogging) { 'debug' } elseif ([string]::IsNullOrWhiteSpace($previousLog)) { 'info' } else { $previousLog }
    Write-Host "[CONCAT] Membuka $mode (log=$effectiveLog); proses dipantau hingga jendela ditutup."
    try {
        [Environment]::SetEnvironmentVariable('CONCAT_LOG', $effectiveLog, 'Process')
        if ([string]::IsNullOrWhiteSpace($previousBacktrace)) {
            [Environment]::SetEnvironmentVariable('RUST_BACKTRACE', '1', 'Process')
        }
        if ($safe) { [Environment]::SetEnvironmentVariable('CONCAT_GPU', 'software', 'Process') }
        if ($cpuUi) { [Environment]::SetEnvironmentVariable('CONCAT_CPU_UI', '1', 'Process') }
        # GUI Rust release: stdout/stderr alone are NOT the source of truth;
        # Concat's own <app-data>/logs/concat-*.log is primary.
        $p = Start-Process -FilePath $binary -WorkingDirectory (Split-Path -Parent $binary) -PassThru `
            -RedirectStandardOutput $stdout -RedirectStandardError $stderr
        $p.WaitForExit()
        $exitCode = [int]$p.ExitCode
    } catch {
        $note = "Gagal membuka/memantau proses: $($_.Exception.Message)"
        Write-Warning $note
    } finally {
        [Environment]::SetEnvironmentVariable('CONCAT_GPU', $previousGpu, 'Process')
        [Environment]::SetEnvironmentVariable('CONCAT_LOG', $previousLog, 'Process')
        [Environment]::SetEnvironmentVariable('RUST_BACKTRACE', $previousBacktrace, 'Process')
        [Environment]::SetEnvironmentVariable('CONCAT_CPU_UI', $previousCpuUi, 'Process')
    }
    # Preserve Windows crash evidence even if an application exits with code 0.
    # WER may report an error a moment after the process has exited.
    if ($null -eq $exitCode -or $exitCode -ne 0) { Start-Sleep -Milliseconds 1800 }
    Save-WindowsEvents (Join-Path $attemptDir 'windows-events.txt') $started
    $durationSeconds = [Math]::Round(((Get-Date) - $started).TotalSeconds, 2)
    Write-LauncherEvent "Attempt=$label exitCode=$exitCode durationSeconds=$durationSeconds note=$note"
    $status = [ordered]@{
        startedAtUtc = $startedUtc
        finishedAtUtc = [DateTime]::UtcNow.ToString('o')
        processId = if ($null -ne $p) { $p.Id } else { $null }
        exitCode = $exitCode
        durationSeconds = $durationSeconds
        binaryPath = $binary
        mode = $mode
        gpuMode = if ($cpuUi) { 'CONCAT_CPU_UI=1 (native CPU UI)' } elseif ($safe) { 'CONCAT_GPU=software' } elseif ($previousGpu) { 'inherited: CONCAT_GPU=' + $previousGpu } else { 'default' }
        logLevel = $effectiveLog
        note = $note
    }
    Write-JsonFile (Join-Path $attemptDir 'attempt.json') $status
    if ($null -ne $exitCode) { Write-Host "[CONCAT] $mode selesai: exit code $exitCode" }
    return $exitCode
}

function Print-Diagnostics([string]$sessionDir) {
    $node = Get-AvailableCommand 'node.exe'
    if (-not $node) { $node = Get-AvailableCommand 'node' }
    $scriptPath = Join-Path $root 'tools\concat-log-analyzer.mjs'
    if ($node -and (Test-Path -LiteralPath $scriptPath)) {
        # --auto creates BOTH full internal report and redacted share copy.
        & $node $scriptPath --session $sessionDir --auto
        if ($LASTEXITCODE -ne 0) { Write-Warning "Analyzer gagal (exit $LASTEXITCODE); file mentah sesi tetap tersimpan: $sessionDir" }
    } else {
        Write-Warning "Node/analyzer tidak tersedia. Log proses di: $sessionDir"
    }
}

function Get-SessionDiagnosticCode([string]$sessionDir) {
    try {
        $file = Join-Path $sessionDir 'report.json'
        if (Test-Path -LiteralPath $file -PathType Leaf) {
            $report = Get-Content -LiteralPath $file -Raw | ConvertFrom-Json
            return [string]$report.diagnostic.code
        }
    } catch { Write-LauncherEvent "Could not read diagnostic report: $($_.Exception.Message)" }
    return 'UNKNOWN'
}

# A GPU device loss can be followed by exit code 0: the native editor closes
# its own window after the WGPU surface is lost. Remember a verified GPU-loss
# event, so ordinary `npm run concat` will launch in software mode next time.
# Stored outside the synced Remotion project; never touches user's media.
function Get-GpuPreferenceFile {
    return (Join-Path $appRoot 'config\gpu-mode.json')
}

function Test-SoftwareGraphicsPreferred {
    $file = Get-GpuPreferenceFile
    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) { return $false }
    try {
        $choice = Get-Content -LiteralPath $file -Raw | ConvertFrom-Json
        return [bool]($choice.PSObject.Properties['softwarePreferred'] -and $choice.softwarePreferred)
    } catch {
        Write-LauncherEvent 'Invalid GPU preference file; using normal mode and keeping file untouched.'
        return $false
    }
}

function Save-SoftwareGraphicsPreference([string]$sessionDir) {
    $file = Get-GpuPreferenceFile
    $directory = Split-Path -Parent $file
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
    Write-JsonFile $file ([ordered]@{
        softwarePreferred = $true
        reason = 'GPU_DEVICE_LOST'
        evidenceSession = $sessionDir
        recordedAtUtc = [DateTime]::UtcNow.ToString('o')
    })
    Write-LauncherEvent 'GPU device lost confirmed from native log; software GPU mode preferred for future launches.'
    Write-Host '[GPU] Device lost terdeteksi. Mode software akan otomatis dipakai pada pembukaan berikutnya.'
    Write-Host '[GPU] Untuk mencoba GPU normal lagi setelah driver diperbaiki: npm run concat:gpu-reset'
}

function Reset-GpuPreference {
    $file = Get-GpuPreferenceFile
    if (Test-Path -LiteralPath $file -PathType Leaf) {
        Remove-Item -LiteralPath $file -Force
        Write-Host '[GPU] Preferensi software direset. Peluncuran berikutnya mencoba GPU normal kembali.'
    } else {
        Write-Host '[GPU] Tidak ada preferensi software yang perlu direset.'
    }
}

function Get-SessionAdapterType([string]$sessionDir, [string]$attemptName) {
    try {
        $report = Get-Content -LiteralPath (Join-Path $sessionDir 'report.json') -Raw | ConvertFrom-Json
        $attempt = @($report.attempts | Where-Object { $_.name -eq $attemptName } | Select-Object -First 1)
        if ($attempt.Count -eq 1 -and $attempt[0].adapter -and $attempt[0].adapter.type) {
            return [string]$attempt[0].adapter.type
        }
    } catch { Write-LauncherEvent 'GPU adapter for attempt not recorded; cannot infer adapter from mode alone.' }
    return 'Unknown'
}

function Disable-FailedSoftwarePreference([string]$sessionDir) {
    $file = Get-GpuPreferenceFile
    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) { return }
    # The preference was set by automatic fallback; do not keep retrying a
    # software adapter that was independently verified to crash as well.
    Write-JsonFile $file ([ordered]@{
        softwarePreferred = $false
        reason = 'SOFTWARE_GPU_DEVICE_LOST'
        evidenceSession = $sessionDir
        recordedAtUtc = [DateTime]::UtcNow.ToString('o')
    })
    Write-LauncherEvent 'Software GPU was also lost; disabling automatic software preference. No retry loop.'
    Write-Warning 'Mode CPU/WARP juga gagal. Preferensi fallback otomatis dinonaktifkan; jangan ulangi concat:safe sebagai solusi.'
}

function Should-RetrySoftware([string]$sessionDir, $exitCode) {
    $code = Get-SessionDiagnosticCode $sessionDir
    # Normal mode MAY ALREADY be CPU/WARP (even without CONCAT_GPU=software).
    # A software->software retry cannot fix this and wastes user time.
    if ((Get-SessionAdapterType $sessionDir '01-normal') -eq 'Cpu') {
        Write-LauncherEvent 'Skipping software retry: normal attempt already used CPU/WARP.'
        return $false
    }
    # Native GPU loss is meaningful even when Concat exits with code 0.
    if ($code -eq 'GPU') { return $true }
    if ($null -eq $exitCode -or $exitCode -eq 0) { return $false }
    $seconds = 0
    try {
        $status = Get-Content -LiteralPath (Join-Path $sessionDir '01-normal\attempt.json') -Raw | ConvertFrom-Json
        $seconds = [double]$status.durationSeconds
    } catch { $seconds = 9999 }
    # A media decoder error or panic after video import is NOT a startup GPU
    # failure. Automatically reopening an empty editor can hide the real crash.
    if ($seconds -lt 10 -and $code -in @('UNEXPECTED_EXIT','UNKNOWN','ACCESS_VIOLATION','NATIVE_MEMORY')) { return $true }
    return $false
}

function Launch-ConcatSource {
    $CpuOnlyUi = $Action -eq 'launch-cpu'
    # A session starts before clone/download/setup so even launch errors are captured.
    $sessionDir = Get-SessionRoot
    $script:currentSessionDir = $sessionDir
    $session = [ordered]@{ startedAtUtc=[DateTime]::UtcNow.ToString('o'); attempts=@(); source='MotionGraphic Studio launcher'; nativeLogging='Concat debug logs (automatic)'; autoReport=$true }
    Write-JsonFile (Join-Path $sessionDir 'session.json') $session
    Save-StartupPreflight $sessionDir
    Save-GpuDriverInventory $sessionDir
    # No git clone on ordinary launches: cloned Rust sources cannot run directly.
    # A verified binary is used immediately, and a missing binary is fetched once.
    $binary = $null
    if ($CpuOnlyUi -and (Test-CloudCpuPackage $cpuPortableCurrent)) {
        $binary = Join-Path $cpuPortableCurrent 'concat.exe'
        Write-Host '[CPU CLOUD] Menggunakan executable CPU-only terverifikasi dari GitHub Actions (tanpa Rust lokal).'
        Write-LauncherEvent 'Using verified isolated cloud CPU UI executable.'
    }
    if ($CpuOnlyUi -and -not $binary -and (-not (Test-BuildMatchesSource) -or -not (Test-CpuSourcePatched))) {
        throw 'CPU-only Concat belum dibangun/dimpor. Gunakan GitHub Actions Build Concat CPU-only lalu npm run concat:cpu:import. Jangan gunakan executable Concat biasa sebagai pengganti.'
    }
    if (-not $binary -and (Test-BuildMatchesSource)) {
        # A specially patched CPU-only binary is opt-in; ordinary npm run
        # concat must keep using the official portable release. An unpatched
        # source build retains the pre-existing launcher preference.
        if ($CpuOnlyUi -or -not (Test-CpuSourcePatched)) {
            $binary = Get-BuildExecutable
            Configure-FFmpeg
            Write-Host '[SOURCE] Menggunakan build lokal yang cocok dengan GitHub source.'
            Write-LauncherEvent 'Using matching local Rust build.'
        }
    }
    if (-not $binary) {
        $binary = Get-PortableExecutable
        if (-not $binary) {
            Write-Host '[SOURCE] Clone tidak dibutuhkan saat membuka editor. Mode source hanya untuk npm run concat:clone.'
            $binary = Ensure-Portable
        } else {
            Write-LauncherEvent 'Reusing existing portable executable without GitHub/network access.'
        }
    }
    if (-not $binary) { throw 'Tidak ada concat.exe yang bisa dijalankan. Cek internet/setup dan laporan otomatis.' }
    Write-LauncherEvent "Selected binary: $binary"
    Ensure-LocalPortableFolder $binary
    Save-RuntimeInventory $binary $sessionDir
    # Native debug logs are automatically enabled for every monitored attempt.
    Write-Host "[LAUNCH] $binary"
    Write-Host '[LOG] Otomatis aktif: tidak perlu concat:debug atau npm run logs.'
    $initialSafe = [bool]$SoftwareGraphics -or (Test-SoftwareGraphicsPreferred)
    if ($CpuOnlyUi) { $initialSafe = $false }
    if ($CpuOnlyUi) {
        Write-Host '[CPU-ONLY] Menggunakan binary source lokal yang telah dibangun. UI=Slint software, monitor=CPU, tanpa WGPU DX12 untuk jendela.'
        Write-LauncherEvent 'Using explicit native CPU-only UI build, not the portable release.'
    }
    if ($initialSafe) {
        Write-Host '[GPU] Memakai software graphics (otomatis bila sebelumnya terdeteksi device lost).'
        Write-LauncherEvent 'Starting in software graphics mode due to explicit flag or saved GPU device-loss preference.'
    }
    $initialMode = if ($CpuOnlyUi) { '01-cpu-ui' } elseif ($initialSafe) { '01-software' } else { '01-normal' }
    $session.attempts = @($initialMode)
    Write-JsonFile (Join-Path $sessionDir 'session.json') $session
    $exitCode = Start-ObservedConcat $binary $sessionDir $initialMode ([bool]$initialSafe) ([bool]$CpuOnlyUi)
    # Capture a report BEFORE any recovery. Do not lose the original crash.
    Print-Diagnostics $sessionDir
    $firstDiagnostic = Get-SessionDiagnosticCode $sessionDir
    if (-not $initialSafe -and $firstDiagnostic -eq 'GPU' -and (Get-SessionAdapterType $sessionDir '01-normal') -ne 'Cpu' -and -not $CpuOnlyUi) {
        Save-SoftwareGraphicsPreference $sessionDir
    }
    if (-not $CpuOnlyUi -and $initialSafe -and $firstDiagnostic -eq 'GPU') {
        Disable-FailedSoftwarePreference $sessionDir
    }
    if (-not $CpuOnlyUi -and -not $initialSafe -and (Should-RetrySoftware $sessionDir $exitCode)) {
        Write-Warning 'GPU device lost / startup failure: membuka SATU KALI ulang dalam Software Graphics Mode. Sesi awal tetap tersimpan.'
        $session.attempts = @('01-normal','02-software')
        Write-JsonFile (Join-Path $sessionDir 'session.json') $session
        $exitCode = Start-ObservedConcat $binary $sessionDir '02-software' $true
        Print-Diagnostics $sessionDir
        if ((Get-SessionDiagnosticCode $sessionDir) -eq 'GPU') {
            Disable-FailedSoftwarePreference $sessionDir
        }
    }
    if ($null -ne $exitCode -and $exitCode -ne 0 -and -not $CpuOnlyUi -and -not $initialSafe -and $session.attempts.Count -eq 1) {
        Write-Warning 'Concat berhenti saat digunakan. Tidak mengulang otomatis untuk crash impor/decoder; lihat laporan otomatis agar penyebab tidak tertutupi.'
    }
    Write-Host "[DIAGNOSTIK] Riwayat sesi tersimpan lokal: $sessionDir"
    if ($null -eq $exitCode) { throw 'Concat tidak dapat dibuka. Laporan otomatis sudah disimpan.' }
    $finalDiagnostic = Get-SessionDiagnosticCode $sessionDir
    # Concat can catch its GPU failure internally, close its window, then exit 0.
    # The terminal MUST NOT call this a successful exit.
    if ($finalDiagnostic -in @('GPU','NATIVE_MEMORY','ACCESS_VIOLATION','MISSING_DLL','ILLEGAL_INSTRUCTION','PANIC','MEDIA_DECODER')) {
        throw "Concat mengalami crash yang tercatat: $finalDiagnostic (exit code proses=$exitCode). Lihat BAGIKAN-LOG-TERAKHIR.txt."
    }
    if ($exitCode -ne 0) { throw "Concat gagal dengan exit code $exitCode. Laporan otomatis sudah disimpan." }
    Write-Host '[INFO] Proses keluar dengan kode 0 dan tidak ada error fatal dalam log. Ini belum membuktikan semua fitur telah berhasil.'
}


function Record-LauncherFailure([string]$message) {
    # Clone/download/missing executable may fail BEFORE concat.exe exists.
    # Record that failure in the same automatic session, without guessing GPU or codec.
    $sessionDir = $script:currentSessionDir
    if (-not $sessionDir -or -not (Test-Path -LiteralPath $sessionDir -PathType Container)) { return }
    $sessionFile = Join-Path $sessionDir 'session.json'
    $meta = Get-Content -LiteralPath $sessionFile -Raw | ConvertFrom-Json
    $priorAttempts = @($meta.attempts | Where-Object { $_ -is [string] -and $_ })
    # If a launched process already failed with a recorded exit code,
    # the cause is in that attempt; don't overwrite it with a generic launcher note.
    if ($priorAttempts.Count -gt 0 -and $message -match '^Concat (?:gagal dengan exit code|tidak dapat dibuka|mengalami crash yang tercatat)') { return }
    $label = if ($priorAttempts.Count -eq 0) { '00-launcher' } else { '99-launcher-error' }
    $attemptDir = Join-Path $sessionDir $label
    New-Item -ItemType Directory -Path $attemptDir -Force | Out-Null
    Write-JsonFile (Join-Path $attemptDir 'attempt.json') ([ordered]@{
        startedAtUtc = $meta.startedAtUtc
        finishedAtUtc = [DateTime]::UtcNow.ToString('o')
        exitCode = $null
        binaryPath = $null
        mode = 'launcher'
        note = $message
    })
    $meta.attempts = @($priorAttempts + $label)
    Write-JsonFile $sessionFile $meta
    Print-Diagnostics $sessionDir
}

try {
    switch ($Action) {
        'launch' { Launch-ConcatSource }
        'launch-cpu' { Launch-ConcatSource }
        'setup' { $null = Ensure-Portable }
        'clone' { Ensure-Source }
        'build' { Build-ConcatSource }
        'build-cpu' { Build-CpuOnlySource }
        'import-cpu' { Import-CloudCpuPackage $Package }
        'gpu-reset' { Reset-GpuPreference }
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
            Write-Host "[CPU SOURCE PATCH] $(Test-CpuSourcePatched)"
            Write-Host "[CPU CLOUD PORTABLE] $(Test-CloudCpuPackage $cpuPortableCurrent)"
            foreach ($name in @('git','cargo','rustc','cmake')) {
                if (Get-AvailableCommand $name) { Write-Host "[OK] $name" }
                else { Write-Host "[BELUM ADA] $name" }
            }
        }
    }
} catch {
    $failureMessage = $_.Exception.Message
    Write-Host "[GAGAL] $failureMessage" -ForegroundColor Red
    Write-LauncherEvent "LAUNCH_FAILED: $failureMessage"
    if ($Action -eq 'launch') {
        try { Record-LauncherFailure $failureMessage } catch { Write-Warning "Gagal menyusun laporan otomatis: $($_.Exception.Message)" }
        if ($script:currentSessionDir) { Write-Host "[LOG] Lokasi laporan otomatis: $($script:currentSessionDir)" }
    }
    exit 1
}
