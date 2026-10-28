@echo off
setlocal
cd /d "%~dp0"
node tools\remotion-skills.mjs status
pause
