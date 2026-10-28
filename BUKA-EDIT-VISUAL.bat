@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -Command "try { $r=Invoke-WebRequest -Uri 'http://127.0.0.1:4077/visual' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -eq 200) {exit 0} else {exit 1} } catch {exit 1}" >nul 2>&1
if errorlevel 1 (
  echo Menjalankan Master Studio dan editor visual...
  start "MotionGraphic Studio - npm run dev" cmd /k "npm run dev"
  timeout /t 8 /nobreak >nul
)
start "" "http://127.0.0.1:4077/visual"
endlocal
