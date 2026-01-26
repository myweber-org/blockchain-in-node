function calculatePasswordEntropy(password) {
    if (!password || password.length === 0) return 0;
    
    let charsetSize = 0;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasDigits) charsetSize += 10;
    if (hasSpecial) charsetSize += 32;
    
    const entropy = Math.log2(Math.pow(charsetSize, password.length));
    return Math.round(entropy * 100) / 100;
}

function evaluatePasswordStrength(password) {
    const entropy = calculatePasswordEntropy(password);
    
    if (password.length < 8) return { strength: 'Weak', entropy, message: 'Password too short' };
    if (entropy < 40) return { strength: 'Weak', entropy, message: 'Insufficient complexity' };
    if (entropy < 60) return { strength: 'Moderate', entropy, message: 'Could be stronger' };
    if (entropy < 80) return { strength: 'Strong', entropy, message: 'Good password' };
    
    return { strength: 'Very Strong', entropy, message: 'Excellent password security' };
}

function validatePassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        return { valid: false, message: 'Passwords do not match' };
    }
    
    const strengthResult = evaluatePasswordStrength(password);
    const valid = strengthResult.strength !== 'Weak';
    
    return {
        valid,
        strength: strengthResult.strength,
        entropy: strengthResult.entropy,
        message: valid ? 'Password acceptable' : strengthResult.message
    };
}

module.exports = { calculatePasswordEntropy, evaluatePasswordStrength, validatePassword };