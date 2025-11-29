# Setup Instructions

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher and npm

## Step-by-Step Setup

### 1. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Start the backend server:

```bash
python app.py
```

The backend API will run on `http://localhost:5000`

### 2. Frontend Setup

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

Install Node.js dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will automatically open in your browser at `http://localhost:3000`

## Testing the Application

1. Make sure both backend and frontend are running
2. Open the browser to `http://localhost:3000`
3. Try sending messages like:
   - "Check my balance"
   - "Show my transactions"
   - "I want to transfer money"
4. Try switching languages using the dropdown in the header
5. Test the quick action buttons

## Troubleshooting

- **Backend not starting**: Make sure port 5000 is not in use
- **Frontend not starting**: Make sure port 3000 is not in use
- **CORS errors**: Ensure backend is running and CORS is enabled
- **Database errors**: Delete `banking_assistant.db` and restart the backend to recreate it

