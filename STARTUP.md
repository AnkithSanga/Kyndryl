# Kyndryl Banking Assistant - Startup Guide

## Quick Start

### Windows Users
Choose one of these methods to start both frontend and backend servers:

#### Option 1: Automated Batch Script (Easiest)
```bash
startup.bat
```
This will automatically:
1. Set up frontend dependencies (npm install)
2. Set up backend dependencies (pip install)
3. Start both servers in separate windows

#### Option 2: PowerShell Script
```powershell
powershell -ExecutionPolicy Bypass -File startup.ps1
```

#### Option 3: Manual Startup (in separate terminals)
**Terminal 1 - Frontend:**
```bash
cd frontend
npm install
npm start
```

**Terminal 2 - Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

### macOS/Linux Users
```bash
chmod +x startup.sh
./startup.sh
```

Or manually in separate terminals:

**Terminal 1 - Frontend:**
```bash
cd frontend
npm install
npm start
```

**Terminal 2 - Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

## Server Addresses

Once both servers are running, access the application at:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | React UI (Banking Assistant) |
| **Backend API** | http://localhost:5000 | Flask REST API |
| **Chat Endpoint** | http://localhost:5000/api/chat | Send messages to AI |
| **Test AI** | http://localhost:5000/api/test-ai | Check AI model availability |
| **Health Check** | http://localhost:5000/api/health | Verify backend is running |

---

## Prerequisites

### Required Software
- **Node.js 18+** - Download from https://nodejs.org/
- **Python 3.9+** - Download from https://www.python.org/
- **npm** (comes with Node.js)
- **pip** (comes with Python)

### Verify Installation
```bash
node --version      # Should show v18 or higher
npm --version       # Should show 9+ 
python --version    # Should show 3.9+
pip --version       # Should show 21+
```

---

## Deployment with Netlify

### Configuration Files
- `netlify.toml` - Main deployment configuration
- Handles both frontend (React build) and backend (serverless functions)
- Includes environment variables and API redirects

### Environment Variables
Set these in Netlify dashboard or `.env` file:

**Frontend (.env):**
```
REACT_APP_API_URL=https://your-backend-url.com
```

**Backend (.env):**
```
GOOGLE_API_KEY=your-gemini-api-key
FLASK_ENV=production
```

---

## Troubleshooting

### "npm: command not found"
- Node.js is not installed or not in PATH
- Install from https://nodejs.org/
- Restart your terminal after installation

### "python: command not found"
- Python is not installed or not in PATH
- Install from https://www.python.org/
- Restart your terminal after installation

### Port 3000 or 5000 already in use
**For Windows:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**For macOS/Linux:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Frontend loads but API calls fail
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Verify API base URL in frontend code matches backend URL

### Backend won't start (ImportError)
```bash
# Reinstall Python dependencies
cd backend
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
python app.py
```

### Virtual Environment Issues
```bash
# For Python backend, create fresh venv
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate.bat

# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
python app.py
```

---

## Development Tips

### Hot Reload
- **Frontend**: Automatically reloads when you edit React files (npm start)
- **Backend**: Install `flask-reload` for auto-restart on code changes
  ```bash
  pip install flask-reload
  ```

### View Logs
- **Frontend**: Check browser console (F12)
- **Backend**: Check terminal where `python app.py` is running

### Test AI Models
Navigate to: http://localhost:5000/api/test-ai

This shows:
- Available Gemini models
- API key status
- Library version
- Model compatibility

### Clear Cache
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend  
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

---

## File Structure

```
Kyndryl/
├── frontend/                  # React UI
│   ├── package.json
│   ├── public/
│   ├── src/
│   └── README.md
├── backend/                   # Flask API
│   ├── app.py                # Main server
│   ├── requirements.txt       # Python dependencies
│   ├── translation_service.py
│   ├── faq_data.py
│   └── README.md
├── netlify.toml              # Netlify deployment config
├── startup.bat               # Windows startup script
├── startup.ps1               # PowerShell startup script
├── startup.sh                # macOS/Linux startup script
├── STARTUP.md                # This file
└── README.md
```

---

## Next Steps

1. **Start both servers** using one of the startup methods above
2. **Open** http://localhost:3000 in your browser
3. **Test the UI**:
   - Type a message in the chat box
   - Toggle AI mode ON/OFF
   - Try voice input (click microphone icon)
4. **Check backend** at http://localhost:5000/api/health
5. **Test AI** at http://localhost:5000/api/test-ai

---

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review backend logs in the terminal
3. Check browser console (F12) for frontend errors
4. Verify all prerequisites are installed

Enjoy using the Kyndryl Banking Assistant! 🚀
