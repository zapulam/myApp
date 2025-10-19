# MyApp Backend

FastAPI backend with SQLite database for authentication.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Copy environment file:
```bash
cp env.example .env
```

3. Update `.env` file with your configuration:
- Change `SECRET_KEY` to a secure random string
- Update `DATABASE_URL` if needed (default: SQLite)

## Running the Server

### Development:
```bash
python main.py
```

### Production:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

- `GET /` - Health check
- `POST /auth/signup` - Create new user account (sends verification email)
- `POST /auth/login` - Authenticate user (requires verified email)
- `GET /auth/me` - Get current user info (requires token)
- `POST /auth/verify-email` - Verify email with token
- `POST /auth/resend-verification` - Resend verification email

## Email Verification

The app includes email verification for new user accounts:

1. **Signup Flow**: Users sign up → receive verification email → verify email → can log in
2. **Verification Links**: Email contains localhost links that open in your mobile app

### Required Environment Variables:
```env
# Email Settings
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=your-email@gmail.com
MAIL_FROM_NAME=MyApp
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_STARTTLS=True
MAIL_SSL_TLS=False

# Frontend URL (for verification links)
FRONTEND_URL=http://localhost:8081
```

### Gmail Setup:
1. Enable 2-factor authentication
2. Generate an "App Password" (not your regular password)
3. Use the app password in `MAIL_PASSWORD`

## Testing

Run the test scripts from the `tests/` directory:

```bash
# Test API endpoints
python tests/test_api.py

# Test email verification setup
python tests/test_email_verification.py
```

**Note**: Make sure the backend server is running before running the API tests.

## Database

### **Development (SQLite):**
- Database file: `app.db` (created automatically)
- No setup required - just run the server

### **Production (PostgreSQL):**
1. Install PostgreSQL
2. Create database: `createdb myapp`
3. Update `.env` file:
   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/myapp
   ```

### **Environment Variables:**
Copy `env.example` to `.env` and update:
```bash
cp env.example .env
```
