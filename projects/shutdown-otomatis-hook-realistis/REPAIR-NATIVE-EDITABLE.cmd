@echo off
setlocal
cd /d "%~dp0"
echo.
echo === SHUTDOWN OTOMATIS - REPAIR NATIVE EDITABLE ===
echo Hanya production\editable-blueprint.json yang akan diubah jika cocok.
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo [STOP] Node.js tidak ditemukan. Instal Node.js lalu ulangi.
  pause
  exit /b 1
)
node "%~dp0REPAIR-NATIVE-EDITABLE.mjs"
echo.
pause
