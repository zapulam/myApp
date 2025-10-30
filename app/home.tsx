import { NavigationHeader } from '@/components/navigation-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { storageService, StoredUser } from '@/services/storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

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

  const styles = createSharedStyles();

  return (
    <ThemedView style={styles.container}>
      <NavigationHeader 
        title="MyApp"
        showProfileButton={true}
        onLogout={handleLogout}
        userName={user?.name}
      />

      <View style={styles.dashboardContainer}>
        <View style={styles.dashboardContent}>
          <ThemedText style={styles.dashboardTitle}>Dashboard</ThemedText>
          <ThemedText style={styles.dashboardSubtitle}>
            Welcome to your dashboard. Content will be added here.
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}
