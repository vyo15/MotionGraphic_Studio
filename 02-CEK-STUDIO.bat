@echo off
cd /d "%~dp0"
echo Memeriksa source, sinkronisasi, editability dan TypeScript...
call npm run check
pause
