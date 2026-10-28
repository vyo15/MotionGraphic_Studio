@echo off
chcp 65001 >nul
cd /d "%~dp0"
title MotionGraphic Studio - Editable
if not exist package.json (echo ERROR: Jalankan dari folder Master Studio.& pause & exit /b 1)
where node >nul 2>nul
if errorlevel 1 (echo Node.js belum ditemukan. Install Node.js LTS.& pause & exit /b 1)
echo =============================================
echo  MOTIONGRAPHIC STUDIO - EDIT TANPA KODING
 echo =============================================
echo  Remotion Studio: http://localhost:3000
echo  Visual Editor : http://127.0.0.1:4077/visual
echo  Edit Teks/VO  : http://127.0.0.1:4077
start "" /min cmd /c "timeout /t 7 /nobreak >nul ^& start http://127.0.0.1:4077/visual"
call npm run dev
if errorlevel 1 (echo Server gagal. Cek pesan error di atas. & pause)
