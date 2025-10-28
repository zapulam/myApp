// Always return 'dark' since we only support dark mode
export function useColorScheme() {
  return 'dark' as const;
}
