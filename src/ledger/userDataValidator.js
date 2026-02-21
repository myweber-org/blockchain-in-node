function validateEmail(email) {
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

function validateUserInput(userData) {
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

export { validateEmail, validatePassword, validateUsername, validateUserInput };function validateEmail(email) {
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
        errors.push('Username must be 3-20 characters using only letters, numbers, and underscores');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateEmail, validatePassword, validateUsername, validateUserData };