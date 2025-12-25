
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  
  const trimmed = input.trim();
  const sanitized = trimmed.replace(/[<>]/g, '');
  
  if (sanitized.length === 0) {
    throw new Error('Input cannot be empty after sanitization');
  }
  
  return sanitized;
}

function validateEmail(email) {
  const sanitizedEmail = sanitizeInput(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(sanitizedEmail)) {
    throw new Error('Invalid email format');
  }
  
  return sanitizedEmail.toLowerCase();
}

function validatePassword(password) {
  const sanitizedPassword = sanitizeInput(password);
  
  if (sanitizedPassword.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(sanitizedPassword)) {
    throw new Error('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(sanitizedPassword)) {
    throw new Error('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(sanitizedPassword)) {
    throw new Error('Password must contain at least one number');
  }
  
  return sanitizedPassword;
}

export { sanitizeInput, validateEmail, validatePassword };
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    return input
        .trim()
        .replace(/[<>]/g, '')
        .substring(0, 255);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

module.exports = {
    sanitizeInput,
    validateEmail,
    validatePassword
};function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(username, password) {
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    
    if (!isUsernameValid) {
        return { valid: false, message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores.' };
    }
    
    if (!isPasswordValid) {
        return { valid: false, message: 'Password must be at least 8 characters and contain at least one letter and one number.' };
    }
    
    return { valid: true, message: 'Input validation successful.' };
}

export { validateUserInput, validateUsername, validatePassword };