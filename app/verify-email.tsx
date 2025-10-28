import { GradientBackground } from '@/components/gradient-background';
import { LoadingScreen } from '@/components/loading-screen';
import { StyledButton } from '@/components/styled-button';
import { Text } from '@/components/themed-text';
import { createSharedStyles } from '@/constants/shared-styles';
import { apiService } from '@/services/api';
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
                  <Text style={styles.authTitle}>Email Verified!</Text>
                  <Text style={styles.authSubtitle}>
                    Your account has been successfully verified. You can now log in and start using all the features.
                  </Text>
                </View>

                <View style={styles.authForm}>
                  <StyledButton
                    title="Go to Login"
                    onPress={handleGoToLogin}
                    style={styles.authButton}
                  />
                </View>
              </BlurView>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }

  // Show error message if verification failed
  if (verificationError) {
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
                  <Text style={styles.authTitle}>Verification Failed</Text>
                  <Text style={styles.authSubtitle}>
                    There was an issue verifying your email: {verificationError}
                  </Text>
                </View>

                <View style={styles.authForm}>
                  <StyledButton
                    title="Go to Login"
                    onPress={handleGoToLogin}
                    style={styles.authButton}
                  />

                  <StyledButton
                    title="Try Again"
                    onPress={() => router.replace('/forgot-password')}
                    variant="secondary"
                  />
                </View>
              </BlurView>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }

  // Show pending verification message (when no token provided)
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
                <Text style={styles.authTitle}>Verify Your Email</Text>
                <Text style={styles.authSubtitle}>
                  We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                </Text>
              </View>

              <View style={styles.authForm}>
                <StyledButton
                  title="Go to Login"
                  onPress={handleGoToLogin}
                  style={styles.authButton}
                />

                <StyledButton
                  title="Resend Verification Email"
                  onPress={resendVerification}
                  variant="secondary"
                  disabled={resending}
                  loading={resending}
                />
              </View>
            </BlurView>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
