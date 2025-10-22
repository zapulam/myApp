from datetime import datetime
from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr
    name: str


class UserCreate(UserBase):
    password: str
    
    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        # Truncate password to 72 bytes for bcrypt compatibility
        if len(v.encode('utf-8')) > 72:
            return v[:72]
        return v


class UserResponse(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class EmailVerificationRequest(BaseModel):
    email: EmailStr


class EmailVerificationResponse(BaseModel):
    message: str
    email: str


class VerifyEmailRequest(BaseModel):
    token: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ForgotPasswordResponse(BaseModel):
    message: str
    email: str


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str
    
    @field_validator('new_password')
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        # Truncate password to 72 bytes for bcrypt compatibility
        if len(v.encode('utf-8')) > 72:
            return v[:72]
        return v


class ResetPasswordResponse(BaseModel):
    message: str