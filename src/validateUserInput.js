function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sanitizeInput(email));
}

function validatePassword(password) {
    const sanitizedPassword = sanitizeInput(password);
    return sanitizedPassword.length >= 8;
}

export { sanitizeInput, validateEmail, validatePassword };