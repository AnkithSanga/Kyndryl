# Kyndryl Banking Assistant - Full Stack Startup Script (PowerShell)
# Starts both frontend (React) and backend (Flask) servers simultaneously

Write-Host ""
Write-Host "======================================"
Write-Host "Kyndryl Banking Assistant"
Write-Host "Full Stack Development Server"
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install from: https://nodejs.org/"
    exit 1
}

# Check if Python is installed
try {
    $pythonVersion = python --version
    Write-Host "✓ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install from: https://www.python.org/"
    exit 1
}

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# Setup Frontend
Write-Host ""
Write-Host "[1/4] Setting up Frontend..." -ForegroundColor Cyan
Push-Location "$projectRoot\frontend"

if (-not (Test-Path "node_modules")) {
    Write-Host "Running npm install..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ ERROR: npm install failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✓ node_modules already exists, skipping npm install" -ForegroundColor Green
}

Pop-Location

# Setup Backend
Write-Host ""
Write-Host "[2/4] Setting up Backend..." -ForegroundColor Cyan
Push-Location "$projectRoot\backend"

if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..."
    python -m venv venv
    & "$projectRoot\backend\venv\Scripts\Activate.ps1"
    pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ ERROR: pip install failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✓ Virtual environment exists, activating..." -ForegroundColor Green
    & "$projectRoot\backend\venv\Scripts\Activate.ps1"
}

Pop-Location

# Start both servers
Write-Host ""
Write-Host "======================================"
Write-Host "Starting Both Servers..." -ForegroundColor Green
Write-Host "======================================"
Write-Host ""
Write-Host "Frontend will run on:  http://localhost:3000" -ForegroundColor Yellow
Write-Host "Backend will run on:   http://localhost:5000" -ForegroundColor Yellow
Write-Host "API endpoint:          http://localhost:5000/api" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Red
Write-Host ""

# Function to start frontend
function Start-Frontend {
    Push-Location "$projectRoot\frontend"
    Write-Host "[Frontend] Starting npm start..." -ForegroundColor Cyan
    npm start
    Pop-Location
}

# Function to start backend
function Start-Backend {
    Push-Location "$projectRoot\backend"
    & "$projectRoot\backend\venv\Scripts\Activate.ps1"
    Write-Host "[Backend] Starting Flask server..." -ForegroundColor Cyan
    python app.py
    Pop-Location
}

# Start both in background jobs
Write-Host "[3/4] Starting Frontend server..." -ForegroundColor Green
$frontendJob = Start-Job -ScriptBlock ${function:Start-Frontend} -Name "Frontend"
Write-Host "✓ Frontend job started (Job ID: $($frontendJob.Id))" -ForegroundColor Green

Start-Sleep -Seconds 2

Write-Host "[4/4] Starting Backend server..." -ForegroundColor Green
$backendJob = Start-Job -ScriptBlock ${function:Start-Backend} -Name "Backend"
Write-Host "✓ Backend job started (Job ID: $($backendJob.Id))" -ForegroundColor Green

Write-Host ""
Write-Host "======================================"
Write-Host "✓ Both servers are running!" -ForegroundColor Green
Write-Host "======================================"
Write-Host ""
Write-Host "Frontend output:"
Receive-Job -Job $frontendJob -Keep
Write-Host ""
Write-Host "Backend output:"
Receive-Job -Job $backendJob -Keep
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers"
Write-Host ""

# Keep the script running and show output
while ($true) {
    Start-Sleep -Seconds 1
    Receive-Job -Job $frontendJob -Keep | Out-Host
    Receive-Job -Job $backendJob -Keep | Out-Host
}
