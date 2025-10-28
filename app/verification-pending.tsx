import { GradientBackground } from '@/components/gradient-background';
import { StyledButton } from '@/components/styled-button';
import { Text } from '@/components/themed-text';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View
} from 'react-native';

export default function VerificationPendingScreen() {
  const [resending, setResending] = useState(false);
  const colorScheme = useColorScheme();

  // Get email from route params
  const { email } = useLocalSearchParams<{ email?: string }>();

  const resendVerification = async () => {
    if (!email) {
      Alert.alert('Error', 'Email address not found');
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

  const goToLogin = () => {
    router.replace('/auth');
  };

  const styles = createSharedStyles();

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
                  We've sent a verification link to {email || 'your email address'}. Please check your inbox and click the link to verify your account.
                </Text>
              </View>

              <View style={styles.instructions}>
                <Text style={styles.instructionTitle}>What's next?</Text>
                <Text style={styles.instructionText}>
                  1. Check your email inbox{'\n'}
                  2. Click the verification link{'\n'}
                  3. Return to the app and sign in
                </Text>
              </View>

              <View style={styles.authForm}>
                <StyledButton
                  title="Go to Sign In"
                  onPress={goToLogin}
                  style={styles.authButton}
                />

                <StyledButton
                  title="Resend Verification Email"
                  onPress={resendVerification}
                  disabled={resending || !email}
                  loading={resending}
                  variant="secondary"
                  style={{ paddingVertical: 14 }}
                />
              </View>
            </BlurView>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
