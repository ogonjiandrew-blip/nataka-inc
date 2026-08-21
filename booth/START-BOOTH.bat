@echo off
setlocal EnableDelayedExpansion
title NATAKA LIVE - BOOTH

REM ===================================================================
REM  NATAKA LIVE - booth kiosk launcher
REM  Double-click this. It will:
REM    1. stop Windows sleeping / blanking the screen mid-festival
REM    2. serve the PRODUCTION build (no dev server, no stale chunks)
REM    3. open Chrome fullscreen kiosk with the camera pre-approved
REM    4. restore your power settings when you close it
REM
REM  Quit the booth: press ALT+F4  (or close this black window)
REM ===================================================================

set "PORT=3005"
set "APPDIR=%~dp0.."
set "URL=http://localhost:%PORT%/live?booth=1"
set "PROFILE=%LOCALAPPDATA%\NatakaBooth\chrome-profile"
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

if not exist "%CHROME%" (
  echo [X] Chrome not found. Install Google Chrome, then run this again.
  pause
  exit /b 1
)

cd /d "%APPDIR%"

echo.
echo  == NATAKA LIVE =====================================
echo.

REM --- 1. keep the machine awake -----------------------------------
echo  [1/4] Disabling sleep and screen blanking...
for /f "tokens=2 delims=:" %%A in ('powercfg /getactivescheme') do for /f "tokens=1" %%B in ("%%A") do set "SCHEME=%%B"
powercfg /change monitor-timeout-ac 0  >nul 2>&1
powercfg /change standby-timeout-ac 0  >nul 2>&1
powercfg /change disk-timeout-ac 0     >nul 2>&1

REM --- 2. production build (only if missing) ------------------------
if not exist ".next\BUILD_ID" (
  echo  [2/4] No production build found - building. This takes a few minutes...
  call npm run build
  if errorlevel 1 (
    echo.
    echo  [X] Build failed. Fix the error above and run this again.
    pause
    goto :restore
  )
) else (
  echo  [2/4] Production build found.
)

REM --- 3. start the server -----------------------------------------
echo  [3/4] Starting booth server on port %PORT%...
start "NATAKA-LIVE-SERVER" /min cmd /c "npx next start -p %PORT%"

REM wait until it actually answers, up to ~60s
set /a TRIES=0
:waitloop
set /a TRIES+=1
powershell -NoProfile -Command "try{(Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 3).StatusCode}catch{0}" | findstr /c:"200" >nul
if not errorlevel 1 goto ready
if %TRIES% GEQ 30 (
  echo  [X] Server did not come up. Is port %PORT% already in use?
  pause
  goto :cleanup
)
timeout /t 2 /nobreak >nul
goto waitloop

:ready
echo  [4/4] Server up. Launching kiosk...
echo.
echo  ====================================================
echo   BOOTH IS LIVE.  Press ALT+F4 in Chrome to finish.
echo  ====================================================
echo.

REM --- 4. kiosk chrome ---------------------------------------------
REM  --use-fake-ui-for-media-stream auto-approves the camera prompt using the
REM  REAL camera (it does NOT fake the video). Without it a guest would have to
REM  click "Allow" and the kiosk has no address bar to click it in.
REM  --check-for-update-interval stops Chrome restarting itself mid-day.
"%CHROME%" ^
  --kiosk ^
  --user-data-dir="%PROFILE%" ^
  --use-fake-ui-for-media-stream ^
  --autoplay-policy=no-user-gesture-required ^
  --start-fullscreen ^
  --noerrdialogs ^
  --disable-infobars ^
  --disable-session-crashed-bubble ^
  --disable-features=TranslateUI,MediaRouter,CalculateNativeWinOcclusion ^
  --disable-pinch ^
  --overscroll-history-navigation=0 ^
  --check-for-update-interval=31536000 ^
  --password-store=basic ^
  "%URL%"

:cleanup
echo.
echo  Closing booth server...
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /r /c:"LISTENING" ^| findstr /c:":%PORT% "') do taskkill /F /PID %%P >nul 2>&1
taskkill /FI "WINDOWTITLE eq NATAKA-LIVE-SERVER*" /F >nul 2>&1

:restore
echo  Restoring power settings...
powercfg /change monitor-timeout-ac 10 >nul 2>&1
powercfg /change standby-timeout-ac 30 >nul 2>&1
powercfg /change disk-timeout-ac 20    >nul 2>&1
echo  Done.
timeout /t 3 /nobreak >nul
endlocal
