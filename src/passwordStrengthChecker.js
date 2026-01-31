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
    
    if (entropy < 40) return { strength: 'Weak', score: 1 };
    if (entropy < 60) return { strength: 'Moderate', score: 2 };
    if (entropy < 80) return { strength: 'Strong', score: 3 };
    return { strength: 'Very Strong', score: 4 };
}

function validatePassword(password) {
    const strength = evaluatePasswordStrength(password);
    const requirements = {
        minLength: password.length >= 8,
        hasLower: /[a-z]/.test(password),
        hasUpper: /[A-Z]/.test(password),
        hasDigit: /\d/.test(password),
        hasSpecial: /[^a-zA-Z0-9]/.test(password)
    };
    
    const passedRequirements = Object.values(requirements).filter(Boolean).length;
    const totalRequirements = Object.keys(requirements).length;
    
    return {
        entropy: calculatePasswordEntropy(password),
        strength: strength.strength,
        score: strength.score,
        requirements: requirements,
        compliance: Math.round((passedRequirements / totalRequirements) * 100)
    };
}

module.exports = { calculatePasswordEntropy, evaluatePasswordStrength, validatePassword };