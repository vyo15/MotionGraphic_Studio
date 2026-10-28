@echo off
setlocal
cd /d "%~dp0"
title Install All Official Remotion Agent Skills
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js tidak ditemukan. Install Node.js lalu coba lagi.
  pause
  exit /b 1
)
node tools\remotion-skills.mjs install
if errorlevel 1 (
  echo.
  echo Skill resmi belum lengkap. Baca PANDUAN-SKILL-REMOTION.md
) else (
  echo.
  echo Verifikasi selesai. Skill Remotion resmi terpasang.
)
pause
