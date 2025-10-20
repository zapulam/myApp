import { ThemedView } from '@/components/themed-view';
import { createSharedStyles } from '@/constants/shared-styles';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export interface LoadingScreenProps {
  message?: string;
  style?: any;
}

export function LoadingScreen({ message = 'Loading...', style }: LoadingScreenProps) {
  const colorScheme = useColorScheme();
  const styles = createSharedStyles(colorScheme);

  return (
    <ThemedView style={[styles.container, style]}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
        <Text style={styles.loadingText}>{message}</Text>
      </View>
    </ThemedView>
  );
}
