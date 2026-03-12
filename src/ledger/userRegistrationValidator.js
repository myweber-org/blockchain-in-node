function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    return true;
}

function validateRegistration(userData) {
    const errors = {};
    
    if (!userData.username || userData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase and numbers';
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

module.exports = { validateRegistration, validateEmail, validatePassword };function validateRegistrationForm(formData) {
    const errors = {};

    if (!formData.username || formData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!formData.password || formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    if (formData.age && (isNaN(formData.age) || formData.age < 18 || formData.age > 120)) {
        errors.age = 'Age must be a number between 18 and 120';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}