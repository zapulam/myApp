import { createSharedStyles } from '@/constants/shared-styles';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';

export interface StyledInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  size?: 'default' | 'large';
  error?: string;
  style?: any;
}

export function StyledInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  size = 'default',
  error,
  style,
}: StyledInputProps) {
  const styles = createSharedStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [labelAnimation] = useState(new Animated.Value(value ? 1 : 0));

  const isPassword = secureTextEntry;
  const shouldShowPassword = isPassword && showPassword;
  const isFloating = isFocused || value.length > 0;

  React.useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: isFloating ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFloating, labelAnimation]);

  const labelTop = labelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [size === 'large' ? 18 : 14, -2],
  });

  const labelScale = labelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.75],
  });

  // Keep label color consistent (grey) instead of changing to theme tint
  const labelColor = Colors.text + '80';

  const inputStyle = [
    size === 'large' ? styles.largeInput : styles.input,
    // Remove default browser outline
    { outline: 'none' } as any,
  ];

  return (
    <View style={[styles.inputContainer, style]}>
      <View style={{ position: 'relative' }}>
        <Animated.Text
          style={
            {
              position: 'absolute',
              top: labelTop,
              left: size === 'large' ? 16 : 12,
              fontSize: size === 'large' ? 16 : 14,
              color: labelColor,
              backgroundColor: 'transparent',
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: 4,
              zIndex: 1,
              pointerEvents: 'none', // Allow clicks to pass through to the input
              transform: [{ scale: labelScale }],
              transformOrigin: 'left center',
            }
          }
        >
          {label}
        </Animated.Text>
        
        {isPassword ? (
          <View style={styles.passwordContainer}>
            <TextInput
              style={inputStyle}
              value={value}
              onChangeText={onChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              secureTextEntry={!shouldShowPassword}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              autoCorrect={autoCorrect}
              placeholderTextColor={Colors.text + '40'}
            />
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'lock-open-outline' : 'lock-closed-outline'}
                size={22}
                color={Colors.text + '80'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TextInput
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            placeholderTextColor={Colors.text + '40'}
          />
        )}
        
        {error && <Text style={styles.passwordErrorText}>{error}</Text>}
      </View>
    </View>
  );
}
