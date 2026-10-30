@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title MotionGraphic Studio - Fix Folder Segmen

echo.
echo ======================================================
echo       MOTIONGRAPHIC STUDIO v1.8.1 - FIX SEGMEN
 echo ======================================================
echo.
if not exist "package.json" (
  echo [ERROR] File BAT harus berada di folder MASTER yang berisi package.json.
  echo Ekstrak ZIP change-only, lalu gabungkan isinya ke MotionGraphic-Studio.
  pause
  exit /b 1
)
if not exist "tools\register-scene-segments.mjs" (
  echo [ERROR] Tool perbaikan belum disalin ke tools\.
  pause
  exit /b 1
)
where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js tidak ditemukan. Pastikan Node.js sudah terpasang.
  pause
  exit /b 1
)
echo [1/2] Mendaftarkan scene dari source timeline dan menyinkronkan library...
echo       Manifest video dan defaultProps milik pengguna dipertahankan.
call npm run sync
if errorlevel 1 (
  echo.
  echo [GAGAL] Sinkronisasi belum selesai. Periksa pesan error di atas.
  echo       Data video tidak dihapus. Backup manifest tersimpan di library\backups\segment-registration\.
  pause
  exit /b 1
)
echo.
echo [2/2] Selesai. Sidebar kini berisi video lengkap DAN scene per segmen.
echo       Jika Studio sedang terbuka, tutup terminal Studio lama lalu jalankan npm run dev.
echo       Windows Hacks: 7 segmen. IP Address: 5 segmen.
echo.
pause
endlocal
