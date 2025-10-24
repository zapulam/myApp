import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
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
}

export function NavigationHeader({
  title = "MyApp",
  showProfileButton = true,
  navigationItems = [],
  onLogout,
}: NavigationHeaderProps) {
  const colorScheme = useColorScheme();
  const styles = createSharedStyles(colorScheme);

  return (
    <ThemedView style={styles.navigationHeader}>
      <View style={styles.navigationHeaderContent}>
        <View style={styles.navigationContent}>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <ThemedText style={styles.navigationTitle}>{title}</ThemedText>
          </TouchableOpacity>
          
          <View style={styles.navigationActions}>
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
              <ProfileDropdown onLogout={onLogout} />
            )}
          </View>
        </View>
      </View>
    </ThemedView>
  );
}
