/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Indian phone number
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate enrollment number
 */
export const isValidEnrollment = (enrollment) => {
  return enrollment && enrollment.length >= 5 && /^[A-Za-z0-9]+$/.test(enrollment);
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitize input text
 */
export const sanitizeText = (text) => {
  if (!text) return '';
  return text.trim().replace(/<[^>]*>/g, '');
};

/**
 * Validate image file
 */
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please upload a valid image (JPEG, PNG, WebP)',
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Image size should be less than 5MB',
    };
  }

  return { isValid: true };
};
