function checkPasswordStrength(password, options = {}) {
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
        const specialRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialRegex.test(password)) {
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
        strength: errors.length === 0 ? calculateStrengthLevel(password) : 'weak'
    };
}

function calculateStrengthScore(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length > 20) score++;
    return score;
}

function calculateStrengthLevel(password) {
    const score = calculateStrengthScore(password);
    if (score <= 3) return 'weak';
    if (score <= 5) return 'medium';
    return 'strong';
}

export { checkPasswordStrength };