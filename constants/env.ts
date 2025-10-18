/**
 * Environment configuration
 * Loads environment variables with fallbacks for development
 */

// Load from environment variables
export const ENV = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL!,
  API_TIMEOUT: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '10000'),
  DEBUG: process.env.EXPO_PUBLIC_DEBUG === 'true',
} as const;

// Type-safe environment configuration
export type EnvConfig = typeof ENV;

// Helper to check if we're in development
export const isDevelopment = () => ENV.DEBUG;

// Helper to get API URL with protocol validation
export const getApiUrl = () => {
  const url = ENV.API_BASE_URL;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    console.warn('API_BASE_URL should include protocol (http:// or https://)');
    return `http://${url}`;
  }
  return url;
};
