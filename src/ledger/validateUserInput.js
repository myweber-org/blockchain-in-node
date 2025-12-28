function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    return input
        .replace(/[&<>"']/g, function(match) {
            const escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;'
            };
            return escapeMap[match] || match;
        })
        .trim()
        .substring(0, 255);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sanitizeInput(email));
}

function validatePassword(password) {
    const sanitizedPassword = sanitizeInput(password);
    return sanitizedPassword.length >= 8 && 
           /[A-Z]/.test(sanitizedPassword) && 
           /[a-z]/.test(sanitizedPassword) && 
           /\d/.test(sanitizedPassword);
}

module.exports = {
    sanitizeInput,
    validateEmail,
    validatePassword
};