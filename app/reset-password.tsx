import { ErrorDisplay } from '@/components/error-display';
import { GradientBackground } from '@/components/gradient-background';
import { StyledButton } from '@/components/styled-button';
import { StyledInput } from '@/components/styled-input';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { validateResetPasswordForm } from '@/utils/validation';
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!token) {
      Alert.alert('Invalid Link', 'This password reset link is invalid. Please request a new one.', [
        { text: 'OK', onPress: () => router.replace('/forgot-password') }
      ]);
    }
  }, [token]);

  const showErrorAlert = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  // Check if form is valid
  const isFormValid = () => {
    const validation = validateResetPasswordForm(newPassword, confirmPassword);
    return validation.isValid;
  };

  const handlePasswordChange = (text: string) => {
    setNewPassword(text);
    // Clear errors when user starts typing
    if (passwordError) {
      setPasswordError('');
    }
    if (confirmPasswordError && text === confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    // Clear errors when user starts typing
    if (confirmPasswordError) {
      setConfirmPasswordError('');
    }
  };

  const handleResetPassword = async () => {
    const validation = validateResetPasswordForm(newPassword, confirmPassword);
    
    if (!validation.isValid) {
      if (validation.errors.newPassword) {
        setPasswordError(validation.errors.newPassword);
      }
      if (validation.errors.confirmPassword) {
        setConfirmPasswordError(validation.errors.confirmPassword);
      }
      return;
    }

    if (!token) {
      showErrorAlert('Invalid reset token');
      return;
    }

    // Clear errors if validation passes
    setPasswordError('');
    setConfirmPasswordError('');

    setLoading(true);

    try {
      await apiService.resetPassword(token, newPassword);
      setResetSuccess(true);
    } catch (error) {
      console.error('Reset password error:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.replace('/auth');
  };

  const styles = createSharedStyles();

  if (resetSuccess) {
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
                  <Text style={styles.authTitle}>Password Reset Complete</Text>
                  <Text style={styles.authSubtitle}>
                    Your password has been successfully reset! You can now log in with your new password.
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
                <Text style={styles.authTitle}>Reset Password</Text>
                <Text style={styles.authSubtitle}>
                  Enter your new password below to complete the reset process.
                </Text>
              </View>

              <View style={styles.authForm}>
                <View style={styles.authInputContainer}>
                  <StyledInput
                    label="New Password"
                    value={newPassword}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={true}
                    error={passwordError}
                    placeholder="Enter your new password"
                  />
                </View>

                <View style={styles.authInputContainer}>
                  <StyledInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    secureTextEntry={true}
                    error={confirmPasswordError}
                    placeholder="Confirm your new password"
                  />
                </View>

                <StyledButton
                  title="Reset Password"
                  onPress={handleResetPassword}
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
