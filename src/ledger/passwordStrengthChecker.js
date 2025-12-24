function checkPasswordStrength(password, options = {}) {
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
    const suggestions = [];
    
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
        const specialRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialRegex.test(password)) {
            errors.push(`Password must contain at least one special character (${config.specialChars})`);
        }
    }
    
    if (errors.length === 0) {
        if (password.length < 12) {
            suggestions.push('Consider using a longer password for better security');
        }
        
        if (!/(.)\1{2,}/.test(password)) {
            suggestions.push('Avoid repeating characters multiple times');
        }
        
        const commonPatterns = ['123', 'abc', 'qwerty', 'password'];
        if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
            suggestions.push('Avoid common patterns and dictionary words');
        }
    }
    
    const score = Math.max(0, 100 - (errors.length * 20));
    const strength = score >= 80 ? 'strong' : score >= 60 ? 'moderate' : 'weak';
    
    return {
        isValid: errors.length === 0,
        score,
        strength,
        errors,
        suggestions
    };
}

function generateStrongPassword(length = 16) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    
    const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];
    
    password += getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    password += getRandomChar('abcdefghijklmnopqrstuvwxyz');
    password += getRandomChar('0123456789');
    password += getRandomChar('!@#$%^&*()_+-=[]{}|;:,.<>?');
    
    for (let i = 4; i < length; i++) {
        password += getRandomChar(charset);
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

export { checkPasswordStrength, generateStrongPassword };function checkPasswordStrength(password, options = {}) {
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
    
    const strengthScore = 100 - (errors.length * 15);
    const strengthLevel = strengthScore >= 80 ? "strong" : 
                         strengthScore >= 60 ? "moderate" : 
                         strengthScore >= 40 ? "weak" : "very weak";
    
    if (strengthScore < 80) {
        suggestions.push("Consider using a longer password with mixed character types");
        suggestions.push("Avoid common words or patterns");
        suggestions.push("Use a unique password for this service");
    }
    
    return {
        isValid: errors.length === 0,
        strengthScore: Math.max(0, Math.min(100, strengthScore)),
        strengthLevel: strengthLevel,
        errors: errors,
        suggestions: suggestions,
        passedChecks: {
            length: password.length >= config.minLength,
            hasUppercase: config.requireUppercase ? /[A-Z]/.test(password) : true,
            hasLowercase: config.requireLowercase ? /[a-z]/.test(password) : true,
            hasNumbers: config.requireNumbers ? /\d/.test(password) : true,
            hasSpecialChars: config.requireSpecialChars ? 
                new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`).test(password) : true
        }
    };
}

function generateStrongPassword(length = 12) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    const allChars = uppercase + lowercase + numbers + special;
    let password = "";
    
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];
    
    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

export { checkPasswordStrength, generateStrongPassword };