import { ErrorDisplay } from '@/components/error-display';
import { StyledButton } from '@/components/styled-button';
import { StyledInput } from '@/components/styled-input';
import { ThemedView } from '@/components/themed-view';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { validateForgotPasswordForm } from '@/utils/validation';
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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const colorScheme = useColorScheme();

  const showErrorAlert = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  // Handle email change and clear error
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      setEmailError('');
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    const validation = validateForgotPasswordForm(email);
    return validation.isValid;
  };

  const handleForgotPassword = async () => {
    const validation = validateForgotPasswordForm(email);
    
    if (!validation.isValid) {
      if (validation.errors.email) {
        setEmailError(validation.errors.email);
      }
      return;
    }

    // Clear error if validation passes
    setEmailError('');

    setLoading(true);

    try {
      await apiService.forgotPassword(email);
      setEmailSent(true);
    } catch (error) {
      console.error('Forgot password error:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth');
  };

  const handleSignUp = () => {
    router.push('/auth');
  };

  const styles = createSharedStyles(colorScheme as 'light' | 'dark' | null | undefined);

  if (emailSent) {
    return (
      <ThemedView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.form}>
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                Check Your Email
              </Text>
              <Text style={styles.successSubtext}>
                We've sent a password reset link to {email}. Please check your email and click the link to reset your password. The link will expire in 1 hour for security reasons.
              </Text>
            </View>

              <StyledButton
                title="Back to Login"
                onPress={handleBackToLogin}
                style={styles.button}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.title}>
                Forgot Password
              </Text>
              <Text style={styles.subtitle}>
                Enter your email address below and we'll send you a link to reset your password.
              </Text>
            </View>
            <StyledInput
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={emailError}
            />

            <StyledButton
              title="Send Reset Link"
              onPress={handleForgotPassword}
              disabled={loading || !isFormValid()}
              loading={loading}
            />

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                Remember your password?
              </Text>
              <TouchableOpacity onPress={handleBackToLogin}>
                <Text style={styles.toggleLink}>
                  Back to Login
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.toggleLink}>
                  Sign Up
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
