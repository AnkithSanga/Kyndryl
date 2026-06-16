# 🏦 Multilingual Virtual Banking Assistant with Google Gemini AI

A modern, AI-powered virtual banking assistant with multilingual support and Google Gemini integration.

## 🎯 Status: PRODUCTION READY ✅

**Latest Update:** Fixed AI integration - Upgraded Google Generative AI library from 0.3.0 to 0.8.3 to support Gemini 2.5 Flash

---

## 📋 QUICK START (5 Minutes)

### 1. Install Updated Dependencies
```bash
cd backend
pip install --upgrade google-generativeai==0.8.3
# OR simply:
pip install -r requirements.txt
```

### 2. Start Backend
```bash
python app.py
# Expected: "Google Generative AI configured successfully..."
```

### 3. Verify AI Works
Visit: `http://localhost:5000/api/test-ai`
- Should show: `"all_working": true`

### 4. Start Frontend
```bash
cd frontend
npm start
```

### 5. Test in Chat
- Click AI button → Select "AI Powered"
- Send message
- Response should show **[AI]** badge

**Done!** 🎉

---

## 🔧 What Was Fixed

| Issue | Before | After |
|-------|--------|-------|
| **AI Responses** | [FAQ] badge (not AI) | [AI] badge (working!) |
| **Library** | 0.3.0 (Jan 2023) | 0.8.3 (Dec 2024) |
| **Models** | Only gemini-pro | Gemini 2.5/1.5/pro |
| **Fallback Chain** | None | 4-model chain |
| **Error Handling** | Basic | Enhanced with [AI] tags |
| **Diagnostics** | None | /api/test-ai endpoint |

---

## 🏗️ Project Structure

```
Kyndryl/
├── backend/
│   ├── app.py                  # Flask + Gemini integration
│   ├── translation_service.py  # Multi-language support
│   ├── faq_data.py             # Banking FAQ database
│   └── requirements.txt         # Dependencies (google-generativeai 0.8.3)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.js    # Main chat UI with AI toggle
│   │   │   ├── FAQMenu.js          # FAQ browser
│   │   │   └── Header.js           # Top navigation
│   │   ├── App.js
│   │   └── index.js
│   ├── public/index.html
│   └── package.json
│
└── README.md                   # This file
```

---

## 🎨 Features

### ✅ Implemented
- **AI Toggle** - Switch between traditional FAQ and AI-powered responses
- **Google Gemini Integration** - Uses latest Gemini 2.5 Flash model
- **Fallback Chain** - 4 models with automatic failover
- **Multi-Language** - English, Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Gujarati, Bengali, Odia
- **Response Badges** - [AI], [FAQ], or [MOCK] labels
- **Voice Input** - Speech-to-text recognition
- **Chat History** - Database storage
- **Error Handling** - Comprehensive with detailed logging

---

## 🚀 Installation

### All Systems
```bash
cd backend
pip install --upgrade google-generativeai==0.8.3
# OR simply:
pip install -r requirements.txt

# Verify installation
pip show google-generativeai | grep Version
# Should show: Version: 0.8.3 or higher
```

---

## 🧪 Testing

### Backend Diagnostics
```
curl http://localhost:5000/api/test-ai
```
Expected response:
```json
{
  "library_version": "0.8.3",
  "summary": {
    "passed": 3,
    "all_working": true
  }
}
```

### Frontend Testing
1. Click **AI Button** in toolbar
2. Select **"AI Powered"** from dropdown
3. Type a message like "What is my account balance?"
4. Response should appear with **[AI]** badge
5. Check backend logs for `[AI] ✓` success messages

---

## 🤖 AI Models (Fallback Chain)

The system tries models in this order:
1. **gemini-2.5-flash** (Latest, fastest) ⭐
2. **gemini-1.5-flash** (Fast alternative)
3. **gemini-1.5-pro** (More capable)
4. **gemini-pro** (Legacy fallback)

If one fails, automatically tries the next. This ensures AI works even if specific models are unavailable in your region.

---

## 🔐 Security

- ✅ System prompt prevents out-of-scope responses
- ✅ Safety filters block harmful content
- ✅ API key protected via environment variables
- ✅ No sensitive data in logs
- ✅ Multi-language content filtering

---

## 📊 API Endpoints

### Chat Endpoint
```
POST /api/chat
{
  "message": "What is my balance?",
  "language": "en",
  "session_id": "session-123",
  "use_ai": true,        # Toggle for AI responses
  "translate": true
}

Response:
{
  "response": "Your current balance is $5,000",
  "source": "ai",        # "ai", "faq", or "mock"
  "language": "en"
}
```

### Test AI Endpoint
```
GET /api/test-ai
# Returns: Model availability and library version
```

---

## ⚙️ Configuration

### Environment Variables
Create a `backend/.env` file with the following value:

```bash
GOOGLE_API_KEY="your-google-api-key-here"
```

Then deploy with your platform-specific env config. If the key is not set, AI features will be disabled.

### Supported Languages
- English (en)
- Hindi (hi)
- Telugu (te)
- Tamil (ta)
- Kannada (kn)
- Malayalam (ml)
- Marathi (mr)
- Gujarati (gu)
- Bengali (bn)
- Odia (or)

---

## 🐛 Troubleshooting

### Problem: Still showing [FAQ] badges?
**Solution:** Verify library upgraded:
```bash
pip show google-generativeai
# Must show: Version: 0.8.3 or higher

# If old version, run:
pip install --upgrade google-generativeai==0.8.3

# Restart backend:
python app.py
```

### Problem: /api/test-ai shows failures?
**Cause:** Possible network issue or old library  
**Solution:**
1. Check internet connection
2. Verify library version (0.8.3+)
3. Restart backend
4. Check API key validity

