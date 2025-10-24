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
      boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
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

    // Success styles
    successContainer: {
      backgroundColor: colorScheme === 'dark' ? '#1a3d1a' : '#e8f5e8',
      borderRadius: 12,
      padding: 20,
      marginBottom: 30,
      borderLeftWidth: 4,
      borderLeftColor: '#4CAF50',
    },
    successText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    successSubtext: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.8,
      textAlign: 'center',
      lineHeight: 20,
    },
    button: {
      marginTop: 20,
    },


    // Navigation styles
    navigationHeader: {
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colorScheme === 'dark' ? '#333' : '#e0e0e0',
      paddingTop: 10,
      paddingBottom: 10,
    },
    navigationHeaderContent: {
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
      paddingHorizontal: 20,
    },
    navigationContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navigationTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    navigationActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    navigationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f5f5f5',
    },
    navigationIcon: {
      fontSize: 16,
      marginRight: 6,
    },
    navigationItemText: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '500',
    },
    profileButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.tint,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileIcon: {
      fontSize: 20,
    },

    // Profile styles
    profileContainer: {
      flex: 1,
      padding: 20,
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
    },
    profileInfo: {
      backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f8f9fa',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    profileField: {
      marginBottom: 16,
    },
    profileLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      opacity: 0.7,
      marginBottom: 8,
    },
    profileValue: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    verifiedText: {
      color: '#4CAF50',
    },
    unverifiedText: {
      color: '#ff4444',
    },
    profileActions: {
      gap: 16,
    },
    editButton: {
      position: 'absolute',
      top: 16,
      right: 16,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },

    // Home page styles
    welcomeSection: {
      alignItems: 'center',
      marginBottom: 30,
      paddingHorizontal: 20,
    },
    welcomeTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 10,
    },
    welcomeSubtitle: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.7,
      textAlign: 'center',
      lineHeight: 22,
    },
    quickActions: {
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 20,
    },

    // Profile dropdown styles
    dropdownOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 70,
    },
    dropdownWrapper: {
      maxWidth: 1200,
      width: '100%',
      paddingHorizontal: 20,
      alignItems: 'flex-end',
    },
    dropdownContainer: {
      backgroundColor: colors.background,
      borderRadius: 12,
      paddingVertical: 8,
      minWidth: 160,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 12,
    },
    dropdownText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    logoutText: {
      color: '#ff4444',
    },
    dropdownDivider: {
      height: 1,
      backgroundColor: colorScheme === 'dark' ? '#333' : '#e0e0e0',
      marginVertical: 4,
    },

    // Dashboard styles
    dashboardContainer: {
      flex: 1,
      padding: 20,
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
    },
    dashboardContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dashboardTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    dashboardSubtitle: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.7,
      textAlign: 'center',
      lineHeight: 22,
    },

    // Auth error message styles
    errorMessageContainer: {
      marginHorizontal: 20,
      marginBottom: 20,
      maxWidth: 400,
      alignSelf: 'center',
    },
    errorMessageText: {
      fontSize: 14,
      color: '#ff4444',
      fontWeight: '500',
      textAlign: 'center',
    },
  });
};
