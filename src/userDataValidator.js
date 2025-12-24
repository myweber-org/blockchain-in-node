function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}

function validateUserData(userData) {
    const errors = [];

    if (!userData.name || sanitizeInput(userData.name).length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }

    if (userData.password && userData.password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: {
            name: sanitizeInput(userData.name || ''),
            email: sanitizeInput(userData.email || '')
        }
    };
}

module.exports = { validateUserData, validateEmail, sanitizeInput };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    if (!/[!@#$%^&*]/.test(password)) return false;
    return true;
}

function validateUsername(username) {
    return username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_]+$/.test(username);
}

function validateUserData(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
    }
    
    if (!validateUsername(userData.username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateEmail, validatePassword, validateUsername, validateUserData };function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  return true;
}

function validateUserInput(email, password) {
  const errors = [];
  
  if (!validateEmail(email)) {
    errors.push('Invalid email format');
  }
  
  if (!validatePassword(password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { validateEmail, validatePassword, validateUserInput };