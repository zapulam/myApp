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
            * {{
                font-family: Consolas, 'Courier New', 'Lucida Console', Monaco, monospace;
            }}
            body {{
                font-family: Consolas, 'Courier New', 'Lucida Console', Monaco, monospace;
                line-height: 1.6;
                color: #ECEDEE;
                background-color: #000000;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .header {{
                background: linear-gradient(135deg, #1e40af 0%, #3b5bdb 50%, #ff6b35 100%);
                color: white !important;
                padding: 30px 20px;
                text-align: center;
                border-radius: 12px 12px 0 0;
            }}
            .content {{
                background-color: #151718;
                padding: 30px;
                border-radius: 0 0 12px 12px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #ECEDEE;
            }}
            .button {{
                display: inline-block;
                background-color: #1e40af;
                color: white !important;
                padding: 14px 32px;
                text-decoration: none;
                border-radius: 12px;
                margin: 20px 0;
                font-weight: 500;
            }}
            .footer {{
                text-align: center;
                margin-top: 30px;
                color: #888 !important;
                font-size: 14px;
            }}
            .welcome-note {{
                background-color: rgba(30, 64, 175, 0.2);
                border-left: 4px solid #1e40af;
                padding: 16px;
                margin: 20px 0;
                border-radius: 8px;
                color: #ECEDEE;
            }}
            .security-note {{
                background-color: rgba(255, 107, 53, 0.2);
                border-left: 4px solid #ff6b35;
                padding: 16px;
                margin: 20px 0;
                border-radius: 8px;
                color: #ECEDEE;
            }}
            .link-box {{
                word-break: break-all;
                background-color: rgba(255, 255, 255, 0.05);
                padding: 12px;
                border-radius: 8px;
                color: #ECEDEE !important;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }}
            h1, h2 {{
                color: #ECEDEE !important;
            }}
            p {{
                color: #ECEDEE;
                margin: 10px 0;
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Welcome to MyApp!</h1>
        </div>
        <div class="content">
            <h2>Hello {user_name}!</h2>
            <p>Thank you for signing up for MyApp! We're excited to have you on board. To complete your registration and start using all our features, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
                <a href="{verification_url}" class="button">Verify Email Address</a>
            </div>
            
            <p>If the button doesn't work, you can also copy and paste this link:</p>
            <p class="link-box">
                {verification_url}
            </p>
            
            <div class="welcome-note">
                <p><strong>Welcome to MyApp!</strong> Once verified, you'll have access to all our amazing features and can start connecting with others in our community.</p>
            </div>
            
            <div class="security-note">
                <p><strong>Security Note:</strong> This verification link will expire in 24 hours for security reasons.</p>
                <p>If you didn't create an account with MyApp, please ignore this email.</p>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent by MyApp. If you have any questions, please contact our support team.</p>
        </div>
    </body>
    </html>
    """


async def send_verification_email(email: str, user_name: str, verification_token: str) -> bool:
    """Send email verification email"""
    try:
        verification_url = f"{FRONTEND_URL}/verify-email?token={verification_token}"
        
        # Create HTML message
        html_body = create_verification_email_html(user_name, verification_url)
        
        message = MessageSchema(
            subject="Verify Your Email Address - MyApp",
            recipients=[email],
            body=html_body,
            subtype="html"
        )
        
        fm = FastMail(conf)
        await fm.send_message(message)
        
        return True
    except Exception as e:
        print(f"Error sending verification email: {e}")
        return False


def create_password_reset_email_html(user_name: str, reset_url: str) -> str:
    """Create HTML email template for password reset"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            * {{
                font-family: Consolas, 'Courier New', 'Lucida Console', Monaco, monospace;
            }}
            body {{
                font-family: Consolas, 'Courier New', 'Lucida Console', Monaco, monospace;
                line-height: 1.6;
                color: #ECEDEE;
                background-color: #000000;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .header {{
                background: linear-gradient(135deg, #1e40af 0%, #3b5bdb 50%, #ff6b35 100%);
                color: white !important;
                padding: 30px 20px;
                text-align: center;
                border-radius: 12px 12px 0 0;
            }}
            .content {{
                background-color: #151718;
                padding: 30px;
                border-radius: 0 0 12px 12px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #ECEDEE;
            }}
            .button {{
                display: inline-block;
                background-color: #1e40af;
                color: white !important;
                padding: 14px 32px;
                text-decoration: none;
                border-radius: 12px;
                margin: 20px 0;
                font-weight: 500;
            }}
            .footer {{
                text-align: center;
                margin-top: 30px;
                color: #888 !important;
                font-size: 14px;
            }}
            .security-note {{
                background-color: rgba(255, 107, 53, 0.2);
                border-left: 4px solid #ff6b35;
                padding: 16px;
                margin: 20px 0;
                border-radius: 8px;
                color: #ECEDEE;
            }}
            .link-box {{
                word-break: break-all;
                background-color: rgba(255, 255, 255, 0.05);
                padding: 12px;
                border-radius: 8px;
                color: #ECEDEE !important;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }}
            h1, h2 {{
                color: #ECEDEE !important;
            }}
            p {{
                color: #ECEDEE;
                margin: 10px 0;
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <h2>Hello {user_name}!</h2>
            <p>We received a request to reset your password for your MyApp account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
                <a href="{reset_url}" class="button">Reset Password</a>
            </div>
            
            <p>If the button doesn't work, you can also copy and paste this link:</p>
            <p class="link-box">
                {reset_url}
            </p>
            
            <div class="security-note">
                <p><strong>Security Note:</strong> This password reset link will expire in 1 hour for security reasons.</p>
                <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent by MyApp. If you have any questions, please contact our support team.</p>
        </div>
    </body>
    </html>
    """




async def send_password_reset_email(email: str, user_name: str, reset_token: str) -> bool:
    """Send password reset email"""
    try:
        reset_url = f"{FRONTEND_URL}/reset-password?token={reset_token}"
        
        # Create HTML message
        html_body = create_password_reset_email_html(user_name, reset_url)
        
        message = MessageSchema(
            subject="Reset Your Password - MyApp",
            recipients=[email],
            body=html_body,
            subtype="html"
        )
        
        fm = FastMail(conf)
        await fm.send_message(message)
        
        return True
    except Exception as e:
        print(f"Error sending password reset email: {e}")
        return False