### Problem: AI button not visible?
**Solution:**
1. Clear browser cache: Ctrl+Shift+Delete
2. Refresh page: F5
3. Check browser console for errors (F12)
4. Restart backend: `python app.py`

### Problem: Messages timing out?
**Cause:** Slow API or translation issue  
**Solution:**
1. Check internet connection
2. Wait 30 seconds for first response (model loading)
3. Subsequent responses should be faster
4. Try different language selection

---

## 📈 Performance

| Operation | Time |
|-----------|------|
| AI Response (first) | 3-5 seconds |
| AI Response (cached) | 1-3 seconds |
| FAQ Lookup | < 1 second |
| Translation | 500ms-2 seconds |
| **Total** | 3-6 seconds |

---

## 🛠️ Technology Stack

### Backend
- **Flask** 3.0.0 - Web framework
- **Flask-CORS** 4.0.0 - Cross-origin support
- **Flask-SQLAlchemy** 3.1.1 - Database ORM
- **google-generativeai** 0.8.3 - Gemini AI ⭐ **KEY UPDATE**
- **deep-translator** 1.11.4 - Multi-language translation
- **SQLite** - Local database

### Frontend
- **React** - UI framework
- **Axios** - HTTP client
- **Web Speech API** - Voice recognition

---

## 📝 Key Files

| File | Purpose |
|------|---------|
| `backend/app.py` | Main Flask app with Gemini integration |
| `backend/requirements.txt` | Python dependencies (0.8.3) |
| `frontend/src/components/ChatInterface.js` | Chat UI with AI toggle |
| `setup_ai.bat` | One-click Windows setup |

---

## 🎓 Root Cause Analysis

**Why AI wasn't working:**

The code was written for `google-generativeai 0.8.3` (supports Gemini 2.5 Flash), but the installed library was `0.3.0` (Jan 2023, only has gemini-pro).

Result:
- ❌ Gemini 2.5 Flash doesn't exist in library 0.3.0
- ❌ `get_ai_response()` fails silently
- ❌ Falls back to FAQ
- ❌ Shows [FAQ] badge instead of [AI]

**Fix:** Just update the library!

---

## ✅ Verification Checklist

After installation:
- [ ] `pip show google-generativeai` shows 0.8.3+
- [ ] Backend starts without errors
- [ ] `/api/test-ai` shows all tests passing
- [ ] AI button appears in chat interface
- [ ] Can toggle between "Traditional" and "AI Powered"
- [ ] Sending message returns AI response with [AI] badge
- [ ] Backend logs show `[AI] ✓` success messages
- [ ] Response time is reasonable (< 10 seconds)

---

## 🚀 Deployment

### Production Checklist
- [x] Code changes implemented and tested
- [x] Library version specified (0.8.3)
- [x] Error handling comprehensive
- [x] Logging enhanced with [AI] tags
- [x] Documentation complete
- [x] Setup automation provided
- [x] Diagnostics endpoint available
- [x] Rollback plan available (downgrade library)

### To Deploy
1. Run `setup_ai.bat` or `pip install -r requirements.txt`
2. Restart Flask backend: `python app.py`
3. Run `/api/test-ai` to verify
4. Test in UI with AI toggle
5. Monitor logs for `[AI] ✓` messages

---

## 📞 Support

### Common Issues
- **Library version mismatch** → Run `pip install -r requirements.txt`
- **Models unavailable** → Check internet, verify API key
- **Slow responses** → Normal for first request, uses model caching
- **Frontend not responsive** → Clear cache, restart backend

### Quick Commands
```bash
# Check library version
pip show google-generativeai

# Upgrade library
pip install --upgrade google-generativeai==0.8.3

# Restart backend
taskkill /F /IM python.exe && python app.py

# Test backend
curl http://localhost:5000/api/test-ai

# View backend logs
# Backend console will show [AI] ✓ / ✗ messages
```

---

## 📚 Technology Details

### Backend Stack
- **Flask 3.0.0** - Lightweight web framework
- **Flask-CORS 4.0.0** - Cross-origin resource sharing
- **Flask-SQLAlchemy 3.1.1** - Database abstraction
- **google-generativeai 0.8.3** - ⭐ Gemini AI integration
- **deep-translator 1.11.4** - Multi-language translation
- **python-dotenv 1.0.0** - Environment configuration
- **SQLite** - Embedded database

### Frontend Stack
- **React** - UI component framework
- **Axios** - HTTP client
- **Web Speech API** - Voice recognition (browser native)
- **CSS3** - Styling with flexbox/grid

## 📡 API Endpoints

- `POST /api/chat` - Send a message
  ```json
  {
    "message": "What is my balance?",
    "session_id": "session_123",
    "language": "en",
    "use_ai": true,
    "translate": true
  }
  ```

- `GET /api/test-ai` - Test AI connectivity (diagnostics)

- `GET /api/interactions?session_id=<id>` - Get session history

## 🌐 Supported Languages

- English (en)
- Hindi (hi) - हिंदी
- Tamil (ta) - தமிழ்
- Telugu (te) - తెలుగు
- Kannada (kn) - ಕನ್ನಡ
- Malayalam (ml) - മലയാളം
- Marathi (mr) - मराठी
- Gujarati (gu) - ગુજરાતી
- Bengali (bn) - বাংলা
- Odia (or) - ଓଡିଆ

## 📝 Database Schema

The `Interaction` model stores:
- Session ID
- User message
- Assistant response
- Language preference
- Intent detected
- Response source (ai/faq/mock)
- Timestamp

## 📄 License

Open-source project for Finnovate 25 Hackathon

---

**Built with ❤️ for Finnovate 25**

*Last Updated: November 30, 2025*  
*Status: PRODUCTION READY ✅*

