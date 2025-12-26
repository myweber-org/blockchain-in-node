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
            strength: strengthScore,
            scoreDescription: getStrengthDescription(strengthScore),
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
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score++;
    
    return Math.min(score, 5);
}

function getStrengthDescription(score) {
    const descriptions = [
        "Very Weak",
        "Weak",
        "Fair",
        "Good",
        "Strong",
        "Very Strong"
    ];
    return descriptions[score] || "Unknown";
}

export { checkPasswordStrength, calculateStrengthScore };function calculatePasswordEntropy(password) {
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

function evaluatePasswordStrength(password) {
    const entropy = calculatePasswordEntropy(password);
    
    if (password.length < 8) return 'Very Weak';
    if (entropy < 40) return 'Weak';
    if (entropy < 60) return 'Moderate';
    if (entropy < 80) return 'Strong';
    return 'Very Strong';
}

function validatePassword(password) {
    const strength = evaluatePasswordStrength(password);
    const entropy = calculatePasswordEntropy(password);
    
    return {
        password: password,
        length: password.length,
        entropy: entropy,
        strength: strength,
        timestamp: new Date().toISOString()
    };
}

export { validatePassword, calculatePasswordEntropy, evaluatePasswordStrength };