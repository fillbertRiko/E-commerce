import { VALIDATION_MESSAGES } from './constants';

/**
 * Kiểm tra email có hợp lệ không
 * @param {string} email - Email cần kiểm tra
 * @returns {boolean} true nếu email hợp lệ
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Kiểm tra số điện thoại có hợp lệ không (số điện thoại Việt Nam)
 * @param {string} phone - Số điện thoại cần kiểm tra
 * @returns {boolean} true nếu số điện thoại hợp lệ
 */
export const isValidPhone = (phone) => {
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return regex.test(phone);
};

/**
 * Kiểm tra mật khẩu có đủ mạnh không
 * @param {string} password - Mật khẩu cần kiểm tra
 * @returns {Object} Kết quả kiểm tra và thông báo lỗi
 */
export const validatePassword = (password) => {
  const result = {
    isValid: true,
    errors: []
  };

  if (password.length < 8) {
    result.errors.push('Mật khẩu phải có ít nhất 8 ký tự');
  }

  if (!/[A-Z]/.test(password)) {
    result.errors.push('Mật khẩu phải chứa ít nhất 1 chữ hoa');
  }

  if (!/[a-z]/.test(password)) {
    result.errors.push('Mật khẩu phải chứa ít nhất 1 chữ thường');
  }

  if (!/[0-9]/.test(password)) {
    result.errors.push('Mật khẩu phải chứa ít nhất 1 số');
  }

  if (!/[!@#$%^&*]/.test(password)) {
    result.errors.push('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (!@#$%^&*)');
  }

  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Kiểm tra độ tuổi có hợp lệ không
 * @param {string|Date} birthDate - Ngày sinh cần kiểm tra
 * @param {number} minAge - Tuổi tối thiểu
 * @returns {boolean} true nếu tuổi hợp lệ
 */
export const isValidAge = (birthDate, minAge = 18) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age >= minAge;
};

/**
 * Kiểm tra mã zip code có hợp lệ không
 * @param {string} zipCode - Mã zip code cần kiểm tra
 * @returns {boolean} true nếu mã zip code hợp lệ
 */
export const isValidZipCode = (zipCode) => {
  // Mã bưu chính Việt Nam có 5 hoặc 6 số
  const regex = /^\d{5,6}$/;
  return regex.test(zipCode);
};

/**
 * Kiểm tra URL có hợp lệ không
 * @param {string} url - URL cần kiểm tra
 * @returns {boolean} true nếu URL hợp lệ
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Required field validation
export const required = (value) => {
  if (value === null || value === undefined || value === '') {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  return true;
};

// Email validation
export const email = (value) => {
  if (!value) return true;
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(value) || VALIDATION_MESSAGES.EMAIL;
};

// Minimum length validation
export const minLength = (min) => (value) => {
  if (!value) return true;
  return value.length >= min || VALIDATION_MESSAGES.MIN_LENGTH(min);
};

// Maximum length validation
export const maxLength = (max) => (value) => {
  if (!value) return true;
  return value.length <= max || VALIDATION_MESSAGES.MAX_LENGTH(max);
};

// Password validation
export const password = (value) => {
  if (!value) return true;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(value) || 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character';
};

// Confirm password validation
export const confirmPassword = (password) => (value) => {
  if (!value) return true;
  return value === password || VALIDATION_MESSAGES.PASSWORDS_MATCH;
};

// Phone number validation
export const phone = (value) => {
  if (!value) return true;
  const regex = /^\+?[1-9]\d{1,14}$/;
  return regex.test(value) || VALIDATION_MESSAGES.PHONE;
};

// URL validation
export const url = (value) => {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return 'Please enter a valid URL';
  }
};

// Numeric validation
export const numeric = (value) => {
  if (!value) return true;
  return !isNaN(value) || 'Please enter a valid number';
};

// Integer validation
export const integer = (value) => {
  if (!value) return true;
  return Number.isInteger(Number(value)) || 'Please enter a valid integer';
};

// Positive number validation
export const positive = (value) => {
  if (!value) return true;
  return Number(value) > 0 || 'Please enter a positive number';
};

// Date validation
export const date = (value) => {
  if (!value) return true;
  const date = new Date(value);
  return !isNaN(date.getTime()) || 'Please enter a valid date';
};

// Future date validation
export const futureDate = (value) => {
  if (!value) return true;
  const date = new Date(value);
  return date > new Date() || 'Please enter a future date';
};

// Past date validation
export const pastDate = (value) => {
  if (!value) return true;
  const date = new Date(value);
  return date < new Date() || 'Please enter a past date';
};

// File size validation
export const maxFileSize = (maxSize) => (file) => {
  if (!file) return true;
  return file.size <= maxSize || `File size must be less than ${maxSize / 1024 / 1024}MB`;
};

// File type validation
export const allowedFileTypes = (types) => (file) => {
  if (!file) return true;
  return types.includes(file.type) || `Allowed file types: ${types.join(', ')}`;
};

// Custom validation rule
export const custom = (validator) => (value) => {
  if (!value) return true;
  return validator(value);
};

// Combine multiple validation rules
export const compose = (...validators) => (value) => {
  for (const validator of validators) {
    const result = validator(value);
    if (result !== true) {
      return result;
    }
  }
  return true;
}; 