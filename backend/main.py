import os
import uvicorn

from datetime import timedelta, datetime
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from auth import verify_password, get_password_hash, create_access_token, verify_token
from database import get_db, engine, SessionLocal
from models import Base, User
from schemas import UserCreate, UserResponse, UserLogin, Token, EmailVerificationRequest, EmailVerificationResponse, VerifyEmailRequest, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse
from email_service import generate_verification_token, send_verification_email, send_password_reset_email


# Load environment variables
load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(title="MyApp API", version="1.0.0")

# CORS middleware for React Native app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your app's origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database session dependency
def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "MyApp API is running!"}


@app.post("/auth/signup", response_model=UserResponse)
async def signup(user: UserCreate, db: Session = Depends(get_db_session)):
    """Create a new user account with email verification"""
    
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Generate verification token
    verification_token = generate_verification_token()
    
    # Create new user (not verified initially)
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        name=user.name,
        hashed_password=hashed_password,
        is_verified=False,
        verification_token=verification_token
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Send verification email
    try:
        email_sent = await send_verification_email(
            user.email, 
            user.name, 
            verification_token
        )
        if not email_sent:
            print(f"Warning: Failed to send verification email to {user.email}")
    except Exception as e:
        print(f"Error sending verification email: {e}")
        # Don't fail signup if email sending fails
    
    return db_user


@app.post("/auth/login", response_model=Token)
async def login(user_credentials: UserLogin, db: Session = Depends(get_db_session)):
    """Authenticate user and return access token"""
    from models import User
    
    # Find user by email
    user = db.query(User).filter(User.email == user_credentials.email).first()
    
    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email not verified. Please check your email and click the verification link."
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/auth/me", response_model=UserResponse)
async def get_current_user(authorization: str = Header(None), db: Session = Depends(get_db_session)):
    """Get current user information"""
    from models import User
    
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = authorization.split(" ")[1]
    email = verify_token(token)
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user


@app.post("/auth/verify-email", response_model=EmailVerificationResponse)
async def verify_email(request: VerifyEmailRequest, db: Session = Depends(get_db_session)):
    """Verify user email with token"""
    from models import User
    
    # Find user by verification token
    user = db.query(User).filter(User.verification_token == request.token).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification token"
        )
    
    if user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already verified"
        )
    
    # Mark user as verified and clear token
    user.is_verified = True
    user.verification_token = None
    db.commit()
    
    return EmailVerificationResponse(
        message="Email verified successfully! You can now log in.",
        email=user.email
    )


@app.post("/auth/resend-verification", response_model=EmailVerificationResponse)
async def resend_verification(request: EmailVerificationRequest, db: Session = Depends(get_db_session)):
    """Resend verification email"""
    from models import User
    
    # Find user by email
    user = db.query(User).filter(User.email == request.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already verified"
        )
    
    # Generate new verification token
    verification_token = generate_verification_token()
    user.verification_token = verification_token
    db.commit()
    
    # Send verification email
    try:
        email_sent = await send_verification_email(
            user.email, 
            user.name, 
            verification_token
        )
        if not email_sent:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to send verification email"
            )
    except Exception as e:
        print(f"Error sending verification email: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send verification email"
        )
    
    return EmailVerificationResponse(
        message="Verification email sent successfully!",
        email=user.email
    )


@app.post("/auth/forgot-password", response_model=ForgotPasswordResponse)
async def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db_session)):
    """Send password reset email"""
    from models import User
    
    # Find user by email
    user = db.query(User).filter(User.email == request.email).first()
    
    if not user:
        # Don't reveal if user exists or not for security
        return ForgotPasswordResponse(
            message="If an account with that email exists, we've sent a password reset link.",
            email=request.email
        )
    
    if not user.is_verified:
        # Don't reveal if user exists or not for security
        return ForgotPasswordResponse(
            message="If an account with that email exists, we've sent a password reset link.",
            email=request.email
        )
    
    # Generate password reset token
    reset_token = generate_verification_token()
    user.password_reset_token = reset_token
    user.password_reset_expires = datetime.utcnow() + timedelta(hours=1)  # 1 hour expiry
    db.commit()
    
    # Send password reset email
    try:
        email_sent = await send_password_reset_email(
            user.email, 
            user.name, 
            reset_token
        )
        if not email_sent:
            print(f"Warning: Failed to send password reset email to {user.email}")
    except Exception as e:
        print(f"Error sending password reset email: {e}")
        # Don't fail the request if email sending fails
    
    return ForgotPasswordResponse(
        message="If an account with that email exists, we've sent a password reset link.",
        email=request.email
    )


@app.post("/auth/reset-password", response_model=ResetPasswordResponse)
async def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db_session)):
    """Reset user password with token"""
    from models import User
    
    # Find user by reset token
    user = db.query(User).filter(User.password_reset_token == request.token).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Check if token is expired
    if user.password_reset_expires and user.password_reset_expires < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reset token has expired"
        )
    
    # Update password and clear reset token
    user.hashed_password = get_password_hash(request.new_password)
    user.password_reset_token = None
    user.password_reset_expires = None
    db.commit()
    
    return ResetPasswordResponse(
        message="Password reset successfully! You can now log in with your new password."
    )


if __name__ == "__main__":    
    # Get configuration from environment
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    debug = os.getenv("DEBUG", "True").lower() == "true"
    
    print(f"Starting FastAPI server on {host}:{port}")
    print(f"Debug mode: {debug}")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=debug,
        log_level="info" if debug else "warning"
    )
