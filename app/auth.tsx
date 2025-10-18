import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { storageService } from '@/services/storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!isLogin && !name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login
        console.log('Starting login process...');
        const response = await apiService.login({ email, password });
        console.log('Login response received:', response);
        
        await storageService.setToken(response.access_token);
        console.log('Token stored');
        
        // Get user data
        console.log('Fetching user data...');
        const user = await apiService.getCurrentUser(response.access_token);
        console.log('User data received:', user);
        
        await storageService.setUser(user);
        console.log('User data stored');
        
        // Navigate directly without alert
        console.log('Navigating to home...');
        router.replace('/home');
      } else {
        // Signup
        console.log('Starting signup process...');
        const user = await apiService.signup({ email, name, password });
        console.log('Signup successful:', user);
        
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => setIsLogin(true) }
        ]);
      }
    } catch (error) {
      console.error('Auth error:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    scrollContainer: {
      flexGrow: 1,
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
    },
    subtitle: {
      fontSize: 16,
      color: Colors[colorScheme ?? 'light'].text,
      opacity: 0.7,
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
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 30,
    },
    toggleText: {
      fontSize: 16,
      color: Colors[colorScheme ?? 'light'].text,
    },
    toggleLink: {
      color: Colors[colorScheme ?? 'light'].tint,
      fontWeight: '600',
      marginLeft: 5,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin
                ? 'Sign in to your account'
                : 'Sign up to get started'}
            </Text>
          </View>

          <View style={styles.form}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].text + '80'}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={Colors[colorScheme ?? 'light'].text + '80'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={Colors[colorScheme ?? 'light'].text + '80'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].text + '80'}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            )}

            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              onPress={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colorScheme === 'dark' ? '#000' : 'white'} />
              ) : (
                <Text style={styles.buttonText}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </Text>
              <TouchableOpacity onPress={toggleAuthMode}>
                <Text style={styles.toggleLink}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
