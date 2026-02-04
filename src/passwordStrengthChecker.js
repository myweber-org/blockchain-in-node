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
  
  const strengthScore = 100 - (errors.length * 20);
  const strengthLevel = strengthScore >= 80 ? "strong" : 
                       strengthScore >= 60 ? "moderate" : 
                       strengthScore >= 40 ? "weak" : "very weak";
  
  if (strengthScore < 80) {
    suggestions.push("Consider making your password longer");
    suggestions.push("Use a mix of character types");
    suggestions.push("Avoid common words and patterns");
  }
  
  return {
    isValid: errors.length === 0,
    strengthScore,
    strengthLevel,
    errors,
    suggestions
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

export { checkPasswordStrength, generateStrongPassword };function checkPasswordStrength(password, rules) {
    const defaultRules = {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };

    const activeRules = { ...defaultRules, ...rules };
    const errors = [];
    const suggestions = [];

    if (password.length < activeRules.minLength) {
        errors.push(`Password must be at least ${activeRules.minLength} characters long`);
    }

    if (activeRules.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    if (activeRules.requireLowercase && !/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }

    if (activeRules.requireNumbers && !/\d/.test(password)) {
        errors.push("Password must contain at least one number");
    }

    if (activeRules.requireSpecialChars) {
        const specialCharRegex = new RegExp(`[${activeRules.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialCharRegex.test(password)) {
            errors.push(`Password must contain at least one special character from: ${activeRules.specialChars}`);
        }
    }

    if (password.length > 20) {
        suggestions.push("Consider using a shorter password for better memorability");
    }

    if (!errors.length) {
        const strengthScore = calculateStrengthScore(password);
        return {
            valid: true,
            strength: strengthScore,
            level: getStrengthLevel(strengthScore),
            suggestions: suggestions
        };
    }

    return {
        valid: false,
        errors: errors,
        suggestions: suggestions
    };
}

function calculateStrengthScore(password) {
    let score = 0;
    score += Math.min(password.length * 4, 40);
    
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/\d/.test(password)) score += 10;
    if (/[^a-zA-Z0-9]/.test(password)) score += 15;
    
    const uniqueChars = new Set(password).size;
    score += Math.min(uniqueChars * 2, 20);
    
    return Math.min(score, 100);
}

function getStrengthLevel(score) {
    if (score >= 80) return "very-strong";
    if (score >= 60) return "strong";
    if (score >= 40) return "moderate";
    if (score >= 20) return "weak";
    return "very-weak";
}

module.exports = { checkPasswordStrength };