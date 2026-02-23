function validateUserProfile(profile) {
    const errors = [];

    if (!profile.email || !isValidEmail(profile.email)) {
        errors.push('Invalid email format');
    }

    if (typeof profile.age !== 'number' || profile.age < 18 || profile.age > 120) {
        errors.push('Age must be between 18 and 120');
    }

    if (!profile.username || profile.username.length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = { validateUserProfile, isValidEmail };function validateUserProfile(formData) {
    const errors = {};

    if (!formData.username || formData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Valid email is required';
    }

    if (formData.age && (isNaN(formData.age) || formData.age < 0 || formData.age > 120)) {
        errors.age = 'Age must be between 0 and 120';
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
        errors.website = 'Website must start with http:// or https://';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    return true;
}

function validateProfileData(userData) {
    const errors = {};
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validateUsername(userData.username)) {
        errors.username = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
    
    if (userData.age && (userData.age < 13 || userData.age > 120)) {
        errors.age = 'Age must be between 13 and 120';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateProfileData, validateEmail, validateUsername, validatePassword };