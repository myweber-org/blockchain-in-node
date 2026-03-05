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
    
    if (/(.)\1{2,}/.test(password)) {
      suggestions.push("Avoid repeating characters multiple times");
    }
    
    if (/^[a-zA-Z]+$/.test(password)) {
      suggestions.push("Add numbers or special characters for better security");
    }
    
    if (password.length < 12) {
      suggestions.push("Consider using a longer password (12+ characters)");
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
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  const uniqueChars = new Set(password).size;
  if (uniqueChars / password.length > 0.7) score += 1;
  
  return Math.min(score, 6);
}

function getStrengthLabel(score) {
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  return labels[Math.min(score, labels.length - 1)];
}

export { checkPasswordStrength, calculateStrengthScore };