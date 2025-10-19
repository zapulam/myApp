import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    icon: {
      fontSize: 64,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 12,
      color: Colors[colorScheme ?? 'light'].text,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: Colors[colorScheme ?? 'light'].text,
      opacity: 0.7,
      textAlign: 'center',
      lineHeight: 24,
    },
    emailText: {
      fontSize: 16,
      color: Colors[colorScheme ?? 'light'].tint,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 8,
    },
    form: {
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
    },
    button: {
      backgroundColor: Colors[colorScheme ?? 'light'].tint,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonDisabled: {
      backgroundColor: Colors[colorScheme ?? 'light'].tint + '80',
      opacity: 0.6,
    },
    buttonText: {
      color: colorScheme === 'dark' ? '#000' : 'white',
      fontSize: 18,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? 'light'].tint,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 12,
    },
    secondaryButtonText: {
      color: Colors[colorScheme ?? 'light'].tint,
      fontSize: 18,
      fontWeight: '600',
    },
    instructions: {
      backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
      borderRadius: 12,
      padding: 20,
      marginBottom: 30,
    },
    instructionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[colorScheme ?? 'light'].text,
      marginBottom: 12,
    },
    instructionText: {
      fontSize: 14,
      color: Colors[colorScheme ?? 'light'].text,
      opacity: 0.8,
      lineHeight: 20,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.icon}>📧</Text>
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a verification link to your email address. 
            Please check your inbox and click the link to verify your account.
          </Text>
          {email && (
            <Text style={styles.emailText}>{email}</Text>
          )}
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionTitle}>What's next?</Text>
          <Text style={styles.instructionText}>
            1. Check your email inbox (and spam folder){'\n'}
            2. Click the verification link in the email{'\n'}
            3. Return to the app and sign in
          </Text>
        </View>

        <View style={styles.form}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={goToLogin}
          >
            <Text style={styles.buttonText}>Go to Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={resendVerification}
            disabled={resending || !email}
          >
            {resending ? (
              <ActivityIndicator color={Colors[colorScheme ?? 'light'].tint} />
            ) : (
              <Text style={styles.secondaryButtonText}>Resend Verification Email</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}
