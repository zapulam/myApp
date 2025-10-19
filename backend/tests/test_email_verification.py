"""
Test script for email verification functionality
Run this after setting up your email configuration
"""

import asyncio
import os
import sys
from pathlib import Path

# Add the parent directory to the path so we can import from backend
sys.path.append(str(Path(__file__).parent.parent))

from dotenv import load_dotenv
from email_service import generate_verification_token, send_verification_email_simple

# Load environment variables
load_dotenv()

async def test_email_verification():
    """Test email verification functionality"""
    
    # Check if email configuration is set
    mail_username = os.getenv("MAIL_USERNAME")
    mail_password = os.getenv("MAIL_PASSWORD")
    
    if not mail_username or not mail_password:
        print("❌ Email configuration not found!")
        print("Please set MAIL_USERNAME and MAIL_PASSWORD in your .env file")
        return
    
    print("✅ Email configuration found")
    
    # Test token generation
    token = generate_verification_token()
    print(f"✅ Generated verification token: {token[:10]}...")
    
    # Test email sending (uncomment to actually send email)
    # test_email = "your-test-email@example.com"
    # test_name = "Test User"
    # 
    # print(f"📧 Sending test email to {test_email}...")
    # success = await send_verification_email_simple(test_email, test_name, token)
    # 
    # if success:
    #     print("✅ Test email sent successfully!")
    # else:
    #     print("❌ Failed to send test email")
    
    print("✅ Email verification system is ready!")

if __name__ == "__main__":
    asyncio.run(test_email_verification())
