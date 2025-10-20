import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface ErrorDisplayProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export function ErrorDisplay({ message, visible, onClose }: ErrorDisplayProps) {
  const colorScheme = useColorScheme();
  const styles = createSharedStyles(colorScheme);

  if (!visible) return null;

  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>{message}</Text>
        <TouchableOpacity style={styles.errorCloseButton} onPress={onClose}>
          <Text style={styles.errorCloseText}>x</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
