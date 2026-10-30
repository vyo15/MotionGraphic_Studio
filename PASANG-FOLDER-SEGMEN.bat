@echo off
setlocal
cd /d "%~dp0"
echo.
echo === SETUP FOLDER DAN PREVIEW PER SEGMEN ===
echo Studio Master harus berada di folder yang sama dengan BAT ini.
if not exist "package.json" (
  echo [ERROR] Buka file BAT ini di folder MotionGraphic-Studio yang berisi package.json.
  pause
  exit /b 1
)
node "tools\setup-segment-folders.mjs"
if errorlevel 1 (
  echo [ERROR] Setup dibatalkan. File lain tidak akan disinkronkan.
  pause
  exit /b 1
)
call npm run sync
if errorlevel 1 (
  echo [ERROR] Sync gagal. Periksa pesan di atas. Backup manifest ada di library\backups.
  pause
  exit /b 1
)
echo.
echo [BERHASIL] Sekarang buka Remotion Studio: npm run dev
pause
