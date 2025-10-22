import { ErrorDisplay } from '@/components/error-display';
import { StyledButton } from '@/components/styled-button';
import { StyledInput } from '@/components/styled-input';
import { ThemedView } from '@/components/themed-view';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { validateResetPasswordForm } from '@/utils/validation';
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

  const styles = createSharedStyles(colorScheme as 'light' | 'dark' | null | undefined);

  if (resetSuccess) {
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
                Password Reset Complete
              </Text>
              <Text style={styles.successSubtext}>
                Your password has been successfully reset! You can now log in with your new password.
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
                Reset Password
              </Text>
              <Text style={styles.subtitle}>
                Enter your new password below to complete the reset process.
              </Text>
            </View>
            <StyledInput
              label="New Password"
              value={newPassword}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
              error={passwordError}
              placeholder="Enter your new password"
            />

            <StyledInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={true}
              error={confirmPasswordError}
              placeholder="Confirm your new password"
            />

            <StyledButton
              title="Reset Password"
              onPress={handleResetPassword}
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
