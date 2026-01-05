function validateUserProfile(data) {
  const errors = {};
  
  if (!data.username || data.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please provide a valid email address';
  }
  
  if (data.age && (data.age < 0 || data.age > 120)) {
    errors.age = 'Age must be between 0 and 120';
  }
  
  if (data.website && !/^https?:\/\/.+/.test(data.website)) {
    errors.website = 'Website must start with http:// or https://';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

module.exports = { validateUserProfile };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUsername(username) {
    return username.length >= 3 && username.length <= 20;
}

function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

function validateProfileForm(userData) {
    const errors = {};
    
    if (!validateEmail(userData.email)) {
        errors.email = 'Invalid email format';
    }
    
    if (!validateUsername(userData.username)) {
        errors.username = 'Username must be between 3 and 20 characters';
    }
    
    if (!validatePassword(userData.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number and special character';
    }
    
    if (userData.age && (userData.age < 13 || userData.age > 120)) {
        errors.age = 'Age must be between 13 and 120';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export { validateProfileForm, validateEmail, validateUsername, validatePassword };