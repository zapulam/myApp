import { ScreenHeader } from '@/components/screen-header';
import { StyledButton } from '@/components/styled-button';
import { StyledInput } from '@/components/styled-input';
import { ThemedView } from '@/components/themed-view';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { storageService } from '@/services/storage';
import { validateLoginForm, validateSignupForm } from '@/utils/validation';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const colorScheme = useColorScheme();

  const showErrorAlert = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
  };

  // Check if all required fields are filled and valid
  const isFormValid = () => {
    if (isLogin) {
      const validation = validateLoginForm(email, password);
      return validation.isValid;
    } else {
      const validation = validateSignupForm(email, password, name);
      return validation.isValid;
    }
  };

  // Handle email change and clear error
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      setEmailError('');
    }
    // Clear general error message when user starts typing
    if (showError) {
      setShowError(false);
    }
  };

  // Handle password change and clear error
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError('');
    }
    // Clear general error message when user starts typing
    if (showError) {
      setShowError(false);
    }
  };

  // Handle name change and clear error
  const handleNameChange = (text: string) => {
    setName(text);
    if (nameError) {
      setNameError('');
    }
    // Clear general error message when user starts typing
    if (showError) {
      setShowError(false);
    }
  };

  const handleAuth = async () => {
    console.log('handleAuth called with:', { email, password, name, isLogin });
    
    // Validate form using shared validation
    if (isLogin) {
      const validation = validateLoginForm(email, password);
      if (!validation.isValid) {
        console.log('Validation failed:', validation.errors);
        
        // Set individual field errors
        if (validation.errors.email) {
          setEmailError(validation.errors.email);
        }
        if (validation.errors.password) {
          setPasswordError(validation.errors.password);
        }
        
        return;
      }
    } else {
      const validation = validateSignupForm(email, password, name);
      if (!validation.isValid) {
        console.log('Validation failed:', validation.errors);
        
        // Set individual field errors
        if (validation.errors.email) {
          setEmailError(validation.errors.email);
        }
        if (validation.errors.password) {
          setPasswordError(validation.errors.password);
        }
        if (validation.errors.name) {
          setNameError(validation.errors.name);
        }
        
        return;
      }
    }

    // Clear all errors if validation passes
    setEmailError('');
    setPasswordError('');
    setNameError('');

    console.log('All validations passed, proceeding with auth...');

    setLoading(true);

    try {
      if (isLogin) {
        // Login
        console.log('Starting login process...');
        const response = await apiService.login({ email, password });
        console.log('Login response received:', response);
        
        await storageService.setToken(response.access_token);
        console.log('Token stored');
        
        // Get user data
        console.log('Fetching user data...');
        const user = await apiService.getCurrentUser(response.access_token);
        console.log('User data received:', user);
        
        await storageService.setUser(user);
        console.log('User data stored');
        
        // Navigate directly without alert
        console.log('Navigating to home...');
        router.replace('/home');
      } else {
        // Signup
        console.log('Starting signup process...');
        const user = await apiService.signup({ email, name, password });
        console.log('Signup successful:', user);
        
        // Navigate to verification pending page
        router.replace(`/verification-pending?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error('Auth error:', error);
      
      // Handle specific error cases for login
      if (isLogin && error instanceof Error) {
        const errorMsg = error.message;
        
        if (errorMsg.includes('Incorrect email or password')) {
          showErrorAlert('Invalid email or password. Please check your credentials and try again.');
        } else if (errorMsg.includes('Inactive user')) {
          showErrorAlert('Your account has been deactivated. Please contact support.');
        } else if (errorMsg.includes('Email not verified')) {
          showErrorAlert('Please verify your email address before logging in. Check your inbox for a verification link.');
        } else {
          showErrorAlert(errorMsg);
        }
      } else {
        // For signup errors or other cases, use the generic error message
        showErrorAlert(error instanceof Error ? error.message : 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
    setShowPassword(false);
    setPasswordError('');
    setEmailError('');
    setNameError('');
  };

  const styles = createSharedStyles(colorScheme as 'light' | 'dark' | null | undefined);

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ScreenHeader
            title={isLogin ? 'Welcome Back' : 'Create Account'}
            subtitle={isLogin ? 'Sign in to your account' : 'Sign up to get started'}
          />

          {showError && (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessageText}>{errorMessage}</Text>
            </View>
          )}

          <View style={styles.form}>
            {!isLogin && (
            <StyledInput
              label="Full Name"
              value={name}
              onChangeText={handleNameChange}
              autoCapitalize="words"
            />
            )}

            <StyledInput
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <StyledInput
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
            />

            <StyledButton
              title={isLogin ? 'Sign In' : 'Create Account'}
              onPress={handleAuth}
              disabled={loading || !isFormValid()}
              loading={loading}
            />

            {isLogin && (
              <View style={styles.toggleContainer}>
                <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                  <Text style={styles.toggleLink}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </Text>
              <TouchableOpacity onPress={toggleAuthMode}>
                <Text style={styles.toggleLink}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
