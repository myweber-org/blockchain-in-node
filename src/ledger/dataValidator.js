function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    const trimmed = input.trim();
    const sanitized = trimmed.replace(/[<>]/g, '');
    
    if (sanitized.length > 100) {
        return sanitized.substring(0, 100);
    }
    
    return sanitized;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

export { sanitizeInput, validateEmail, validatePassword };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function sanitizeInput(input) {
    return input.trim()
        .replace(/[<>]/g, '')
        .replace(/\s+/g, ' ');
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    return true;
}

export { validateEmail, validatePhone, sanitizeInput, validatePassword };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function sanitizeInput(input) {
    return input.trim()
                .replace(/[<>]/g, '')
                .substring(0, 255);
}

function validateFormData(formData) {
    const errors = [];
    
    if (!validateEmail(formData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(formData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    formData.username = sanitizeInput(formData.username);
    if (formData.username.length < 3) {
        errors.push('Username must be at least 3 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: formData
    };
}

export { validateEmail, validatePassword, sanitizeInput, validateFormData };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateFormData(formData) {
    const errors = [];
    
    if (!validateEmail(formData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(formData.password)) {
        errors.push('Password must be at least 8 characters with uppercase and number');
    }
    
    formData.username = sanitizeInput(formData.username);
    formData.comments = sanitizeInput(formData.comments);
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: formData
    };
}

export { validateEmail, validatePassword, sanitizeInput, validateFormData };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateFormData(data) {
    const errors = {};
    
    if (!validateEmail(data.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePhoneNumber(data.phone)) {
        errors.phone = 'Invalid phone number format';
    }
    
    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateEmail, validatePhoneNumber, validateFormData };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function sanitizeInput(input) {
    return input.trim()
                .replace(/[<>]/g, '')
                .substring(0, 255);
}

function validateFormData(formData) {
    const errors = {};
    
    if (!validateEmail(formData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePassword(formData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase and number';
    }
    
    formData.username = sanitizeInput(formData.username);
    if (formData.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors,
        sanitizedData: formData
    };
}

export { validateEmail, validatePassword, sanitizeInput, validateFormData };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /\d/.test(password);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateRegistrationData(userData) {
    const errors = [];
    
    if (!validateUsername(userData.username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }
    
    if (!validateEmail(userData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase, and numbers');
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateRegistrationData };function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

function validateFormData(userData) {
  const errors = [];

  if (!validateEmail(userData.email)) {
    errors.push('Invalid email format');
  }

  if (!validatePhoneNumber(userData.phone)) {
    errors.push('Invalid phone number format');
  }

  if (!userData.name || userData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { validateEmail, validatePhoneNumber, validateFormData };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function validateUsername(username) {
    return username.length >= 3 && 
           username.length <= 20 && 
           /^[a-zA-Z0-9_]+$/.test(username);
}

function validateRegistrationData(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    if (!validateUsername(userData.username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers and underscores');
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateRegistrationData, validateEmail, validatePassword, validateUsername };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateFormData(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePhoneNumber(userData.phone)) {
        errors.push('Invalid phone number format');
    }
    
    if (!userData.name || userData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateEmail, validatePhoneNumber, validateFormData };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function sanitizeInput(input) {
    return input.trim()
        .replace(/[<>]/g, '')
        .substring(0, 255);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    return true;
}

export { validateEmail, validatePhone, sanitizeInput, validatePassword };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

export { validateEmail, validatePassword, sanitizeInput };