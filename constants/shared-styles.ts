import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const createSharedStyles = (colorScheme: 'light' | 'dark' | null | undefined) => {
  const colors = Colors[colorScheme ?? 'light'];
  
  return StyleSheet.create({
    // Container styles
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 16,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    centeredContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Header styles
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    headerWithTopMargin: {
      alignItems: 'center',
      marginTop: 60,
      marginBottom: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    largeTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.7,
      textAlign: 'center',
    },
    smallSubtitle: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.7,
      textAlign: 'center',
    },

    // Form styles
    form: {
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 6,
      color: colors.text,
    },
    largeLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
      color: colors.text,
    },
    input: {
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#333' : '#ddd',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      paddingTop: 20, // Consistent top padding for floating labels
      fontSize: 14,
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: 50, // Ensure consistent height
    },
    largeInput: {
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#333' : '#ddd',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      paddingTop: 20, // Consistent top padding for floating labels
      fontSize: 16,
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: 56, // Ensure consistent height
    },
    passwordContainer: {
      position: 'relative',
    },
    passwordInput: {
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#333' : '#ddd',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      paddingTop: 20, // Consistent top padding for floating labels
      paddingRight: 40,
      fontSize: 14,
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: 50, // Ensure consistent height
    },
    toggleButton: {
      position: 'absolute',
      right: 12,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 32,
    },

    // Button styles
    primaryButton: {
      backgroundColor: colors.tint,
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: 'center',
      marginTop: 8,
    },
    primaryButtonLarge: {
      backgroundColor: colors.tint,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 20,
    },
    primaryButtonDisabled: {
      backgroundColor: colorScheme === 'dark' ? '#555' : '#ccc',
      opacity: 0.6,
    },
    primaryButtonText: {
      color: colorScheme === 'dark' ? '#000' : 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    primaryButtonTextLarge: {
      color: colorScheme === 'dark' ? '#000' : 'white',
      fontSize: 18,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.tint,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 12,
    },
    secondaryButtonText: {
      color: colors.tint,
      fontSize: 18,
      fontWeight: '600',
    },
    dangerButton: {
      backgroundColor: '#ff4444',
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    dangerButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },

    // Toggle styles
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    toggleText: {
      fontSize: 14,
      color: colors.text,
    },
    toggleLink: {
      color: colors.tint,
      fontWeight: '600',
      marginLeft: 5,
      fontSize: 14,
    },

    // Error styles
    errorContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    errorBox: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 20,
      margin: 20,
      maxWidth: 300,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    errorText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
    },
    errorCloseButton: {
      marginLeft: 10,
      padding: 5,
    },
    errorCloseText: {
      fontSize: 24,
      color: colors.text,
      fontWeight: 'bold',
    },
    passwordErrorText: {
      color: '#ff4444',
      fontSize: 12,
      marginBottom: 6,
      marginLeft: 4,
    },

    // Loading styles
    loadingContainer: {
      alignItems: 'center',
      padding: 40,
    },
    loadingText: {
      fontSize: 16,
      color: colors.text,
      marginTop: 16,
    },

    // Instruction/Info styles
    instructions: {
      backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
      borderRadius: 12,
      padding: 20,
      marginBottom: 30,
    },
    instructionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    instructionText: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.8,
      lineHeight: 20,
    },
    emailText: {
      fontSize: 16,
      color: colors.tint,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 8,
    },

    // Icon styles
    icon: {
      fontSize: 64,
      marginBottom: 20,
    },

    // Welcome text
    welcomeText: {
      fontSize: 20,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 30,
    },
  });
};
