# Railway Deployment Guide

This project is configured for deployment on **Railway** (railway.app), a modern platform-as-a-service (PaaS).

## Files Added for Railway Deployment

### 1. **Dockerfile** (`backend/Dockerfile`)
   - Containerizes the Flask application using Python 3.11-slim
   - Installs dependencies via pip
   - Configures Gunicorn as the WSGI server
   - Includes health check for monitoring

### 2. **Procfile** (`backend/Procfile`)
   - Defines how Railway should start the application
   - Configures Gunicorn with 4 workers and 120s timeout

### 3. **railway.json** (root directory)
   - Railway-specific configuration file
   - Specifies Docker build, deployment, and restart policies

### 4. **.railwayignore** (root directory)
   - Specifies files/folders to exclude from deployment
   - Optimizes build size

### 5. **requirements.txt** (updated)
   - Added `gunicorn==21.2.0` for production WSGI server
   - Removed duplicate `python-dotenv` entry

### 6. **app.py** (updated)
   - Added `/health` endpoint for monitoring (required by Dockerfile health check)

### 7. **.env.example** (`backend/.env.example`)
   - Template for environment variables
   - Copy to `.env` and fill in your credentials

## Deployment Steps

### Prerequisites
1. Create a [Railway account](https://railway.app) (free tier available)
2. Install [Railway CLI](https://docs.railway.app/develop/cli):
   ```bash
   npm install -g @railway/cli
   ```

### Option A: Deploy via Railway Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Railway deployment configuration"
   git push origin AI-Integration
   ```

2. **Create Railway Project:**
   - Visit https://railway.app/dashboard
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect the Dockerfile

3. **Configure Environment Variables:**
   - Go to project settings → Variables
   - Add all variables from `backend/.env.example`:
     - `GOOGLE_API_KEY`: Your Google Generative AI key
     - `FLASK_ENV`: Set to `production`
     - `SECRET_KEY`: A secure random string

4. **Monitor Deployment:**
   - Check Deployments tab for build logs
   - Once deployed, you'll get a public URL like `https://your-project.railway.app`

### Option B: Deploy via Railway CLI

```bash
# Login to Railway
railway login

# Initialize Railway project in your repo
railway init

# Select your project or create a new one

# Set environment variables
railway variables set GOOGLE_API_KEY="your_key_here"
railway variables set FLASK_ENV="production"

# Deploy
railway up
```

## Health Check & Monitoring

- **Health endpoint:** `https://your-project.railway.app/health`
- Returns: `{ "status": "healthy", "service": "Kyndryl Banking Assistant", "timestamp": "..." }`
- Railway uses this for automatic restarts if service is unhealthy

## Environment Variables Required

| Variable | Example | Required | Notes |
|----------|---------|----------|-------|
| `GOOGLE_API_KEY` | `AIza...` | ✓ | Get from [Google Cloud Console](https://console.cloud.google.com) |
| `FLASK_ENV` | `production` | ✓ | Disable debug mode in production |
| `SECRET_KEY` | `your-random-secret` | ✓ | Use a strong random string |
| `CORS_ORIGINS` | `https://yourdomain.com` | ✗ | Restrict CORS if frontend is deployed separately |

## API Endpoints After Deployment

```
GET    /health                    - Health check
POST   /chat                      - Chat with banking assistant
POST   /translate                 - Translate text
GET    /faqs                      - Get all FAQs
GET    /faqs/<category>           - Get FAQs by category
POST   /search-faq                - Search FAQs by keyword
```

## Local Testing Before Deployment

```bash
# Install dependencies locally
pip install -r backend/requirements.txt

# Set up environment
cd backend
cp .env.example .env
# Edit .env with your GOOGLE_API_KEY

# Test with Gunicorn (same as production)
gunicorn --bind 0.0.0.0:5000 --workers 4 app:app

# Or test with Flask dev server
python app.py

# Test health endpoint
curl http://localhost:5000/health
```

## Troubleshooting

### Deployment fails with "Module not found"
- Check `requirements.txt` has all dependencies
- Ensure no local `.venv` folder is being uploaded (check `.railwayignore`)

### Application crashes after deployment
- Check logs: `railway logs`
- Verify all environment variables are set
- Check GOOGLE_API_KEY is valid

### Health check fails
- Ensure Flask is responding on port 5000
- Check database initialization: `python -c "from app import db; db.create_all()"`

### CORS issues with frontend
- Set `CORS_ORIGINS` environment variable to your frontend URL
- Or use wildcard in production (less secure): `CORS_ORIGINS=*`

## Performance & Scaling

The current Dockerfile is configured for:
- **Workers:** 4 (suitable for ~100 concurrent requests)
- **Timeout:** 120 seconds (for LLM inference latency)
- **Memory:** Railway default (512 MB+)

To scale:
1. Increase `--workers` in Procfile/Dockerfile (for more concurrent users)
2. Upgrade Railway plan for more RAM and CPU

## Database Considerations

- SQLite is used by default (suitable for small-to-medium traffic)
- For production with high traffic, consider migrating to PostgreSQL:
  ```
  railway add postgres
  ```
- Update `SQLALCHEMY_DATABASE_URI` to use PostgreSQL connection string

## Monitoring & Logs

```bash
# View live logs
railway logs

# View deployment history
railway logs --service <service_name>

# Check metrics
railway open (opens dashboard in browser)
```

## Next Steps

1. Deploy the backend to Railway
2. Update frontend environment to point to Railway backend URL
3. Configure CORS if deploying frontend separately
4. Monitor health and performance on Railway dashboard
