function validateEmail(email) {
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

function validateUserInput(userData) {
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
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserInput, validateEmail, validatePassword, validateUsername };function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

function validateUserInput(userData) {
    const errors = [];
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
    }
    
    if (userData.username && userData.username.length < 3) {
        errors.push('Username must be at least 3 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateEmail, validatePassword, validateUserInput };function validateUserData(user) {
    const errors = [];

    if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.push('Invalid email format');
    }

    if (!user.password || user.password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }

    if (user.age !== undefined && (typeof user.age !== 'number' || user.age < 0 || user.age > 150)) {
        errors.push('Age must be a number between 0 and 150');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateUserData };function validateUserData(user) {
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
}function validateUserData(user) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];

    if (!user.name || user.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!emailRegex.test(user.email)) {
        errors.push('Invalid email format');
    }

    if (typeof user.age !== 'number' || user.age < 18 || user.age > 120) {
        errors.push('Age must be a number between 18 and 120');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = validateUserData;function validateUserData(user) {
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

  if (user.password && user.password === user.username) {
    errors.push('Password cannot be the same as username');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}