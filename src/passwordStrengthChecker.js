function validatePassword(password, options = {}) {
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
    const specialRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (!specialRegex.test(password)) {
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
  
  if (password.length >= config.minLength) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  
  const specialRegex = new RegExp(`[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
  if (specialRegex.test(password)) score += 1;
  
  if (password.length >= 16) score += 1;
  
  const uniqueChars = new Set(password).size;
  if (uniqueChars / password.length > 0.7) score += 1;
  
  return Math.min(score, 10);
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
    
    const strengthScore = Math.max(0, 100 - (errors.length * 20));
    let strengthLevel = "weak";
    
    if (strengthScore >= 80) strengthLevel = "strong";
    else if (strengthScore >= 60) strengthLevel = "medium";
    
    return {
        isValid: errors.length === 0,
        strengthScore,
        strengthLevel,
        errors,
        suggestions: errors.length > 0 ? [
            "Use a longer password",
            "Mix uppercase and lowercase letters",
            "Include numbers and special characters",
            "Avoid common words and patterns"
        ] : []
    };
}

function validatePasswordOnInput(inputElement, options) {
    const result = checkPasswordStrength(inputElement.value, options);
    const feedbackElement = document.getElementById(inputElement.id + '-feedback');
    
    if (feedbackElement) {
        if (result.isValid) {
            feedbackElement.textContent = `Password strength: ${result.strengthLevel}`;
            feedbackElement.className = 'password-feedback valid';
        } else {
            feedbackElement.textContent = result.errors.join('. ');
            feedbackElement.className = 'password-feedback invalid';
        }
    }
    
    return result;
}

export { checkPasswordStrength, validatePasswordOnInput };