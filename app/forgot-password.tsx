import { ErrorDisplay } from '@/components/error-display';
import { GradientBackground } from '@/components/gradient-background';
import { StyledButton } from '@/components/styled-button';
import { StyledInput } from '@/components/styled-input';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { validateForgotPasswordForm } from '@/utils/validation';
import { BlurView } from 'expo-blur';
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
    router.back();
  };

  const handleSignUp = () => {
    router.replace('/auth');
  };

  const styles = createSharedStyles();

  if (emailSent) {
    return (
      <View style={{ flex: 1 }}>
        <GradientBackground />
        <View style={styles.authGradientContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.authGradientContainer}
          >
            <ScrollView 
              contentContainerStyle={styles.authScrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <BlurView
                intensity={60}
                tint="dark"
                style={styles.glassCard}
              >
                <View style={styles.authHeader}>
                  <Text style={styles.authTitle}>Check Your Email</Text>
                  <Text style={styles.authSubtitle}>
                    We've sent a password reset link to {email}. Please check your email and click the link to reset your password.
                  </Text>
                </View>

                <StyledButton
                  title="Back to Login"
                  onPress={handleBackToLogin}
                  style={styles.authButton}
                />
              </BlurView>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground />
      <View style={styles.authGradientContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.authGradientContainer}
        >
          <ScrollView 
            contentContainerStyle={styles.authScrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <BlurView
              intensity={60}
              tint="dark"
              style={styles.glassCard}
            >
              <View style={styles.authHeader}>
                <Text style={styles.authTitle}>Forgot Password</Text>
                <Text style={styles.authSubtitle}>
                  Enter your email address below and we'll send you a link to reset your password.
                </Text>
              </View>

              <View style={styles.authForm}>
                <View style={styles.authInputContainer}>
                  <StyledInput
                    label="Email"
                    value={email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={emailError}
                  />
                </View>

                <StyledButton
                  title="Send Reset Link"
                  onPress={handleForgotPassword}
                  disabled={loading || !isFormValid()}
                  loading={loading}
                  style={styles.authButton}
                />
              </View>

              <View style={styles.authToggleContainer}>
                <Text style={styles.toggleText}>
                  Remember your password?
                </Text>
                <TouchableOpacity onPress={handleBackToLogin}>
                  <Text style={styles.toggleLink}>
                    Back to Login
                  </Text>
                </TouchableOpacity>
              </View>

              
            </BlurView>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      
      <ErrorDisplay
        message={errorMessage}
        visible={showError}
        onClose={() => setShowError(false)}
      />
    </View>
  );
}
