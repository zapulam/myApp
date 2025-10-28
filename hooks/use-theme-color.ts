/**
 * Hook to get theme colors (dark mode only)
 */

import { Colors } from '@/constants/theme';

export function useThemeColor(
  props: { dark?: string },
  colorName: keyof typeof Colors
) {
  const colorFromProps = props.dark;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[colorName];
  }
}
