#!/usr/bin/env bash
# Kyndryl Banking Assistant - Full Stack Startup Script (macOS/Linux)
# Starts both frontend (React) and backend (Flask) servers simultaneously

echo ""
echo "======================================"
echo "Kyndryl Banking Assistant"
echo "Full Stack Development Server"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python is not installed or not in PATH"
    echo "Please install Python from https://www.python.org/"
    exit 1
fi

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Setup Frontend
echo ""
echo "[1/4] Setting up Frontend..."
cd "$PROJECT_ROOT/frontend"

if [ ! -d "node_modules" ]; then
    echo "Running npm install..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: npm install failed"
        exit 1
    fi
else
    echo "✓ node_modules already exists, skipping npm install"
fi

# Setup Backend
echo ""
echo "[2/4] Setting up Backend..."
cd "$PROJECT_ROOT/backend"

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "ERROR: pip install failed"
        exit 1
    fi
else
    echo "✓ Virtual environment exists"
    source venv/bin/activate
fi

cd "$PROJECT_ROOT"

# Start both servers
echo ""
echo "======================================"
echo "Starting Both Servers..."
echo "======================================"
echo ""
echo "Frontend will run on:  http://localhost:3000"
echo "Backend will run on:   http://localhost:5000"
echo "API endpoint:          http://localhost:5000/api"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start frontend in background
echo "[3/4] Starting Frontend server..."
cd "$PROJECT_ROOT/frontend"
npm start &
FRONTEND_PID=$!
echo "✓ Frontend started (PID: $FRONTEND_PID)"

sleep 2

# Start backend
echo "[4/4] Starting Backend server..."
cd "$PROJECT_ROOT/backend"
source venv/bin/activate
python app.py &
BACKEND_PID=$!
echo "✓ Backend started (PID: $BACKEND_PID)"

echo ""
echo "======================================"
echo "✓ Both servers are running!"
echo "======================================"
echo ""

# Wait for both processes
wait $FRONTEND_PID $BACKEND_PID
