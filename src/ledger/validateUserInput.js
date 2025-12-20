function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!usernameRegex.test(username)) {
        throw new Error('Username must be 3-20 characters and contain only letters, numbers, and underscores.');
    }

    if (!passwordRegex.test(password)) {
        throw new Error('Password must be at least 8 characters and contain at least one letter and one number.');
    }

    return true;
}function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    
    if (!usernameRegex.test(username)) {
        return { valid: false, message: "Username must be 3-20 characters and contain only letters, numbers, and underscores." };
    }
    
    if (!passwordRegex.test(password)) {
        return { valid: false, message: "Password must be at least 8 characters with uppercase, lowercase, and a number." };
    }
    
    return { valid: true, message: "Input validation passed." };
}function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    
    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores."
        };
    }
    
    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters with uppercase, lowercase, and a number."
        };
    }
    
    return {
        isValid: true,
        message: "Input validation passed."
    };
}function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores."
        };
    }

    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters with at least one letter and one number."
        };
    }

    return {
        isValid: true,
        message: "Input validation passed."
    };
}function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!usernameRegex.test(username)) {
        return { valid: false, message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores.' };
    }
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address.' };
    }
    
    return { valid: true, message: 'Input validation successful.' };
}function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    if (!usernameValid) {
        return { valid: false, message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores.' };
    }
    
    if (!passwordValid) {
        return { valid: false, message: 'Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number.' };
    }
    
    return { valid: true, message: 'Input validation passed.' };
}

module.exports = { validateUserInput, validateUsername, validatePassword };function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    if (!usernameValid && !passwordValid) {
        return { valid: false, message: 'Username and password are invalid' };
    }
    
    if (!usernameValid) {
        return { valid: false, message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores' };
    }
    
    if (!passwordValid) {
        return { valid: false, message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character' };
    }
    
    return { valid: true, message: 'Input validation successful' };
}

export { validateUserInput, validateUsername, validatePassword };function validateUsername(username) {
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
        return { isValid: false, error: 'Input must be a string' };
    }

    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
        return { isValid: false, error: 'Input cannot be empty' };
    }

    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return {
                isValid: emailRegex.test(trimmedInput),
                error: emailRegex.test(trimmedInput) ? null : 'Invalid email format'
            };
        case 'username':
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            return {
                isValid: usernameRegex.test(trimmedInput),
                error: usernameRegex.test(trimmedInput) ? null : 'Username must be 3-20 alphanumeric characters or underscores'
            };
        case 'password':
            const hasMinLength = trimmedInput.length >= 8;
            const hasUpperCase = /[A-Z]/.test(trimmedInput);
            const hasLowerCase = /[a-z]/.test(trimmedInput);
            const hasNumber = /\d/.test(trimmedInput);
            const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
            
            if (!isValid) {
                const errors = [];
                if (!hasMinLength) errors.push('at least 8 characters');
                if (!hasUpperCase) errors.push('one uppercase letter');
                if (!hasLowerCase) errors.push('one lowercase letter');
                if (!hasNumber) errors.push('one number');
                return { isValid: false, error: `Password must contain ${errors.join(', ')}` };
            }
            return { isValid: true, error: null };
        default:
            return { isValid: true, error: null };
    }
}function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    if (!usernameValid && !passwordValid) {
        return { valid: false, message: "Invalid username and password format" };
    } else if (!usernameValid) {
        return { valid: false, message: "Invalid username format" };
    } else if (!passwordValid) {
        return { valid: false, message: "Invalid password format" };
    }
    
    return { valid: true, message: "Input validation successful" };
}

module.exports = { validateUserInput, validateUsername, validatePassword };function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores."
        };
    }

    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters with at least one letter and one number."
        };
    }

    return {
        isValid: true,
        message: "Input validation passed."
    };
}function validateUsername(username) {
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

export { validateUsername, validateEmail, validateUserInput };function sanitizeInput(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    
    return input
        .trim()
        .replace(/[<>]/g, '')
        .slice(0, 255);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = { sanitizeInput, validateEmail };function validateUsername(username) {
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

module.exports = validateUserInput;function validateUsername(username) {
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

export { validateUsername, validateEmail, validateUserInput };function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    
    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores."
        };
    }
    
    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters with at least one letter and one number."
        };
    }
    
    return {
        isValid: true,
        message: "Input validation passed."
    };
}function validateUsername(username) {
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

export { validateUsername, validateEmail, validateUserInput };function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!usernameRegex.test(username)) {
        return { valid: false, message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores.' };
    }
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address.' };
    }
    
    return { valid: true, message: 'Input validation passed.' };
}

module.exports = validateUserInput;function validateUsername(username) {
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

module.exports = { validateUserInput, validateUsername, validateEmail };function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!usernameRegex.test(username)) {
        return { valid: false, message: "Username must be 3-20 characters and contain only letters, numbers, and underscores." };
    }
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Please enter a valid email address." };
    }
    
    return { valid: true, message: "Input validation successful." };
}