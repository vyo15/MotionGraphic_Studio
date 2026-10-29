@echo off
cd /d "%~dp0"
echo Memasang/memperbarui skills resmi membutuhkan internet.
call npm run skills:install
pause
