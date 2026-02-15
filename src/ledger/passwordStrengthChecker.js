function validatePassword(password, options = {}) {
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
            errors.push("Password must contain at least one special character");
        }
    }
    
    const score = calculateStrengthScore(password, config);
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        score: score,
        strength: getStrengthLabel(score)
    };
}

function calculateStrengthScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score += 1;
    if (password.length >= 12) score += 1;
    
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score += 1;
    
    if (password.length >= 16) score += 1;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score += 1;
    
    return Math.min(score, 10);
}

function getStrengthLabel(score) {
    if (score <= 3) return "Weak";
    if (score <= 6) return "Moderate";
    if (score <= 8) return "Strong";
    return "Very Strong";
}

export { validatePassword, calculateStrengthScore, getStrengthLabel };function calculatePasswordEntropy(password) {
    if (!password || password.length === 0) return 0;
    
    let poolSize = 0;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasDigits) poolSize += 10;
    if (hasSpecial) poolSize += 32;
    
    if (poolSize === 0) return 0;
    
    const entropy = Math.log2(Math.pow(poolSize, password.length));
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
    
    return {
        entropy: calculatePasswordEntropy(password),
        strength: strength.strength,
        score: strength.score,
        requirements: requirements,
        isValid: Object.values(requirements).every(req => req === true)
    };
}

export { calculatePasswordEntropy, evaluatePasswordStrength, validatePassword };function passwordStrengthChecker(password, options = {}) {
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
    
    if (errors.length === 0) {
        if (password.length < 12) {
            suggestions.push("Consider using a longer password (12+ characters)");
        }
        
        if (/(.)\1{2,}/.test(password)) {
            suggestions.push("Avoid repeating characters multiple times in a row");
        }
        
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            suggestions.push("Add special characters to increase password strength");
        }
    }
    
    const score = Math.max(0, 100 - (errors.length * 20));
    
    return {
        isValid: errors.length === 0,
        score: score,
        errors: errors,
        suggestions: suggestions,
        meetsRequirements: {
            length: password.length >= config.minLength,
            hasUppercase: config.requireUppercase ? /[A-Z]/.test(password) : true,
            hasLowercase: config.requireLowercase ? /[a-z]/.test(password) : true,
            hasNumbers: config.requireNumbers ? /\d/.test(password) : true,
            hasSpecialChars: config.requireSpecialChars ? new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`).test(password) : true
        }
    };
}

module.exports = passwordStrengthChecker;