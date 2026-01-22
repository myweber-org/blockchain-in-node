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
        const specialRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialRegex.test(password)) {
            errors.push(`Password must contain at least one special character (${config.specialChars})`);
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
    
    // Length contributes up to 40 points
    score += Math.min(password.length * 2, 40);
    
    // Character variety contributes up to 60 points
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const specialRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    const hasSpecial = specialRegex.test(password);
    
    const varietyCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    score += varietyCount * 15;
    
    // Bonus for mixed patterns
    if (hasUpper && hasLower && hasNumber && hasSpecial) {
        score += 10;
    }
    
    // Penalty for common patterns
    if (/password|123456|qwerty/i.test(password)) {
        score = Math.max(0, score - 30);
    }
    
    return Math.min(100, Math.max(0, score));
}

export { validatePassword, calculateStrengthScore };function validatePassword(password, options = {}) {
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
    
    // Length contributes up to 40 points
    score += Math.min(password.length * 2, 40);
    
    // Character variety contributes up to 60 points
    if (/[A-Z]/.test(password)) score += 10;
    if (/[a-z]/.test(password)) score += 10;
    if (/\d/.test(password)) score += 10;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score += 10;
    
    // Bonus for mixed patterns
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 10;
    if (/\d/.test(password) && /[A-Za-z]/.test(password)) score += 10;
    
    return Math.min(score, 100);
}

export { validatePassword, calculatePasswordScore };function checkPasswordStrength(password, options = {}) {
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
            errors.push("Password must contain at least one special character");
        }
    }
    
    const strengthScore = calculateStrengthScore(password, config);
    
    if (strengthScore < 3) {
        suggestions.push("Consider using a longer password with more character variety");
    }
    
    if (/(.)\1{2,}/.test(password)) {
        suggestions.push("Avoid repeating characters multiple times in sequence");
    }
    
    if (/^\d+$/.test(password)) {
        suggestions.push("Avoid using only numbers in your password");
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        suggestions,
        strengthScore,
        strengthLevel: getStrengthLevel(strengthScore)
    };
}

function calculateStrengthScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score += 1;
    if (password.length >= config.minLength * 1.5) score += 1;
    
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score += 1;
    
    const uniqueChars = new Set(password).size;
    if (uniqueChars / password.length > 0.7) score += 1;
    
    return Math.min(score, 6);
}

function getStrengthLevel(score) {
    if (score <= 2) return "Weak";
    if (score <= 4) return "Moderate";
    return "Strong";
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
        score: calculatePasswordScore(password, config)
    };
}

function calculatePasswordScore(password, config) {
    let score = 0;
    
    if (password.length >= config.minLength) score += 25;
    if (password.length >= 12) score += 15;
    
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    
    const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialCharRegex.test(password)) score += 20;
    
    if (/(.)\1{2,}/.test(password)) score -= 10;
    
    if (/(123|abc|qwerty|password)/i.test(password)) score -= 30;
    
    return Math.max(0, Math.min(100, score));
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
        const specialRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialRegex.test(password)) {
            errors.push(`Password must contain at least one special character (${config.specialChars})`);
        }
    }
    
    const score = Math.max(0, 100 - (errors.length * 20));
    const strength = score >= 80 ? "strong" : score >= 60 ? "medium" : "weak";
    
    return {
        isValid: errors.length === 0,
        score,
        strength,
        errors
    };
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

export { validatePassword, generatePassword };function checkPasswordStrength(password, options = {}) {
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
  
  if (strengthScore < 3) {
    suggestions.push("Consider using a longer password with more character variety");
  }
  
  if (/(.)\1{2,}/.test(password)) {
    suggestions.push("Avoid repeating characters multiple times in sequence");
  }
  
  if (/^(?:[0-9]+|[a-zA-Z]+)$/.test(password)) {
    suggestions.push("Mix letters, numbers, and special characters for better security");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    suggestions,
    strength: getStrengthLabel(strengthScore),
    score: strengthScore
  };
}

function calculateStrengthScore(password, config) {
  let score = 0;
  
  if (password.length >= config.minLength) score += 1;
  if (password.length >= 12) score += 1;
  
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  
  const specialCharRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
  if (specialCharRegex.test(password)) score += 1;
  
  if (password.length >= 16) score += 1;
  
  const uniqueChars = new Set(password).size;
  if (uniqueChars / password.length > 0.7) score += 1;
  
  return Math.min(score, 6);
}

function getStrengthLabel(score) {
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  return labels[Math.min(score, labels.length - 1)] || "Very Weak";
}

export { checkPasswordStrength, calculateStrengthScore, getStrengthLabel };