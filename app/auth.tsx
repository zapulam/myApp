import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { apiService } from '@/services/api';
import { storageService } from '@/services/storage';
import { Ionicons } from '@expo/vector-icons';
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
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const colorScheme = useColorScheme();

  const showErrorAlert = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    if (isLogin) {
      return email.trim() !== '' && password.trim() !== '';
    } else {
      return email.trim() !== '' && password.trim() !== '' && name.trim() !== '';
    }
  };

  // Handle password change and clear error
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleAuth = async () => {
    console.log('handleAuth called with:', { email, password, name, isLogin });
    
    // Test validation with empty fields
    if (!email || !password) {
      console.log('Validation failed: missing email or password');
      showErrorAlert('Please fill in all required fields');
      return;
    }

    // Test password length validation
    if (password.length < 8) {
      console.log('Validation failed: password too short', password.length);
      setPasswordError('Password must be at least 8 characters long');
      return;
    } else {
      setPasswordError(''); // Clear password error if valid
    }

    // Test name validation for sign up
    if (!isLogin && !name.trim()) {
      console.log('Validation failed: missing name');
      showErrorAlert('Please enter your name');
      return;
    }

    console.log('All validations passed, proceeding with auth...');

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
        
        // Navigate to verification pending page
        router.replace(`/verification-pending?email=${encodeURIComponent(email)}`);
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
    setName('');
    setShowPassword(false);
    setPasswordError('');
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
    passwordContainer: {
      position: 'relative',
    },
    passwordInput: {
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#333' : '#ddd',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      paddingRight: 50,
      fontSize: 16,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      color: Colors[colorScheme ?? 'light'].text,
    },
    toggleButton: {
      position: 'absolute',
      right: 16,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
    },
    button: {
      backgroundColor: Colors[colorScheme ?? 'light'].tint,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonDisabled: {
      backgroundColor: colorScheme === 'dark' ? '#555' : '#ccc',
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
    toggleContainerText: {
      fontSize: 16,
      color: Colors[colorScheme ?? 'light'].text,
    },
    toggleLink: {
      color: Colors[colorScheme ?? 'light'].tint,
      fontWeight: '600',
      marginLeft: 5,
    },
    errorContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    errorBox: {
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderRadius: 12,
      padding: 20,
      margin: 20,
      maxWidth: 300,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    errorText: {
      flex: 1,
      fontSize: 16,
      color: Colors[colorScheme ?? 'light'].text,
      textAlign: 'center',
    },
    errorCloseButton: {
      marginLeft: 10,
      padding: 5,
    },
    errorCloseText: {
      fontSize: 24,
      color: Colors[colorScheme ?? 'light'].text,
      fontWeight: 'bold',
    },
    passwordErrorText: {
      color: '#ff4444',
      fontSize: 14,
      marginBottom: 8,
      marginLeft: 4,
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
              {passwordError ? (
                <Text style={styles.passwordErrorText}>{passwordError}</Text>
              ) : null}
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].text + '80'}
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'lock-open' : 'lock-closed'}
                    size={20}
                    color={Colors[colorScheme ?? 'light'].tint}
                  />
                </TouchableOpacity>
              </View>
            </View>


            <TouchableOpacity 
              style={[styles.button, (loading || !isFormValid()) && styles.buttonDisabled]} 
              onPress={handleAuth}
              disabled={loading || !isFormValid()}
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
              <Text style={styles.toggleContainerText}>
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
      
      {/* Custom Error Display */}
      {showError && (
        <View style={styles.errorContainer}>
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <TouchableOpacity 
              style={styles.errorCloseButton}
              onPress={() => setShowError(false)}
            >
              <Text style={styles.errorCloseText}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ThemedView>
  );
}
