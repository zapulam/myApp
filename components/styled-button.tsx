import { createSharedStyles } from '@/constants/shared-styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

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
  const colorScheme = useColorScheme();
  const styles = createSharedStyles(colorScheme);

  const getButtonStyle = () => {
    const baseStyle = size === 'large' ? styles.primaryButtonLarge : styles.primaryButton;
    
    switch (variant) {
      case 'secondary':
        return [styles.secondaryButton, style];
      case 'danger':
        return [styles.dangerButton, style];
      default:
        return [baseStyle, disabled && styles.primaryButtonDisabled, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButtonText;
      case 'danger':
        return styles.dangerButtonText;
      default:
        return size === 'large' ? styles.primaryButtonTextLarge : styles.primaryButtonText;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          color={colorScheme === 'dark' ? '#000' : 'white'} 
          size="small"
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
