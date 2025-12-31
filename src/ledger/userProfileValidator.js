function validateUserProfile(profile) {
  const errors = {};

  if (!profile.username || profile.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }

  if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (profile.age && (profile.age < 0 || profile.age > 120)) {
    errors.age = 'Age must be between 0 and 120';
  }

  if (profile.website && !/^https?:\/\/.+/.test(profile.website)) {
    errors.website = 'Website must start with http:// or https://';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

module.exports = validateUserProfile;function validateUserProfile(formData) {
    const errors = {};
    
    if (!formData.username || formData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Valid email is required';
    }
    
    if (formData.age && (formData.age < 0 || formData.age > 150)) {
        errors.age = 'Age must be between 0 and 150';
    }
    
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
        errors.website = 'Website must start with http:// or https://';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
}

function validateProfileData(userData) {
  const errors = {};
  
  if (!validateEmail(userData.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!validateUsername(userData.username)) {
    errors.username = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
  }
  
  if (!validatePassword(userData.password)) {
    errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
  }
  
  if (userData.age && (userData.age < 13 || userData.age > 120)) {
    errors.age = 'Age must be between 13 and 120';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

export { validateProfileData, validateEmail, validateUsername, validatePassword };