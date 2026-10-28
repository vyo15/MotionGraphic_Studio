@echo off
cd /d "%~dp0"
node tools/audit-inline-editing.mjs
if errorlevel 1 (echo Perbaiki project yang gagal audit sebelum render.)
pause
