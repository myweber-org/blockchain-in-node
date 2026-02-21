function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long" };
    }
    
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    
    if (!/\d/.test(password)) {
        return { valid: false, message: "Password must contain at least one number" };
    }
    
    return { valid: true, message: "Password is valid" };
}

function validateUserInput(email, password) {
    const validationResults = {
        emailValid: validateEmail(email),
        passwordValid: validatePassword(password),
        overallValid: false
    };
    
    validationResults.overallValid = validationResults.emailValid && validationResults.passwordValid.valid;
    
    return validationResults;
}

export { validateEmail, validatePassword, validateUserInput };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateUserData(userData) {
    const errors = {};
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase and number';
    }
    
    if (!validateUsername(userData.username)) {
        errors.username = 'Username must be 3-20 characters (letters, numbers, underscore)';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateUserData, validateEmail, validatePassword, validateUsername };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    return true;
}

function validateUserData(userData) {
    const errors = [];
    
    if (!userData.email || !validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!userData.password || !validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    if (userData.age && (userData.age < 0 || userData.age > 150)) {
        errors.push('Age must be between 0 and 150');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateUserData, validateEmail, validatePassword };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function validateUsername(username) {
    return username.length >= 3 && 
           username.length <= 20 && 
           /^[a-zA-Z0-9_]+$/.test(username);
}

function validateRegistrationForm(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    if (!validateUsername(userData.username)) {
        errors.push('Username must be 3-20 characters using only letters, numbers and underscores');
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateRegistrationForm };function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /\d/.test(password);
}

function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

function validateRegistrationForm(userData) {
  const errors = [];
  
  if (!validateUsername(userData.username)) {
    errors.push('Username must be 3-20 characters (letters, numbers, underscore)');
  }
  
  if (!validateEmail(userData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!validatePassword(userData.password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
  }
  
  if (userData.password !== userData.confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { validateRegistrationForm, validateEmail, validatePassword, validateUsername };function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /\d/.test(password);
}

function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

function validateRegistrationForm(userData) {
  const errors = [];
  
  if (!validateEmail(userData.email)) {
    errors.push('Invalid email format');
  }
  
  if (!validatePassword(userData.password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
  }
  
  if (!validateUsername(userData.username)) {
    errors.push('Username must be 3-20 characters (letters, numbers, underscores)');
  }
  
  if (userData.password !== userData.confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

module.exports = { validateRegistrationForm };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateUserInput(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePhoneNumber(userData.phone)) {
        errors.push('Invalid phone number format');
    }
    
    if (userData.username && userData.username.length < 3) {
        errors.push('Username must be at least 3 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserInput, validateEmail, validatePhoneNumber };