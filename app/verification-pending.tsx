import { ScreenHeader } from '@/components/screen-header';
import { StyledButton } from '@/components/styled-button';
import { ThemedView } from '@/components/themed-view';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Text,
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

  const styles = createSharedStyles(colorScheme as 'light' | 'dark' | null | undefined);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title="Check Your Email"
          subtitle="We've sent a verification link to your email address. Please check your inbox and click the link to verify your account."
          icon="📧"
        />
        {email && email.trim() && (
          <Text style={styles.emailText}>{email}</Text>
        )}

        <View style={styles.instructions}>
          <Text style={styles.instructionTitle}>What's next?</Text>
          <Text style={styles.instructionText}>
            1. Check your email inbox (and spam folder){'\n'}
            2. Click the verification link in the email{'\n'}
            3. Return to the app and sign in
          </Text>
        </View>

        <View style={styles.form}>
          <StyledButton
            title="Go to Sign In"
            onPress={goToLogin}
            size="large"
          />

          <StyledButton
            title="Resend Verification Email"
            onPress={resendVerification}
            variant="secondary"
            size="large"
            disabled={resending || !email}
            loading={resending}
          />
        </View>
      </View>
    </ThemedView>
  );
}
