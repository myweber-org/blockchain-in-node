function validatePassword(password, rules) {
    const results = {
        isValid: true,
        errors: [],
        score: 0
    };

    if (!rules) {
        rules = {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?"
        };
    }

    if (password.length < rules.minLength) {
        results.isValid = false;
        results.errors.push(`Password must be at least ${rules.minLength} characters long`);
    }

    if (rules.requireUppercase && !/[A-Z]/.test(password)) {
        results.isValid = false;
        results.errors.push("Password must contain at least one uppercase letter");
    } else if (rules.requireUppercase) {
        results.score += 20;
    }

    if (rules.requireLowercase && !/[a-z]/.test(password)) {
        results.isValid = false;
        results.errors.push("Password must contain at least one lowercase letter");
    } else if (rules.requireLowercase) {
        results.score += 20;
    }

    if (rules.requireNumbers && !/\d/.test(password)) {
        results.isValid = false;
        results.errors.push("Password must contain at least one number");
    } else if (rules.requireNumbers) {
        results.score += 20;
    }

    if (rules.requireSpecialChars) {
        const specialCharRegex = new RegExp(`[${rules.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialCharRegex.test(password)) {
            results.isValid = false;
            results.errors.push("Password must contain at least one special character");
        } else {
            results.score += 20;
        }
    }

    if (password.length >= 12) results.score += 10;
    if (password.length >= 16) results.score += 10;

    results.score = Math.min(results.score, 100);

    return results;
}

function generatePassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let password = "";
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    return password;
}

export { validatePassword, generatePassword };function validatePassword(password, options = {}) {
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
    
    const uniqueChars = new Set(password).size;
    score += Math.min(10, uniqueChars / password.length * 20);
    
    return Math.min(100, score);
}

export { validatePassword, calculatePasswordScore };function validatePassword(password, options = {}) {
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
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score += 20;
    
    if (/(.)\1{2,}/.test(password)) score -= 15;
    
    if (/(012|123|234|345|456|567|678|789)/.test(password)) score -= 10;
    
    return Math.min(Math.max(score, 0), 100);
}

export { validatePassword, calculatePasswordScore };