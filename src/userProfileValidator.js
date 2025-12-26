function validateUserProfile(user) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minAge = 13;
  const maxAge = 120;

  if (!user.email || !emailRegex.test(user.email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (typeof user.age !== 'number' || user.age < minAge || user.age > maxAge) {
    return { valid: false, error: `Age must be between ${minAge} and ${maxAge}` };
  }

  if (!user.username || user.username.trim().length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters' };
  }

  return { valid: true, message: 'User profile is valid' };
}function validateUserProfile(profile) {
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
}function validateUserProfile(profile) {
    const errors = [];

    if (!profile.username || profile.username.trim().length < 3) {
        errors.push("Username must be at least 3 characters long");
    }

    if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
        errors.push("Please provide a valid email address");
    }

    if (profile.age && (profile.age < 18 || profile.age > 120)) {
        errors.push("Age must be between 18 and 120");
    }

    if (profile.preferences) {
        if (!Array.isArray(profile.preferences)) {
            errors.push("Preferences must be an array");
        } else if (profile.preferences.length > 10) {
            errors.push("Cannot have more than 10 preferences");
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}function validateEmail(email) {
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
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

module.exports = validateProfileForm;function validateUserProfile(formData) {
    const errors = {};
    
    if (!formData.username || formData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (formData.age && (formData.age < 0 || formData.age > 150)) {
        errors.age = 'Age must be between 0 and 150';
    }
    
    if (formData.password) {
        if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            errors.password = 'Password must contain uppercase, lowercase and numbers';
        }
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}