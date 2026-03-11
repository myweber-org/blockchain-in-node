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
    
    const score = Math.max(0, 100 - (errors.length * 20));
    const strength = score >= 80 ? "strong" : score >= 60 ? "medium" : "weak";
    
    return {
        isValid: errors.length === 0,
        score,
        strength,
        errors
    };
}

function validatePasswordOnInput(inputElement, options) {
    const result = checkPasswordStrength(inputElement.value, options);
    const feedbackElement = document.getElementById('passwordFeedback') || createFeedbackElement(inputElement);
    
    updateFeedback(feedbackElement, result);
    return result;
}

function createFeedbackElement(inputElement) {
    const feedback = document.createElement('div');
    feedback.id = 'passwordFeedback';
    feedback.className = 'password-feedback';
    inputElement.parentNode.insertBefore(feedback, inputElement.nextSibling);
    return feedback;
}

function updateFeedback(element, result) {
    element.innerHTML = '';
    element.className = 'password-feedback ' + result.strength;
    
    if (result.isValid) {
        element.textContent = `Password strength: ${result.strength} (${result.score}%)`;
        element.style.color = '#2ecc71';
    } else {
        const errorList = document.createElement('ul');
        result.errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });
        element.appendChild(errorList);
        element.style.color = '#e74c3c';
    }
}

export { checkPasswordStrength, validatePasswordOnInput };function calculatePasswordEntropy(password) {
    if (!password || password.length === 0) return 0;
    
    const charSets = {
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        digits: /\d/.test(password),
        special: /[^a-zA-Z0-9]/.test(password)
    };
    
    let poolSize = 0;
    if (charSets.lowercase) poolSize += 26;
    if (charSets.uppercase) poolSize += 26;
    if (charSets.digits) poolSize += 10;
    if (charSets.special) poolSize += 32;
    
    if (poolSize === 0) return 0;
    
    const entropy = Math.log2(Math.pow(poolSize, password.length));
    return Math.round(entropy * 100) / 100;
}

function evaluatePasswordStrength(password) {
    const entropy = calculatePasswordEntropy(password);
    
    if (entropy < 40) return 'Weak';
    if (entropy < 70) return 'Moderate';
    if (entropy < 100) return 'Strong';
    return 'Very Strong';
}

function validatePassword(password, minLength = 8) {
    const errors = [];
    
    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one digit');
    }
    
    if (!/[^a-zA-Z0-9]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    
    const strength = evaluatePasswordStrength(password);
    if (strength === 'Weak') {
        errors.push('Password is too weak');
    }
    
    return {
        isValid: errors.length === 0,
        strength: strength,
        entropy: calculatePasswordEntropy(password),
        errors: errors
    };
}

export { calculatePasswordEntropy, evaluatePasswordStrength, validatePassword };