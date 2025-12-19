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

export { checkPasswordStrength, generateStrongPassword };