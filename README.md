# 🏦 Multilingual Virtual Banking Assistant

**Finnovate 25 Hackathon Project**

A modern, AI-powered virtual banking assistant with multilingual support, designed to integrate with Bhashini API for seamless language processing.

## 🎯 Project Overview

This project demonstrates the integration of AI into banking fintech, providing a virtual assistant that can:
- Handle banking queries in multiple languages (English, Hindi, Tamil)
- Provide account information, transaction history, and banking services
- Store all interactions in a database for analytics
- Support seamless language switching

## 🏗️ Project Structure

```
finnovate-banking-assistant/
├── backend/          # Flask API server
│   ├── app.py       # Main API application
│   ├── requirements.txt
│   └── README.md
├── frontend/         # React UI application
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── README.md
└── README.md
```

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The UI will open at `http://localhost:3000`

## 🎨 Features

### Current Implementation
- ✅ Modern, responsive UI with gradient design
- ✅ Multilingual support (English, Hindi, Tamil)
- ✅ Real-time chat interface
- ✅ Mocked banking assistant responses
- ✅ SQLite database for interaction storage
- ✅ RESTful API with Flask
- ✅ Quick action buttons for common queries

### Future Integration
- 🔄 Bhashini API integration for advanced language processing
- 🔄 Advanced NLP for better intent detection
- 🔄 User authentication and session management
- 🔄 Real banking API integration
- 🔄 Analytics dashboard

## 🛠️ Technology Stack

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Modern styling with gradients and animations

## 📡 API Endpoints

- `POST /api/chat` - Send a message to the banking assistant
  ```json
  {
    "message": "Check my balance",
    "session_id": "session_123",
    "language": "en"
  }
  ```

- `GET /api/interactions?session_id=<id>` - Get all interactions for a session

- `GET /api/health` - Health check endpoint

## 🌐 Supported Languages

- English (en)
- Hindi (hi) - हिंदी
- Tamil (ta) - தமிழ்

## 📝 Database Schema

The `Interaction` model stores:
- Session ID
- User message
- Assistant response
- Language
- Intent
- Timestamp

## 🎯 Next Steps

1. Test the application with both backend and frontend running
2. Review the UI and provide feedback for improvements
3. Integrate Bhashini API for enhanced language processing
4. Add more banking features and intents
5. Implement user authentication

## 📄 License

Open-source project for Finnovate 25 Hackathon

---

**Built with ❤️ for Finnovate 25**

