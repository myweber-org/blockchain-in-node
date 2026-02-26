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
    
    const strengthScore = calculateStrengthScore(password, config);
    
    if (strengthScore < 2) {
        suggestions.push("Consider using a longer password with more character variety");
    }
    
    if (/(.)\1{2,}/.test(password)) {
        suggestions.push("Avoid repeating characters multiple times in sequence");
    }
    
    if (/\b(?:password|123456|admin|qwerty)\b/i.test(password)) {
        suggestions.push("Avoid using common weak passwords");
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        strengthScore,
        strengthLevel: getStrengthLevel(strengthScore),
        suggestions: suggestions.length > 0 ? suggestions : ["Password meets all security requirements"]
    };
}

function calculateStrengthScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score++;
    
    if (password.length >= 16) score++;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score++;
    
    return Math.min(score, 8);
}

function getStrengthLevel(score) {
    if (score >= 7) return "Very Strong";
    if (score >= 5) return "Strong";
    if (score >= 3) return "Moderate";
    return "Weak";
}

export { checkPasswordStrength };function checkPasswordStrength(password, options = {}) {
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
    
    if (password.length > 20) {
        suggestions.push("Consider using a shorter password for better memorability");
    }
    
    if (/(.)\1{2,}/.test(password)) {
        suggestions.push("Avoid repeating characters multiple times in a row");
    }
    
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{12,}$/.test(password)) {
        suggestions.push("Strong password! Consider using a password manager to store it securely");
    }
    
    const score = Math.max(0, 100 - (errors.length * 20));
    const strength = score >= 80 ? "strong" : score >= 60 ? "moderate" : "weak";
    
    return {
        isValid: errors.length === 0,
        score: score,
        strength: strength,
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

function generatePassword(length = 16, options = {}) {
    const defaults = {
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSpecialChars: true,
        specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };
    
    const config = { ...defaults, ...options };
    let charset = "";
    let password = "";
    
    if (config.includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (config.includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (config.includeNumbers) charset += "0123456789";
    if (config.includeSpecialChars) charset += config.specialChars;
    
    if (charset.length === 0) {
        throw new Error("At least one character set must be enabled");
    }
    
    const crypto = window.crypto || window.msCrypto;
    const randomValues = new Uint32Array(length);
    
    if (crypto && crypto.getRandomValues) {
        crypto.getRandomValues(randomValues);
        for (let i = 0; i < length; i++) {
            password += charset[randomValues[i] % charset.length];
        }
    } else {
        for (let i = 0; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }
    }
    
    return password;
}

export { checkPasswordStrength, generatePassword };function checkPasswordStrength(password, options = {}) {
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
  
  const strengthScore = calculateStrengthScore(password, config);
  const strengthLevel = getStrengthLevel(strengthScore);
  
  if (strengthScore < 60) {
    suggestions.push("Consider using a longer password with more character variety");
  }
  
  if (/(.)\1{2,}/.test(password)) {
    suggestions.push("Avoid repeating characters multiple times in sequence");
  }
  
  if (/^(password|123456|admin|qwerty)/i.test(password)) {
    suggestions.push("Avoid common weak passwords or patterns");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strengthScore,
    strengthLevel,
    suggestions
  };
}

function calculateStrengthScore(password, config) {
  let score = 0;
  
  score += Math.min(password.length * 4, 40);
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecial = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`).test(password);
  
  if (hasUppercase && hasLowercase) score += 15;
  if (hasNumbers) score += 15;
  if (hasSpecial) score += 20;
  
  const uniqueChars = new Set(password).size;
  score += Math.min(uniqueChars * 2, 20);
  
  if (password.length > 12) score += 10;
  if (password.length > 16) score += 10;
  
  return Math.min(score, 100);
}

function getStrengthLevel(score) {
  if (score >= 80) return "strong";
  if (score >= 60) return "good";
  if (score >= 40) return "fair";
  return "weak";
}

export { checkPasswordStrength };function calculatePasswordEntropy(password) {
    const charsetSize = getCharsetSize(password);
    const length = password.length;
    return Math.log2(Math.pow(charsetSize, length));
}

function getCharsetSize(password) {
    let size = 0;
    if (/[a-z]/.test(password)) size += 26;
    if (/[A-Z]/.test(password)) size += 26;
    if (/[0-9]/.test(password)) size += 10;
    if (/[^a-zA-Z0-9]/.test(password)) size += 32;
    return size;
}

function evaluateStrength(entropy) {
    if (entropy < 40) return 'Weak';
    if (entropy < 80) return 'Moderate';
    if (entropy < 120) return 'Strong';
    return 'Very Strong';
}

function checkPasswordStrength(password) {
    const entropy = calculatePasswordEntropy(password);
    const strength = evaluateStrength(entropy);
    return {
        entropy: entropy.toFixed(2),
        strength: strength,
        recommendations: generateRecommendations(password, strength)
    };
}

function generateRecommendations(password, strength) {
    const recs = [];
    if (password.length < 12) recs.push('Increase length to at least 12 characters');
    if (!/[A-Z]/.test(password)) recs.push('Add uppercase letters');
    if (!/[0-9]/.test(password)) recs.push('Add numbers');
    if (!/[^a-zA-Z0-9]/.test(password)) recs.push('Add special characters');
    if (strength === 'Weak') recs.push('Consider using a passphrase');
    return recs;
}

export { checkPasswordStrength };function validatePassword(password, options = {}) {
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
        score: calculateStrengthScore(password, config)
    };
}

function calculateStrengthScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score += 25;
    if (password.length >= 12) score += 15;
    
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 20;
    
    if (/\d/.test(password)) score += 20;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score += 20;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score += 10;
    
    return Math.min(score, 100);
}

export { validatePassword, calculateStrengthScore };function checkPasswordStrength(password, options = {}) {
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
        suggestions: ["Try mixing different character types", "Use a longer password"]
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

function getStrengthLabel(score) {
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    return labels[score] || "Unknown";
}

export default checkPasswordStrength;