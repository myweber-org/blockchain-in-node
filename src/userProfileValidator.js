function validateEmail(email) {
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

function validateProfileForm(formData) {
    const errors = {};
    
    if (!validateEmail(formData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validateUsername(formData.username)) {
        errors.username = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
    }
    
    if (formData.password && !validatePassword(formData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
    
    if (formData.age && (formData.age < 13 || formData.age > 120)) {
        errors.age = 'Age must be between 13 and 120';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateProfileForm, validateEmail, validateUsername, validatePassword };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateAge(age) {
    return Number.isInteger(age) && age >= 0 && age <= 120;
}

function validateProfile(profileData) {
    const errors = [];

    if (!validateEmail(profileData.email)) {
        errors.push('Invalid email format');
    }

    if (!validateAge(profileData.age)) {
        errors.push('Age must be between 0 and 120');
    }

    if (!profileData.username || profileData.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateProfile, validateEmail, validateAge };