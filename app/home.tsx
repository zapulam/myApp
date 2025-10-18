import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { storageService, StoredUser } from '@/services/storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await storageService.getUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  };

  const handleLogout = async () => {
    console.log('Logout button pressed - starting direct logout');
    try {
      console.log('Starting logout process...');
      await storageService.clearAuth();
      console.log('Auth data cleared');
      console.log('Navigating to auth...');
      router.replace('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginTop: 60,
      marginBottom: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: Colors[colorScheme ?? 'light'].text,
      opacity: 0.7,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeText: {
      fontSize: 20,
      color: Colors[colorScheme ?? 'light'].text,
      textAlign: 'center',
      marginBottom: 30,
    },
    logoutButton: {
      backgroundColor: '#ff4444',
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    logoutButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Welcome to MyApp!
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          You have successfully authenticated
        </ThemedText>
      </View>

      <View style={styles.content}>
        <ThemedText style={styles.welcomeText}>
          🎉 Welcome back, {user?.name || 'User'}! You're now logged in.
        </ThemedText>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutButtonText}>
            Logout
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
