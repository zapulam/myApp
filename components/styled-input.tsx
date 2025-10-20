import { createSharedStyles } from '@/constants/shared-styles';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
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
  const colorScheme = useColorScheme();
  const styles = createSharedStyles(colorScheme);
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
    outputRange: [size === 'large' ? 18 : 14, -8],
  });

  // Removed labelScale to keep text size consistent

  const labelColor = labelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors[colorScheme ?? 'light'].text + '80', Colors[colorScheme ?? 'light'].tint],
  });

  return (
    <View style={[styles.inputContainer, style]}>
      <View style={{ position: 'relative' }}>
        <Animated.Text
          style={[
            {
              position: 'absolute',
              top: labelTop,
              left: size === 'large' ? 16 : 12,
              fontSize: size === 'large' ? 16 : 14, // Keep consistent font size
              color: labelColor,
              backgroundColor: Colors[colorScheme ?? 'light'].background,
              paddingHorizontal: 4,
              zIndex: 1,
            },
          ]}
        >
          {label}
        </Animated.Text>
        
        {error && <Text style={styles.passwordErrorText}>{error}</Text>}
        
        {isPassword ? (
          <View style={styles.passwordContainer}>
            <TextInput
              style={size === 'large' ? styles.largeInput : styles.input}
              placeholder={!isFloating ? placeholder : ''} // Only show placeholder when label is not floating
              placeholderTextColor={Colors[colorScheme ?? 'light'].text + '80'}
              value={value}
              onChangeText={onChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              secureTextEntry={!shouldShowPassword}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              autoCorrect={autoCorrect}
            />
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'lock-open' : 'lock-closed'}
                size={20}
                color={Colors[colorScheme ?? 'light'].tint}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TextInput
            style={size === 'large' ? styles.largeInput : styles.input}
            placeholder={!isFloating ? placeholder : ''} // Only show placeholder when label is not floating
            placeholderTextColor={Colors[colorScheme ?? 'light'].text + '80'}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
          />
        )}
      </View>
    </View>
  );
}
