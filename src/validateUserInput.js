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
    errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
  }
  
  if (!validateEmail(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { validateUsername, validateEmail, validateUserInput };function validateUsername(username) {
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
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }
    
    if (!validateEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserInput, validateUsername, validateEmail };function validateUserInput(input, type) {
    if (typeof input !== 'string') {
        return { valid: false, error: 'Input must be a string' };
    }

    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
        return { valid: false, error: 'Input cannot be empty' };
    }

    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return {
                valid: emailRegex.test(trimmedInput),
                error: emailRegex.test(trimmedInput) ? null : 'Invalid email format'
            };
        case 'username':
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            return {
                valid: usernameRegex.test(trimmedInput),
                error: usernameRegex.test(trimmedInput) ? null : 'Username must be 3-20 alphanumeric characters or underscores'
            };
        case 'password':
            const hasMinLength = trimmedInput.length >= 8;
            const hasUpperCase = /[A-Z]/.test(trimmedInput);
            const hasLowerCase = /[a-z]/.test(trimmedInput);
            const hasNumber = /\d/.test(trimmedInput);
            const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
            
            return {
                valid: isValid,
                error: isValid ? null : 'Password must be at least 8 characters with uppercase, lowercase, and number'
            };
        default:
            return { valid: true, error: null, value: trimmedInput };
    }
}