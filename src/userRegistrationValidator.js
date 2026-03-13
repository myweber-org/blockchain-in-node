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
    
    if (!/[!@#$%^&*]/.test(password)) {
        return { valid: false, message: "Password must contain at least one special character (!@#$%^&*)" };
    }
    
    return { valid: true, message: "Password is strong" };
}

function validateUsername(username) {
    if (username.length < 3 || username.length > 20) {
        return { valid: false, message: "Username must be between 3 and 20 characters" };
    }
    
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        return { valid: false, message: "Username can only contain letters, numbers, and underscores" };
    }
    
    return { valid: true, message: "Username is valid" };
}

function validateRegistrationForm(userData) {
    const errors = [];
    
    const emailValidation = validateEmail(userData.email);
    if (!emailValidation) {
        errors.push("Invalid email format");
    }
    
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.valid) {
        errors.push(passwordValidation.message);
    }
    
    const usernameValidation = validateUsername(userData.username);
    if (!usernameValidation.valid) {
        errors.push(usernameValidation.message);
    }
    
    if (userData.password !== userData.confirmPassword) {
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
    validateUsername,
    validateRegistrationForm
};function validateEmail(email) {
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
    
    if (!/[!@#$%^&*]/.test(password)) {
        return { valid: false, message: "Password must contain at least one special character (!@#$%^&*)" };
    }
    
    return { valid: true, message: "Password is strong" };
}

function validateRegistration(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push("Invalid email format");
    }
    
    const passwordResult = validatePassword(userData.password);
    if (!passwordResult.valid) {
        errors.push(passwordResult.message);
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push("Passwords do not match");
    }
    
    if (userData.age && (userData.age < 13 || userData.age > 120)) {
        errors.push("Age must be between 13 and 120");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateRegistration, validateEmail, validatePassword };function validateEmail(email) {
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
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number and special character';
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

module.exports = { validateRegistration, validateEmail, validatePassword };function validateRegistrationForm(formData) {
    const errors = {};
    
    if (!formData.username || formData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
        errors.password = 'Password must be at least 8 characters with letters and numbers';
    }
    
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.termsAccepted) {
        errors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}

export { validateRegistrationForm, sanitizeInput };