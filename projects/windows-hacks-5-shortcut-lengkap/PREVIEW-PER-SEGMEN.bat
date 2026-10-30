@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
if not exist "tools\preview-segmen.ps1" (
    echo [ERROR] Tidak menemukan tools\preview-segmen.ps1
    echo Jalankan dari folder asli add-on di projects\windows-hacks-5-shortcut-lengkap\.
    pause
    exit /b 1
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\preview-segmen.ps1"
if errorlevel 1 (
    echo.
    echo Preview gagal. Periksa pesan di atas.
)
echo.
pause
endlocal
