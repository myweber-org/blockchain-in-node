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

module.exports = { validateProfileForm };function validateUserProfile(profile) {
    const errors = [];

    if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
        errors.push('Invalid email format');
    }

    if (typeof profile.age !== 'number' || profile.age < 18 || profile.age > 120) {
        errors.push('Age must be between 18 and 120');
    }

    if (!profile.username || profile.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}function validateUserProfile(profile) {
    const errors = [];

    if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
        errors.push('Invalid email format');
    }

    if (typeof profile.age !== 'number' || profile.age < 18 || profile.age > 120) {
        errors.push('Age must be between 18 and 120');
    }

    if (!profile.username || profile.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUsername(username) {
    return username.length >= 3 && username.length <= 20;
}

function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
    return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

function validateProfileForm(userData) {
    const errors = {};
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validateUsername(userData.username)) {
        errors.username = 'Username must be between 3 and 20 characters';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number and special character';
    }
    
    if (userData.age && (userData.age < 13 || userData.age > 120)) {
        errors.age = 'Age must be between 13 and 120';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateProfileForm, validateEmail, validateUsername, validatePassword };