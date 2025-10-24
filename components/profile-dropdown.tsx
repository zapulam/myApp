import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export interface ProfileDropdownProps {
  onLogout: () => void;
}

export function ProfileDropdown({ onLogout }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const colorScheme = useColorScheme();
  const styles = createSharedStyles(colorScheme);

  const handleSettings = () => {
    setIsOpen(false);
    Alert.alert('Coming Soon', 'Settings page will be available soon!');
  };

  const handleProfile = () => {
    setIsOpen(false);
    router.push('/profile');
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => setIsOpen(true)}
      >
        <Ionicons 
          name="person" 
          size={20} 
          color={colorScheme === 'dark' ? '#ECEDEE' : '#11181C'} 
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.dropdownWrapper}>
            <ThemedView style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleProfile}
            >
              <Ionicons 
                name="person" 
                size={16} 
                color={colorScheme === 'dark' ? '#ECEDEE' : '#11181C'} 
              />
              <ThemedText style={styles.dropdownText}>Profile</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleSettings}
            >
              <Ionicons 
                name="settings" 
                size={16} 
                color={colorScheme === 'dark' ? '#ECEDEE' : '#11181C'} 
              />
              <ThemedText style={styles.dropdownText}>Settings</ThemedText>
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleLogout}
            >
              <Ionicons 
                name="log-out" 
                size={16} 
                color="#ff4444" 
              />
              <ThemedText style={[styles.dropdownText, styles.logoutText]}>Logout</ThemedText>
            </TouchableOpacity>
            </ThemedView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
