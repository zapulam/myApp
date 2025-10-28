/**
 * App theme colors and fonts (dark mode only)
 */

export const Colors = {
  text: '#ECEDEE',
  background: '#151718',
  tint: '#fff',
  // Gradient colors - Black at top (majority) to Blue to Orange at bottom
  gradientStart: '#000000',
  gradientMiddle: '#1e40af',
  gradientEnd: '#ff6b35',
  glassBackground: 'rgba(10, 10, 10, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  inputGlass: 'rgba(255, 255, 255, 0.05)',
  accent: '#ff6b35', // Orange
  accentSecondary: '#00d9ff', // Cyan
};

/**
 * App fonts
 * Using Consolas (monospace font available on Windows)
 * Note: On iOS/Android, this will fall back to system monospace font
 * For cross-platform consistency, add Consolas.ttf to assets/fonts/
 */
export const Fonts = {
  regular: 'Consolas',
  medium: 'Consolas',
  bold: 'Consolas',
};
