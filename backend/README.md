# Banking Assistant API

Backend API for the multilingual virtual banking assistant.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## Endpoints

- `POST /api/chat` - Send a message to the banking assistant
- `GET /api/interactions?session_id=<id>` - Get all interactions for a session
- `GET /api/health` - Health check

## Database

SQLite database is automatically created at `banking_assistant.db`

