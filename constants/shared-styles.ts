import { Colors, Fonts } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const createSharedStyles = () => {
  const colors = Colors;
  
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
    // Glass morphism auth container
    authGradientContainer: {
      flex: 1,
      overflow: 'hidden',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    authScrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    glassCard: {
      backgroundColor: 'rgba(21, 23, 24, 0.7)',
      borderRadius: 24,
      padding: 32,
      marginHorizontal: 16,
      maxWidth: 400,
      alignSelf: 'center',
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 30,
      elevation: 10,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
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
      marginBottom: 32,
    },
    headerWithTopMargin: {
      alignItems: 'center',
      marginTop: 60,
      marginBottom: 40,
    },
    authHeader: {
      alignItems: 'center',
      marginBottom: 20,
    },
    authIconContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#c026d3',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#c026d3',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 8,
    },
    // Tab switcher styles
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: 12,
      padding: 4,
      marginBottom: 20,
      width: '100%',
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 10,
    },
    activeTab: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    tabText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      opacity: 0.5,
    },
    activeTabText: {
      opacity: 1,
      color: colors.text,
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
      fontFamily: Fonts.bold,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    authTitle: {
      fontSize: 30,
      fontWeight: '700',
      fontFamily: Fonts.bold,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 6,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: Fonts.regular,
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
    authSubtitle: {
      fontSize: 15,
      color: colors.text,
      opacity: 0.6,
      textAlign: 'center',
    },

    // Form styles
    form: {
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
    },
    authForm: {
      width: '100%',
    },
    inputContainer: {
      marginBottom: 0,
    },
    authInputContainer: {
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
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      paddingTop: 20, // Consistent top padding for floating labels
      fontSize: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: colors.text,
      minHeight: 54,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 2,
    },
    largeInput: {
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      paddingTop: 22, // Consistent top padding for floating labels
      fontSize: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: colors.text,
      minHeight: 60,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 2,
    },
    passwordContainer: {
      position: 'relative',
    },
    passwordInput: {
      borderWidth: 1,
      borderColor: '#333',
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
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 8,
      shadowColor: colors.tint,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    authButton: {
      backgroundColor: colors.tint,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    primaryButtonLarge: {
      backgroundColor: colors.tint,
      borderRadius: 14,
      paddingVertical: 18,
      alignItems: 'center',
      marginTop: 20,
      shadowColor: colors.tint,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
      elevation: 6,
    },
    primaryButtonDisabled: {
      backgroundColor: '#3a3a3a',
      opacity: 0.7,
      shadowOpacity: 0.1,
    },
    primaryButtonText: {
      color: '#000',
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 0.3,
    },
    primaryButtonTextLarge: {
      color: '#000',
      fontSize: 17,
      fontWeight: '700',
      letterSpacing: 0.5,
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
    authToggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
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
      backgroundColor: '#1a1a1a',
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
      backgroundColor: '#1a3d1a',
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
      borderBottomColor: '#333',
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
      backgroundColor: '#2a2a2a',
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
      backgroundColor: '#1a1a1a',
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
      backgroundColor: '#2a2a2a',
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
      backgroundColor: '#333',
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
