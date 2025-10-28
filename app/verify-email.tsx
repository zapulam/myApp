import { LoadingScreen } from '@/components/loading-screen';
import { StyledButton } from '@/components/styled-button';
import { ThemedView } from '@/components/themed-view';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';

export default function VerifyEmailScreen() {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [hasAttemptedVerification, setHasAttemptedVerification] = useState(false);
  const colorScheme = useColorScheme();
  const { token } = useLocalSearchParams<{ token?: string }>();

  useEffect(() => {
    // Only attempt verification once and only if we have a token
    if (token && !hasAttemptedVerification) {
      setHasAttemptedVerification(true);
      verifyEmail(token);
    } else if (!token) {
      setVerifying(false);
    }
  }, [token, hasAttemptedVerification]);

  const verifyEmail = async (verificationToken: string) => {
    // Prevent multiple verification attempts
    if (loading || verificationSuccess || verificationError) {
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.verifyEmail(verificationToken);
      setEmail(response.email);
      setVerificationSuccess(true);
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationError(error instanceof Error ? error.message : 'Verification failed');
    } finally {
      setLoading(false);
      setVerifying(false);
    }
  };

  const resendVerification = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setResending(true);
    try {
      await apiService.resendVerification(email);
      Alert.alert('Success', 'Verification email sent! Please check your inbox.');
    } catch (error) {
      console.error('Resend error:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

  const handleGoToLogin = () => {
    router.replace('/auth');
  };

  const styles = createSharedStyles();

  if (verifying) {
    return <LoadingScreen message="Verifying your email..." />;
  }

  // Show success message if verification was successful
  if (verificationSuccess) {
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
                  Email Verified!
                </Text>
                <Text style={styles.successSubtext}>
                  Your email is verified and your account is ready to go! Welcome to MyApp! Your account has been successfully verified. You can now log in and start using all the features.
                </Text>
              </View>

              <StyledButton
                title="Go to Login"
                onPress={handleGoToLogin}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    );
  }

  // Show error message if verification failed
  if (verificationError) {
    return (
      <ThemedView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.form}>
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  Verification Failed
                </Text>
                <Text style={styles.successSubtext}>
                  There was an issue verifying your email: {verificationError}
                </Text>
              </View>

              <StyledButton
                title="Go to Login"
                onPress={handleGoToLogin}
              />

              <StyledButton
                title="Try Again"
                onPress={() => router.replace('/forgot-password')}
                variant="secondary"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    );
  }

  // Show pending verification message (when no token provided)
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
                Verify Your Email
              </Text>
              <Text style={styles.successSubtext}>
                We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
              </Text>
            </View>

            <StyledButton
              title="Go to Login"
              onPress={handleGoToLogin}
            />

            <StyledButton
              title="Resend Verification Email"
              onPress={resendVerification}
              variant="secondary"
              disabled={resending}
              loading={resending}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
