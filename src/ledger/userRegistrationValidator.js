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

function validateRegistrationForm(email, password, confirmPassword) {
    const errors = [];
    
    if (!validateEmail(email)) {
        errors.push("Invalid email format");
    }
    
    if (!validatePassword(password)) {
        errors.push("Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters");
    }
    
    if (password !== confirmPassword) {
        errors.push("Passwords do not match");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = {
    validateEmail,
    validatePassword,
    validateRegistrationForm
};