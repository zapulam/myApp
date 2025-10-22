/**
 * Shared validation utilities for authentication forms
 */

// Email validation regex - RFC 5322 compliant
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns true if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns error message if invalid, empty string if valid
 */
export const validatePassword = (password: string): string => {
  if (!password || password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return '';
};

/**
 * Validates that two passwords match
 * @param password - First password
 * @param confirmPassword - Second password to match
 * @returns error message if they don't match, empty string if they match
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): string => {
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

/**
 * Validates name field
 * @param name - Name string to validate
 * @returns error message if invalid, empty string if valid
 */
export const validateName = (name: string): string => {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  return '';
};

/**
 * Validates login form
 * @param email - Email string
 * @param password - Password string
 * @returns object with validation results
 */
export const validateLoginForm = (email: string, password: string) => {
  const errors: { email?: string; password?: string } = {};
  
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!password.trim()) {
    errors.password = 'Password is required';
  } else {
    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates signup form
 * @param email - Email string
 * @param password - Password string
 * @param name - Name string
 * @returns object with validation results
 */
export const validateSignupForm = (email: string, password: string, name: string) => {
  const errors: { email?: string; password?: string; name?: string } = {};
  
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!password.trim()) {
    errors.password = 'Password is required';
  } else {
    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }
  }
  
  if (!name.trim()) {
    errors.name = 'Name is required';
  } else {
    const nameError = validateName(name);
    if (nameError) {
      errors.name = nameError;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates forgot password form
 * @param email - Email string
 * @returns object with validation results
 */
export const validateForgotPasswordForm = (email: string) => {
  const errors: { email?: string } = {};
  
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates reset password form
 * @param newPassword - New password string
 * @param confirmPassword - Confirm password string
 * @returns object with validation results
 */
export const validateResetPasswordForm = (newPassword: string, confirmPassword: string) => {
  const errors: { newPassword?: string; confirmPassword?: string } = {};
  
  if (!newPassword.trim()) {
    errors.newPassword = 'New password is required';
  } else {
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      errors.newPassword = passwordError;
    }
  }
  
  if (!confirmPassword.trim()) {
    errors.confirmPassword = 'Please confirm your password';
  } else {
    const matchError = validatePasswordMatch(newPassword, confirmPassword);
    if (matchError) {
      errors.confirmPassword = matchError;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
