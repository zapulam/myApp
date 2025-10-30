import { createSharedStyles } from '@/constants/shared-styles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Pressable, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export interface ProfileDropdownProps {
  onLogout: () => void;
  userName?: string;
}

export function ProfileDropdown({ onLogout, userName }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const styles = createSharedStyles();
  const dropdownRef = useRef<View>(null);
  const buttonRef = useRef<View>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(-10);
    }
  }, [isOpen, fadeAnim, slideAnim]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isOpen && dropdownRef.current && buttonRef.current) {
        const dropdown = (dropdownRef.current as any)._nativeTag;
        const button = (buttonRef.current as any)._nativeTag;
        const target = event.target;
        
        // Check if click is outside both dropdown and button
        if (!target.closest(`[data-dropdown="true"]`) && !target.closest(`[data-button="true"]`)) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      // Add event listener for web
      if (typeof document !== 'undefined') {
        document.addEventListener('mousedown', handleClickOutside);
      }
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [isOpen]);

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
    <View style={{ position: 'relative', zIndex: 9999 }}>
      <Pressable
        ref={buttonRef}
        style={({ hovered }: any) => [
          styles.profileButton,
          { cursor: 'pointer' } as any,
          hovered && { opacity: 0.8 }
        ]}
        onPress={() => setIsOpen(!isOpen)}
        // @ts-ignore
        dataSet={{ button: 'true' }}
      >
        <Ionicons 
          name="person-outline" 
          size={20} 
          color="#ECEDEE" 
        />
      </Pressable>

      {isOpen && (
        <Animated.View 
          ref={dropdownRef} 
          style={{ 
            position: 'absolute', 
            top: 56, 
            right: 0, 
            zIndex: 10000,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          pointerEvents="box-none"
          // @ts-ignore
          dataSet={{ dropdown: 'true' }}
        >
          <ThemedView style={[styles.dropdownContainer, { pointerEvents: 'auto', backgroundColor: '#010409', borderWidth: 1, borderColor: '#333333' }]}>
            {userName && (
              <>
                <View style={{ paddingHorizontal: 16, paddingVertical: 12, alignItems: 'center' }}>
                  <ThemedText style={{ fontSize: 14, fontWeight: '500', color: '#ECEDEE' }}>
                    {userName}
                  </ThemedText>
                </View>
                <View style={styles.dropdownDivider} />
              </>
            )}
            <Pressable
              style={({ pressed, hovered }: any) => [
                styles.dropdownItem,
                { marginHorizontal: 8, borderRadius: 8, cursor: 'pointer' } as any,
                hovered && { backgroundColor: '#2a2a2a' }
              ]}
              onPress={handleProfile}
            >
              <Ionicons 
                name="person-outline" 
                size={16} 
                color="#ECEDEE" 
              />
              <ThemedText style={[styles.dropdownText, { fontSize: 14 }]}>Profile</ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed, hovered }: any) => [
                styles.dropdownItem,
                { marginHorizontal: 8, borderRadius: 8, cursor: 'pointer' } as any,
                hovered && { backgroundColor: '#2a2a2a' }
              ]}
              onPress={handleSettings}
            >
              <Ionicons 
                name="settings-outline" 
                size={16} 
                color="#ECEDEE" 
              />
              <ThemedText style={[styles.dropdownText, { fontSize: 14 }]}>Settings</ThemedText>
            </Pressable>

            <View style={styles.dropdownDivider} />

            <Pressable
              style={({ pressed, hovered }: any) => [
                styles.dropdownItem,
                { marginHorizontal: 8, borderRadius: 8, cursor: 'pointer' } as any,
                hovered && { backgroundColor: '#2a2a2a' }
              ]}
              onPress={handleLogout}
            >
              <Ionicons 
                name="log-out-outline" 
                size={16} 
                color="#ECEDEE" 
              />
              <ThemedText style={[styles.dropdownText, { fontSize: 14 }]}>Logout</ThemedText>
            </Pressable>
            </ThemedView>
        </Animated.View>
      )}
    </View>
  );
}
