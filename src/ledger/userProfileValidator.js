function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validateProfileForm(formData) {
    const errors = {};
    
    if (!validateEmail(formData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validateUsername(formData.username)) {
        errors.username = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
    }
    
    if (!validatePassword(formData.password)) {
        errors.password = 'Password must be at least 8 characters long';
    }
    
    if (formData.age && (formData.age < 0 || formData.age > 150)) {
        errors.age = 'Age must be between 0 and 150';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

module.exports = { validateProfileForm };