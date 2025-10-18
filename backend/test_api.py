#!/usr/bin/env python3
"""
Simple test script to verify the API endpoints work
"""
import json
import requests

# Base URL for the API
BASE_URL = "http://localhost:8000"


def test_health():
    """Test the health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Health check: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Health check failed: {e}")
        return False


def test_signup():
    """Test user signup"""
    try:
        user_data = {
            "email": "test@example.com",
            "name": "Test User",
            "password": "testpassword123"
        }
        response = requests.post(f"{BASE_URL}/auth/signup", json=user_data)
        print(f"Signup: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Signup test failed: {e}")
        return False


def test_login():
    """Test user login"""
    try:
        login_data = {
            "email": "test@example.com",
            "password": "testpassword123"
        }
        response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        print(f"Login: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Login test failed: {e}")
        return False


if __name__ == "__main__":
    print("Testing MyApp API...")
    print("=" * 50)
    
    # Test health endpoint
    print("1. Testing health endpoint...")
    health_ok = test_health()
    
    if health_ok:
        print("\n2. Testing signup...")
        signup_ok = test_signup()
        
        if signup_ok:
            print("\n3. Testing login...")
            login_ok = test_login()
            
            if login_ok:
                print("\n✅ All tests passed!")
            else:
                print("\n❌ Login test failed")
        else:
            print("\n❌ Signup test failed")
    else:
        print("\n❌ Health check failed - make sure the server is running")
