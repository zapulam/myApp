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
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Authenticate user
- `GET /auth/me` - Get current user info (requires token)

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
