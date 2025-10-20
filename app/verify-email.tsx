import { LoadingScreen } from '@/components/loading-screen';
import { ScreenHeader } from '@/components/screen-header';
import { StyledButton } from '@/components/styled-button';
import { ThemedView } from '@/components/themed-view';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  View
} from 'react-native';

export default function VerifyEmailScreen() {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);
  const colorScheme = useColorScheme();
  const { token } = useLocalSearchParams<{ token?: string }>();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setVerifying(false);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    setLoading(true);
    try {
      const response = await apiService.verifyEmail(verificationToken);
      setEmail(response.email);
      Alert.alert('Success', response.message, [
        { text: 'OK', onPress: () => router.replace('/auth') }
      ]);
    } catch (error) {
      console.error('Verification error:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Verification failed');
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

  const styles = createSharedStyles(colorScheme as 'light' | 'dark' | null | undefined);

  if (verifying) {
    return <LoadingScreen message="Verifying your email..." />;
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader
          title="Verify Your Email"
          subtitle="We've sent a verification link to your email address"
          size="large"
        />

        <View style={styles.form}>
          <StyledButton
            title="Go to Login"
            onPress={() => router.replace('/auth')}
            size="large"
          />

          <StyledButton
            title="Resend Verification Email"
            onPress={resendVerification}
            variant="secondary"
            size="large"
            disabled={resending}
            loading={resending}
          />
        </View>
      </View>
    </ThemedView>
  );
}
