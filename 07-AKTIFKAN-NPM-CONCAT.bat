@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo [GAGAL] Node.js belum tersedia di PATH. Gunakan terminal Master yang biasa untuk menjalankan npm run dev.
  pause
  exit /b 1
)
node "tools\enable-concat-npm.mjs"
if errorlevel 1 (
  echo [GAGAL] Perintah npm tidak berhasil didaftarkan.
  pause
  exit /b 1
)
echo.
echo Berhasil! Buka terminal di folder Master Studio.
echo.
echo   npm run dev           - Buka Remotion Studio
echo   npm run concat:setup  - Instal Concat satu kali bila belum ada
echo   npm run concat        - Buka Concat Editor
echo   npm run concat:safe   - Buka Concat mode software graphics
echo.
pause
