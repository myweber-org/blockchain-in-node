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

export { checkPasswordStrength };function passwordStrengthChecker(password, options = {}) {
    const defaultOptions = {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };
    
    const config = { ...defaultOptions, ...options };
    const feedback = [];
    let score = 0;
    
    if (password.length >= config.minLength) {
        score += 1;
    } else {
        feedback.push(`Password must be at least ${config.minLength} characters long`);
    }
    
    if (config.requireUppercase && /[A-Z]/.test(password)) {
        score += 1;
    } else if (config.requireUppercase) {
        feedback.push("Password must contain at least one uppercase letter");
    }
    
    if (config.requireLowercase && /[a-z]/.test(password)) {
        score += 1;
    } else if (config.requireLowercase) {
        feedback.push("Password must contain at least one lowercase letter");
    }
    
    if (config.requireNumbers && /\d/.test(password)) {
        score += 1;
    } else if (config.requireNumbers) {
        feedback.push("Password must contain at least one number");
    }
    
    if (config.requireSpecialChars) {
        const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (specialCharRegex.test(password)) {
            score += 1;
        } else {
            feedback.push(`Password must contain at least one special character (${config.specialChars})`);
        }
    }
    
    const strengthLevels = {
        0: "Very Weak",
        1: "Weak",
        2: "Fair",
        3: "Good",
        4: "Strong",
        5: "Very Strong"
    };
    
    return {
        score: score,
        maxScore: Object.keys(strengthLevels).length - 1,
        strength: strengthLevels[Math.min(score, 5)],
        isValid: feedback.length === 0,
        feedback: feedback
    };
}

module.exports = passwordStrengthChecker;function checkPasswordStrength(password, options = {}) {
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
        if (strengthScore < 3) {
            suggestions.push("Consider adding more character variety to increase password strength");
        }
        if (password.length < 12) {
            suggestions.push("Consider using a longer password for better security");
        }
        if (/(.)\1{2,}/.test(password)) {
            suggestions.push("Avoid repeating characters consecutively");
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        suggestions,
        strength: errors.length === 0 ? calculateStrengthScore(password) : 0
    };
}

function calculateStrengthScore(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 16) score++;
    
    return Math.min(score, 5);
}

export { checkPasswordStrength, calculateStrengthScore };function checkPasswordStrength(password, options = {}) {
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
        
        if (strengthScore < 3) {
            suggestions.push("Consider adding more character variety");
        }
        if (password.length < 12) {
            suggestions.push("Consider using a longer password (12+ characters)");
        }
        if (/(.)\1{2,}/.test(password)) {
            suggestions.push("Avoid repeating characters multiple times");
        }
        
        return {
            valid: true,
            strength: getStrengthLabel(strengthScore),
            score: strengthScore,
            suggestions: suggestions
        };
    }
    
    return {
        valid: false,
        errors: errors,
        suggestions: ["Try mixing different character types", "Increase password length"]
    };
}

function calculateStrengthScore(password) {
    let score = 0;
    
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    if (password.length >= 16) score += 1;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.8) score += 1;
    
    return Math.min(score, 6);
}

function getStrengthLabel(score) {
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    return labels[Math.min(score, labels.length - 1)];
}

export { checkPasswordStrength, calculateStrengthScore };function calculatePasswordStrength(password, options = {}) {
    const defaults = {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };
    
    const config = { ...defaults, ...options };
    let score = 0;
    const feedback = [];
    
    if (!password || password.length < config.minLength) {
        feedback.push(`Password must be at least ${config.minLength} characters`);
        return { score: 0, strength: 'Weak', feedback };
    }
    
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    
    if (config.requireUppercase && /[A-Z]/.test(password)) {
        score += 1;
    } else if (config.requireUppercase) {
        feedback.push('Add uppercase letters');
    }
    
    if (config.requireLowercase && /[a-z]/.test(password)) {
        score += 1;
    } else if (config.requireLowercase) {
        feedback.push('Add lowercase letters');
    }
    
    if (config.requireNumbers && /\d/.test(password)) {
        score += 1;
    } else if (config.requireNumbers) {
        feedback.push('Add numbers');
    }
    
    const specialRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (config.requireSpecialChars && specialRegex.test(password)) {
        score += 1;
    } else if (config.requireSpecialChars) {
        feedback.push('Add special characters');
    }
    
    if (/^(.)\1+$/.test(password)) {
        score = Math.max(0, score - 2);
        feedback.push('Avoid repeating characters');
    }
    
    let strength;
    if (score >= 5) strength = 'Strong';
    else if (score >= 3) strength = 'Medium';
    else strength = 'Weak';
    
    return { score, strength, feedback };
}

function validatePassword(password, options = {}) {
    const result = calculatePasswordStrength(password, options);
    return {
        isValid: result.strength === 'Strong',
        ...result
    };
}

export { calculatePasswordStrength, validatePassword };