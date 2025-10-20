import { ScreenHeader } from '@/components/screen-header';
import { StyledButton } from '@/components/styled-button';
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

  const styles = createSharedStyles(colorScheme as 'light' | 'dark' | null | undefined);

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader
        title="Welcome to MyApp!"
        subtitle="You have successfully authenticated"
        withTopMargin={true}
      />

      <View style={styles.centeredContent}>
        <ThemedText style={styles.welcomeText}>
          🎉 Welcome back, {user?.name || 'User'}! You're now logged in.
        </ThemedText>
        
        <StyledButton
          title="Logout"
          onPress={handleLogout}
          variant="danger"
        />
      </View>
    </ThemedView>
  );
}
