function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

module.exports = {
    validateEmail,
    validatePassword,
    sanitizeInput
};function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateFormData(data) {
    const errors = [];
    
    if (data.email && !validateEmail(data.email)) {
        errors.push('Invalid email format');
    }
    
    if (data.phone && !validatePhone(data.phone)) {
        errors.push('Invalid phone number format');
    }
    
    if (data.requiredField && data.requiredField.trim() === '') {
        errors.push('Required field is empty');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateEmail, validatePhone, validateFormData };