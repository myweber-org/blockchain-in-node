function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

function validateRegistration(userData) {
    const errors = {};
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!userData.username || userData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

module.exports = { validateRegistration, validateEmail, validatePassword };