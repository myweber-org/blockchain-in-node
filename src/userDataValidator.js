function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}

function validateUserData(userData) {
    const errors = [];

    if (!userData.name || sanitizeInput(userData.name).length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }

    if (userData.password && userData.password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: {
            name: sanitizeInput(userData.name || ''),
            email: sanitizeInput(userData.email || '')
        }
    };
}

module.exports = { validateUserData, validateEmail, sanitizeInput };