import { createSharedStyles } from '@/constants/shared-styles';
import React from 'react';
import { Text, View } from 'react-native';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  size?: 'default' | 'large';
  withTopMargin?: boolean;
  style?: any;
}

export function ScreenHeader({
  title,
  subtitle,
  icon,
  size = 'default',
  withTopMargin = false,
  style,
}: ScreenHeaderProps) {
  const styles = createSharedStyles();

  return (
    <View style={[
      withTopMargin ? styles.headerWithTopMargin : styles.header,
      style
    ]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={size === 'large' ? styles.largeTitle : styles.title}>
        {title}
      </Text>
      {subtitle && (
        <Text style={size === 'large' ? styles.subtitle : styles.smallSubtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}
