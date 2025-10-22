import { ENV, getApiUrl } from '@/constants/env';

export interface User {
  id: number;
  email: string;
  name: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface SignupData {
  email: string;
  name: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface EmailVerificationResponse {
  message: string;
  email: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface ResendVerificationData {
  email: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  email: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = getApiUrl()) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), ENV.API_TIMEOUT);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - please check your connection');
      }
      console.error('API request failed:', error);
      throw error;
    }
  }

  async signup(data: SignupData): Promise<User> {
    return this.request<User>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser(token: string): Promise<User> {
    return this.request<User>('/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async healthCheck(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/');
  }

  async verifyEmail(token: string): Promise<EmailVerificationResponse> {
    return this.request<EmailVerificationResponse>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async resendVerification(email: string): Promise<EmailVerificationResponse> {
    return this.request<EmailVerificationResponse>('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    return this.request<ForgotPasswordResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<ResetPasswordResponse> {
    return this.request<ResetPasswordResponse>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, new_password: newPassword }),
    });
  }
}

export const apiService = new ApiService();
