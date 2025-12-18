function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUserInput(username, email) {
    const errors = [];
    
    if (!validateUsername(username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores.');
    }
    
    if (!validateEmail(email)) {
        errors.push('Please enter a valid email address.');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserInput, validateUsername, validateEmail };function validateUserInput(username, password) {
    const errors = [];

    if (!username || username.trim() === '') {
        errors.push('Username is required');
    } else if (username.length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    if (!password || password.trim() === '') {
        errors.push('Password is required');
    } else if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    } else if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    } else if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    return input
        .replace(/[<>]/g, '')
        .trim()
        .substring(0, 255);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = { sanitizeInput, validateEmail };function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

function validateUserInput(username, password) {
  const errors = [];
  
  if (!validateUsername(username)) {
    errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores.');
  }
  
  if (!validatePassword(password)) {
    errors.push('Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number.');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

module.exports = validateUserInput;