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
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        score: calculatePasswordStrength(password)
    };
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score += 1;
    
    return Math.min(score, 7);
}

export { validatePassword, calculatePasswordStrength };function validatePassword(password, options = {}) {
    const defaults = {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    
    const config = { ...defaults, ...options };
    const errors = [];
    
    if (password.length < config.minLength) {
        errors.push(`Password must be at least ${config.minLength} characters long`);
    }
    
    if (config.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    
    if (config.requireLowercase && !/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    
    if (config.requireNumbers && !/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    
    if (config.requireSpecialChars) {
        const specialCharsRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialCharsRegex.test(password)) {
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
    
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    
    const specialCharsRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharsRegex.test(password)) score += 20;
    
    if (/(.)\1{2,}/.test(password)) score -= 10;
    
    if (/(012|123|234|345|456|567|678|789)/.test(password)) score -= 15;
    
    return Math.min(Math.max(score, 0), 100);
}

module.exports = { validatePassword, calculatePasswordScore };