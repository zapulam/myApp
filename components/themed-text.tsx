import { Fonts } from '@/constants/theme';
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

/**
 * Custom Text component that applies the app font by default
 * Use this instead of React Native's Text to ensure consistent typography
 */
export function Text(props: TextProps) {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: Fonts.regular }, props.style]}
    />
  );
}

// Export as ThemedText as well for compatibility
export const ThemedText = Text;
