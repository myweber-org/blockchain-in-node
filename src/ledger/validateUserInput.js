function sanitizeInput(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    
    const trimmed = input.trim();
    
    if (trimmed.length === 0) {
        throw new Error('Input cannot be empty after trimming');
    }
    
    const sanitized = trimmed
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
    
    return sanitized.substring(0, 255);
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validateUserInput(email, password) {
    const errors = [];
    
    if (!validateEmail(email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters long');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateUserInput, validateEmail, validatePassword };