@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Node.js belum terpasang atau belum masuk PATH.
 echo Gunakan Node.js yang sama dengan MotionGraphic Studio.
 pause
 exit /b 1
)
echo Menjalankan Easy2Boot Visual Editor...
node editor\server.mjs
if errorlevel 1 pause
