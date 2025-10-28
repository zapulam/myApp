import { NavigationHeader } from '@/components/navigation-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { storageService, StoredUser } from '@/services/storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);
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
      Alert.alert('Error', 'Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await storageService.clearAuth();
      router.replace('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const handleEditProfile = () => {
    // TODO: Implement profile editing functionality
    Alert.alert('Coming Soon', 'Profile editing will be available soon!');
  };

  const styles = createSharedStyles();

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <NavigationHeader 
          title="MyApp"
          showProfileButton={true}
          onLogout={handleLogout}
        />
        <View style={styles.centeredContent}>
          <ThemedText style={styles.welcomeText}>Loading profile...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <NavigationHeader 
        title="MyApp"
        showProfileButton={true}
        onLogout={handleLogout}
      />
      
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Ionicons 
              name="pencil" 
              size={16} 
              color="#ECEDEE" 
            />
          </TouchableOpacity>
          
          <View style={styles.profileField}>
            <ThemedText style={styles.profileLabel}>Name</ThemedText>
            <ThemedText style={styles.profileValue}>{user?.name || 'Not provided'}</ThemedText>
          </View>

          <View style={styles.profileField}>
            <ThemedText style={styles.profileLabel}>Email</ThemedText>
            <ThemedText style={styles.profileValue}>{user?.email || 'Not provided'}</ThemedText>
          </View>

          <View style={styles.profileField}>
            <ThemedText style={styles.profileLabel}>Status</ThemedText>
            <ThemedText style={[
              styles.profileValue,
              user?.is_active ? styles.verifiedText : styles.unverifiedText
            ]}>
              {user?.is_active ? 'Active' : 'Inactive'}
            </ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}
