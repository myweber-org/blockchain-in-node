function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long" };
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasUpperCase) {
        return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    
    if (!hasLowerCase) {
        return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    
    if (!hasNumbers) {
        return { valid: false, message: "Password must contain at least one number" };
    }
    
    if (!hasSpecialChar) {
        return { valid: false, message: "Password must contain at least one special character" };
    }
    
    return { valid: true, message: "Password is strong" };
}

function validateUserData(userData) {
    const errors = [];
    
    if (!userData.email || !validateEmail(userData.email)) {
        errors.push("Invalid email format");
    }
    
    if (userData.password) {
        const passwordValidation = validatePassword(userData.password);
        if (!passwordValidation.valid) {
            errors.push(passwordValidation.message);
        }
    }
    
    if (userData.username && userData.username.length < 3) {
        errors.push("Username must be at least 3 characters long");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateEmail, validatePassword, validateUserData };function validateUserData(user) {
  const errors = [];

  if (!user.username || user.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!user.password || user.password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (user.password !== user.confirmPassword) {
    errors.push('Passwords do not match');
  }

  if (user.age && (user.age < 18 || user.age > 120)) {
    errors.push('Age must be between 18 and 120');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}