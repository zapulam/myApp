import { ErrorDisplay } from '@/components/error-display';
import { ScreenHeader } from '@/components/screen-header';
import { StyledButton } from '@/components/styled-button';
import { StyledInput } from '@/components/styled-input';
import { ThemedView } from '@/components/themed-view';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { storageService } from '@/services/storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
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
  const colorScheme = useColorScheme();

  const showErrorAlert = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    if (isLogin) {
      return email.trim() !== '' && password.trim() !== '';
    } else {
      return email.trim() !== '' && password.trim() !== '' && name.trim() !== '';
    }
  };

  // Handle password change and clear error
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleAuth = async () => {
    console.log('handleAuth called with:', { email, password, name, isLogin });
    
    // Test validation with empty fields
    if (!email || !password) {
      console.log('Validation failed: missing email or password');
      showErrorAlert('Please fill in all required fields');
      return;
    }

    // Test password length validation
    if (password.length < 8) {
      console.log('Validation failed: password too short', password.length);
      setPasswordError('Password must be at least 8 characters long');
      return;
    } else {
      setPasswordError(''); // Clear password error if valid
    }

    // Test name validation for sign up
    if (!isLogin && !name.trim()) {
      console.log('Validation failed: missing name');
      showErrorAlert('Please enter your name');
      return;
    }

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
      Alert.alert('Error', error instanceof Error ? error.message : 'Something went wrong');
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

          <View style={styles.form}>
            {!isLogin && (
              <StyledInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            )}

            <StyledInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <StyledInput
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
              error={passwordError}
            />

            <StyledButton
              title={isLogin ? 'Sign In' : 'Create Account'}
              onPress={handleAuth}
              disabled={loading || !isFormValid()}
              loading={loading}
            />

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
      
      <ErrorDisplay
        message={errorMessage}
        visible={showError}
        onClose={() => setShowError(false)}
      />
    </ThemedView>
  );
}
