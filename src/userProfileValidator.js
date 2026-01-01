function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateAge(age) {
    return Number.isInteger(age) && age >= 18 && age <= 120;
}

function validateUsername(username) {
    return username.length >= 3 && username.length <= 30 && /^[a-zA-Z0-9_]+$/.test(username);
}

function validateProfile(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validateAge(userData.age)) {
        errors.push('Age must be between 18 and 120');
    }
    
    if (!validateUsername(userData.username)) {
        errors.push('Username must be 3-30 characters and contain only letters, numbers, and underscores');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateProfile, validateEmail, validateAge, validateUsername };