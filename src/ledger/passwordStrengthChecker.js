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

module.exports = { calculatePasswordEntropy, evaluatePasswordStrength, validatePassword };function calculatePasswordEntropy(password) {
    const charSets = {
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[^a-zA-Z0-9]/.test(password)
    };
    
    let poolSize = 0;
    if (charSets.lowercase) poolSize += 26;
    if (charSets.uppercase) poolSize += 26;
    if (charSets.numbers) poolSize += 10;
    if (charSets.symbols) poolSize += 32;
    
    if (poolSize === 0) return 0;
    
    const entropy = Math.log2(Math.pow(poolSize, password.length));
    return Math.round(entropy * 100) / 100;
}

function checkPasswordStrength(password) {
    const entropy = calculatePasswordEntropy(password);
    
    if (entropy < 40) {
        return { strength: 'Weak', entropy, color: '#ff4444' };
    } else if (entropy < 70) {
        return { strength: 'Moderate', entropy, color: '#ffaa00' };
    } else if (entropy < 100) {
        return { strength: 'Strong', entropy, color: '#00cc66' };
    } else {
        return { strength: 'Very Strong', entropy, color: '#0066ff' };
    }
}

function validatePasswordRequirements(password) {
    const requirements = {
        minLength: password.length >= 8,
        hasLowercase: /[a-z]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSymbol: /[^a-zA-Z0-9]/.test(password)
    };
    
    const passed = Object.values(requirements).filter(Boolean).length;
    const total = Object.keys(requirements).length;
    
    return {
        requirements,
        score: Math.round((passed / total) * 100),
        passed: passed === total
    };
}

export { checkPasswordStrength, validatePasswordRequirements, calculatePasswordEntropy };function checkPasswordStrength(password, options = {}) {
    const defaults = {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };
    
    const config = { ...defaults, ...options };
    const errors = [];
    const suggestions = [];
    
    if (password.length < config.minLength) {
        errors.push(`Password must be at least ${config.minLength} characters long`);
    }
    
    if (config.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }
    
    if (config.requireLowercase && !/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }
    
    if (config.requireNumbers && !/\d/.test(password)) {
        errors.push("Password must contain at least one number");
    }
    
    if (config.requireSpecialChars) {
        const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialCharRegex.test(password)) {
            errors.push(`Password must contain at least one special character (${config.specialChars})`);
        }
    }
    
    const strengthScore = calculateStrengthScore(password, errors.length);
    
    if (strengthScore < 3) {
        suggestions.push("Consider using a longer password with mixed character types");
        suggestions.push("Avoid common words or patterns");
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        strengthScore,
        suggestions: errors.length === 0 ? suggestions : []
    };
}

function calculateStrengthScore(password, errorCount) {
    let score = 5 - errorCount;
    
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score += 1;
    
    return Math.max(1, Math.min(5, score));
}

export { checkPasswordStrength };