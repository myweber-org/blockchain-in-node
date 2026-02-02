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

module.exports = { calculatePasswordEntropy, evaluatePasswordStrength, validatePassword };function passwordStrengthChecker(password, options = {}) {
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
        const strengthScore = calculateStrengthScore(password);
        return {
            valid: true,
            strength: strengthScore,
            message: getStrengthMessage(strengthScore)
        };
    }
    
    return {
        valid: false,
        errors: errors,
        suggestions: generateSuggestions(password, config)
    };
}

function calculateStrengthScore(password) {
    let score = 0;
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.8) score += 1;
    
    return Math.min(score, 5);
}

function getStrengthMessage(score) {
    const messages = [
        "Very Weak",
        "Weak",
        "Fair",
        "Good",
        "Strong",
        "Very Strong"
    ];
    return messages[score];
}

function generateSuggestions(password, config) {
    const suggestions = [];
    
    if (password.length < config.minLength) {
        suggestions.push(`Add ${config.minLength - password.length} more characters`);
    }
    
    if (config.requireUppercase && !/[A-Z]/.test(password)) {
        suggestions.push("Include at least one uppercase letter (A-Z)");
    }
    
    if (config.requireLowercase && !/[a-z]/.test(password)) {
        suggestions.push("Include at least one lowercase letter (a-z)");
    }
    
    if (config.requireNumbers && !/\d/.test(password)) {
        suggestions.push("Include at least one number (0-9)");
    }
    
    if (config.requireSpecialChars && !new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`).test(password)) {
        suggestions.push(`Add a special character from: ${config.specialChars}`);
    }
    
    if (new Set(password).size < password.length * 0.6) {
        suggestions.push("Avoid repeating characters too frequently");
    }
    
    if (/(.)\1{2,}/.test(password)) {
        suggestions.push("Avoid sequences of three or more identical characters");
    }
    
    return suggestions;
}

export default passwordStrengthChecker;function validatePassword(password, options = {}) {
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
            errors.push(`Password must contain at least one special character (${config.specialChars})`);
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        score: calculatePasswordScore(password, config)
    };
}

function calculatePasswordScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score += 20;
    if (password.length >= 12) score += 10;
    
    if (/[A-Z]/.test(password)) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/\d/.test(password)) score += 15;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score += 15;
    
    if (/(.)\1{2,}/.test(password)) score -= 10;
    
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{12,}$/.test(password)) {
        score += 10;
    }
    
    return Math.min(Math.max(score, 0), 100);
}

function getStrengthLabel(score) {
    if (score >= 80) return "Very Strong";
    if (score >= 60) return "Strong";
    if (score >= 40) return "Good";
    if (score >= 20) return "Weak";
    return "Very Weak";
}

export { validatePassword, calculatePasswordScore, getStrengthLabel };