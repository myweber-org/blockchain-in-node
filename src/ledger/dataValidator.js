function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[\+]?[1-9][\d]{0,15}$/;
    return regex.test(phone);
}

function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    return true;
}

module.exports = {
    validateEmail,
    validatePhone,
    sanitizeInput,
    validatePassword
};