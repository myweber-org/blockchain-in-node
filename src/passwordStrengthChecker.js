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

export { validatePassword, calculatePasswordEntropy, evaluatePasswordStrength };function PasswordStrengthChecker(config = {}) {
  const defaultConfig = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    bannedWords: ["password", "admin", "123456", "qwerty"]
  };

  this.config = { ...defaultConfig, ...config };
  this.score = 0;
  this.maxScore = 100;
  this.feedback = [];

  this.calculateStrength = function(password) {
    if (typeof password !== 'string') {
      throw new Error('Password must be a string');
    }

    this.score = 0;
    this.feedback = [];

    if (password.length === 0) {
      return { score: 0, strength: 'Empty', feedback: this.feedback };
    }

    this._checkLength(password);
    this._checkCharacterVariety(password);
    this._checkPatterns(password);
    this._checkBannedWords(password);
    this._calculateEntropy(password);

    const strength = this._getStrengthLabel();
    
    return {
      score: Math.min(this.score, this.maxScore),
      strength: strength,
      feedback: this.feedback
    };
  };

  this._checkLength = function(password) {
    const length = password.length;
    if (length >= this.config.minLength) {
      this.score += Math.min(20, (length - this.config.minLength) * 2);
    } else {
      this.feedback.push(`Password should be at least ${this.config.minLength} characters long`);
    }
  };

  this._checkCharacterVariety = function(password) {
    let varietyScore = 0;
    
    if (this.config.requireUppercase && /[A-Z]/.test(password)) {
      varietyScore += 10;
    } else if (this.config.requireUppercase) {
      this.feedback.push('Add uppercase letters');
    }

    if (this.config.requireLowercase && /[a-z]/.test(password)) {
      varietyScore += 10;
    } else if (this.config.requireLowercase) {
      this.feedback.push('Add lowercase letters');
    }

    if (this.config.requireNumbers && /\d/.test(password)) {
      varietyScore += 10;
    } else if (this.config.requireNumbers) {
      this.feedback.push('Add numbers');
    }

    const specialRegex = new RegExp(`[${this.config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (this.config.requireSpecialChars && specialRegex.test(password)) {
      varietyScore += 10;
    } else if (this.config.requireSpecialChars) {
      this.feedback.push('Add special characters');
    }

    this.score += varietyScore;
  };

  this._checkPatterns = function(password) {
    const patterns = [
      /(.)\1{2,}/, // Repeated characters
      /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i, // Sequential letters
      /(012|123|234|345|456|567|678|789|890)/, // Sequential numbers
      /(qwerty|asdfgh|zxcvbn)/i // Keyboard patterns
    ];

    let penalty = 0;
    patterns.forEach(pattern => {
      if (pattern.test(password)) {
        penalty += 5;
        this.feedback.push('Avoid predictable patterns');
      }
    });

    this.score = Math.max(0, this.score - penalty);
  };

  this._checkBannedWords = function(password) {
    const lowerPassword = password.toLowerCase();
    this.config.bannedWords.forEach(word => {
      if (lowerPassword.includes(word)) {
        this.score = Math.max(0, this.score - 15);
        this.feedback.push(`Avoid common words like "${word}"`);
      }
    });
  };

  this._calculateEntropy = function(password) {
    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/\d/.test(password)) charsetSize += 10;
    
    const specialRegex = new RegExp(`[${this.config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (specialRegex.test(password)) charsetSize += this.config.specialChars.length;

    if (charsetSize > 0) {
      const entropy = Math.log2(Math.pow(charsetSize, password.length));
      this.score += Math.min(30, entropy / 4);
    }
  };

  this._getStrengthLabel = function() {
    const percentage = (this.score / this.maxScore) * 100;
    
    if (percentage < 40) return 'Weak';
    if (percentage < 70) return 'Moderate';
    if (percentage < 90) return 'Strong';
    return 'Very Strong';
  };

  this.validate = function(password, requiredStrength = 'Moderate') {
    const result = this.calculateStrength(password);
    const strengthOrder = { 'Weak': 0, 'Moderate': 1, 'Strong': 2, 'Very Strong': 3 };
    
    return {
      isValid: strengthOrder[result.strength] >= strengthOrder[requiredStrength],
      ...result
    };
  };
}

module.exports = PasswordStrengthChecker;