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
};