function validateEmail(email) {
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

function validateAge(age) {
    const parsedAge = parseInt(age);
    return !isNaN(parsedAge) && parsedAge >= 13 && parsedAge <= 120;
}

function validateProfileData(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validateUsername(userData.username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
    }
    
    if (!validateAge(userData.age)) {
        errors.push('Age must be between 13 and 120');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateProfileData, validateEmail, validateUsername, validatePassword, validateAge };function validateUserProfile(profile) {
  const errors = [];

  if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
    errors.push('Invalid email format');
  }

  if (typeof profile.age !== 'number' || profile.age < 18 || profile.age > 120) {
    errors.push('Age must be between 18 and 120');
  }

  if (!profile.username || profile.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}