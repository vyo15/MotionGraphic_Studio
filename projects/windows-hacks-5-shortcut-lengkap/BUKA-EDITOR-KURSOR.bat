@echo off
setlocal
cd /d "%~dp0\..\.."
echo.
echo ==============================================
echo   WINDOWS HACKS - VISUAL CURSOR EDITOR V5
 echo ==============================================
echo.
echo Membuka server lokal untuk project ini.
echo Alamat browser: http://127.0.0.1:4081
echo Untuk menghentikan editor, tutup jendela Node.js yang muncul.
echo.
start "Visual Cursor Editor - Server" cmd /k node "projects\windows-hacks-5-shortcut-lengkap\tools\visual-cursor-editor.mjs"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4081"
endlocal
