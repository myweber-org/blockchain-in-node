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

function validateRegistration(userData) {
    const errors = {};
    
    if (!userData.username || userData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number and special character';
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

module.exports = { validateRegistration, validateEmail, validatePassword };
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long" };
    }
    
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    
    if (!/\d/.test(password)) {
        return { valid: false, message: "Password must contain at least one number" };
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return { valid: false, message: "Password must contain at least one special character" };
    }
    
    return { valid: true, message: "Password is strong" };
}

function validateRegistrationForm(email, password, confirmPassword) {
    const errors = [];
    
    if (!validateEmail(email)) {
        errors.push("Invalid email format");
    }
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        errors.push(passwordValidation.message);
    }
    
    if (password !== confirmPassword) {
        errors.push("Passwords do not match");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateRegistrationForm, validateEmail, validatePassword };