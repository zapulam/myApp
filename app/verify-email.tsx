import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 8,
      color: Colors[colorScheme ?? 'light'].text,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: Colors[colorScheme ?? 'light'].text,
      opacity: 0.7,
      textAlign: 'center',
    },
    form: {
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
      color: Colors[colorScheme ?? 'light'].text,
    },
    input: {
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#333' : '#ddd',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      color: Colors[colorScheme ?? 'light'].text,
    },
    button: {
      backgroundColor: Colors[colorScheme ?? 'light'].tint,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 10,
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
      marginTop: 10,
    },
    secondaryButtonText: {
      color: Colors[colorScheme ?? 'light'].tint,
      fontSize: 18,
      fontWeight: '600',
    },
    loadingContainer: {
      alignItems: 'center',
      padding: 40,
    },
    loadingText: {
      fontSize: 16,
      color: Colors[colorScheme ?? 'light'].text,
      marginTop: 16,
    },
  });

  if (verifying) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
          <Text style={styles.loadingText}>Verifying your email...</Text>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a verification link to your email address
          </Text>
        </View>

        <View style={styles.form}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.replace('/auth')}
          >
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={resendVerification}
            disabled={resending}
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
