import { Text } from '@/components/themed-text';
import { createSharedStyles } from '@/constants/shared-styles';
import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'default' | 'large';

export interface StyledButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export function StyledButton({
  title,
  onPress,
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  style,
}: StyledButtonProps) {
  const styles = createSharedStyles();

  const getButtonStyle = () => {
    const baseStyle = size === 'large' ? styles.primaryButtonLarge : styles.primaryButton;
    
    switch (variant) {
      case 'secondary':
        return [styles.secondaryButton, style];
      case 'danger':
        return [styles.dangerButton, style];
      default:
        // Use dark blue when enabled, gray when disabled
        const backgroundColor = disabled ? '#4a4a4a' : '#1e40af';
        return [
          baseStyle,
          style,
          { backgroundColor, borderWidth: 0 },
          disabled && { opacity: 0.6 }
        ];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButtonText;
      case 'danger':
        return styles.dangerButtonText;
      default:
        // Always use white text with medium weight for primary buttons
        return { 
          color: 'white', 
          fontSize: 16, 
          fontWeight: '500' as const
        };
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color="white" 
          size="small"
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
