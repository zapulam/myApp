import { createSharedStyles } from '@/constants/shared-styles';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ProfileDropdown } from './profile-dropdown';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export interface NavigationHeaderProps {
  title?: string;
  showProfileButton?: boolean;
  navigationItems?: Array<{
    label: string;
    onPress: () => void;
    icon?: string;
  }>;
  onLogout?: () => void;
  userName?: string;
}

export function NavigationHeader({
  title = "MyApp",
  showProfileButton = true,
  navigationItems = [],
  onLogout,
  userName,
}: NavigationHeaderProps) {
  const styles = createSharedStyles();

  return (
    <ThemedView style={[styles.navigationHeader, { overflow: 'visible', zIndex: 2 }]}>
      <View style={[styles.navigationHeaderContent, { overflow: 'visible' }]}>
        <View style={[styles.navigationContent, { overflow: 'visible' }]}>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <ThemedText style={styles.navigationTitle}>{title}</ThemedText>
          </TouchableOpacity>
          
          <View style={[styles.navigationActions, { overflow: 'visible' }]}>
            {navigationItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.navigationItem}
                onPress={item.onPress}
              >
                {item.icon && (
                  <ThemedText style={styles.navigationIcon}>{item.icon}</ThemedText>
                )}
                <ThemedText style={styles.navigationItemText}>{item.label}</ThemedText>
              </TouchableOpacity>
            ))}
            
            {showProfileButton && onLogout && (
              <ProfileDropdown onLogout={onLogout} userName={userName} />
            )}
          </View>
        </View>
      </View>
    </ThemedView>
  );
}
