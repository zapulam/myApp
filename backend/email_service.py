import os
import secrets
from datetime import datetime, timedelta
from typing import Optional

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Email configuration
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
MAIL_FROM = os.getenv("MAIL_FROM", MAIL_USERNAME)
MAIL_PORT = int(os.getenv("MAIL_PORT", "587"))
MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME", "MyApp")
MAIL_STARTTLS = os.getenv("MAIL_STARTTLS", "True").lower() == "true"
MAIL_SSL_TLS = os.getenv("MAIL_SSL_TLS", "False").lower() == "true"

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_FROM=MAIL_FROM,
    MAIL_PORT=MAIL_PORT,
    MAIL_SERVER=MAIL_SERVER,
    MAIL_FROM_NAME=MAIL_FROM_NAME,
    MAIL_STARTTLS=MAIL_STARTTLS,
    MAIL_SSL_TLS=MAIL_SSL_TLS,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

# Frontend URL for verification links
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:8081")


def generate_verification_token() -> str:
    """Generate a secure verification token"""
    return secrets.token_urlsafe(32)


def create_verification_email_html(user_name: str, verification_url: str) -> str:
    """Create HTML email template for email verification"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .header {{
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }}
            .content {{
                background-color: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 8px 8px;
            }}
            .button {{
                display: inline-block;
                background-color: #4CAF50;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
            }}
            .footer {{
                text-align: center;
                margin-top: 30px;
                color: #666;
                font-size: 14px;
            }}
            .mobile-note {{
                background-color: #e3f2fd;
                border-left: 4px solid #2196f3;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Welcome to MyApp!</h1>
        </div>
        <div class="content">
            <h2>Hello {user_name}!</h2>
            <p>Thank you for signing up for MyApp. To complete your registration, please verify your email address by clicking the button below:</p>
            
            
            <div style="text-align: center;">
                <a href="{verification_url}" class="button">Verify Email Address</a>
            </div>
            
            <p>If the button doesn't work, you can also copy and paste this link:</p>
            <p style="word-break: break-all; background-color: #e9e9e9; padding: 10px; border-radius: 4px;">
                {verification_url}
            </p>
            
            <p><strong>Important:</strong> This verification link will expire in 24 hours for security reasons.</p>
            
            <p>If you didn't create an account with MyApp, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>This email was sent by MyApp. If you have any questions, please contact our support team.</p>
        </div>
    </body>
    </html>
    """


def create_verification_email_text(user_name: str, verification_url: str) -> str:
    """Create plain text email for email verification"""
    return f"""
    Welcome to MyApp!
    
    Hello {user_name}!
    
    Thank you for signing up for MyApp. To complete your registration, please verify your email address by visiting the following link:
    
    {verification_url}
    
    This verification link will expire in 24 hours for security reasons.
    
    If you didn't create an account with MyApp, please ignore this email.
    
    Best regards,
    The MyApp Team
    """


async def send_verification_email(email: str, user_name: str, verification_token: str) -> bool:
    """Send email verification email"""
    try:
        verification_url = f"{FRONTEND_URL}/verify-email?token={verification_token}"
        
        message = MessageSchema(
            subject="Verify Your Email Address - MyApp",
            recipients=[email],
            body=create_verification_email_text(user_name, verification_url),
            subtype="plain"
        )
        
        # Also create HTML version
        html_body = create_verification_email_html(user_name, verification_url)
        
        fm = FastMail(conf)
        await fm.send_message(message, template_name="verification.html")
        
        # Send HTML version as well
        html_message = MessageSchema(
            subject="Verify Your Email Address - MyApp",
            recipients=[email],
            body=html_body,
            subtype="html"
        )
        
        await fm.send_message(html_message)
        
        return True
    except Exception as e:
        print(f"Error sending verification email: {e}")
        return False


async def send_verification_email_simple(email: str, user_name: str, verification_token: str) -> bool:
    """Send email verification email (simplified version)"""
    try:
        # Create localhost verification link
        verification_url = f"{FRONTEND_URL}/verify-email?token={verification_token}"
        
        message = MessageSchema(
            subject="Verify Your Email Address - MyApp",
            recipients=[email],
            body=create_verification_email_text(user_name, verification_url),
            subtype="plain"
        )
        
        fm = FastMail(conf)
        await fm.send_message(message)
        
        return True
    except Exception as e:
        print(f"Error sending verification email: {e}")
        return False
