@echo off
REM Kyndryl Banking Assistant - Full Stack Startup Script
REM Starts both frontend (React) and backend (Flask) servers simultaneously

echo.
echo ======================================
echo Kyndryl Banking Assistant
echo Full Stack Development Server
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo [1/4] Setting up Frontend...
echo Starting: cd frontend ^&^& npm install
cd /d "%~dp0frontend" || exit /b 1

REM Check if node_modules exists, skip install if it does
if not exist "node_modules" (
    echo Running npm install...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
) else (
    echo node_modules already exists, skipping npm install
)

echo.
echo [2/4] Setting up Backend...
echo Starting: cd backend ^&^& pip install -r requirements.txt
cd /d "%~dp0backend" || exit /b 1

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ERROR: pip install failed
        pause
        exit /b 1
    )
) else (
    echo Virtual environment exists, activating...
    call venv\Scripts\activate.bat
)

echo.
echo ======================================
echo Starting Both Servers...
echo ======================================
echo.
echo Frontend will run on:  http://localhost:3000
echo Backend will run on:   http://localhost:5000
echo API endpoint:          http://localhost:5000/api
echo.
echo Press Ctrl+C to stop both servers
echo.
cd /d "%~dp0" || exit /b 1

REM Start both servers in parallel using start command
echo Starting Frontend (npm start in frontend/)...
start "Frontend - React Dev Server" cmd /k "cd frontend && npm start"

timeout /t 3 /nobreak

echo Starting Backend (python app.py in backend/)...
start "Backend - Flask API Server" cmd /k "cd backend && python app.py"

echo.
echo Both servers started in separate windows
echo Close the terminal windows to stop the servers
pause
