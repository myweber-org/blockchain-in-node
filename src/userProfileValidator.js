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
}