function validateUserProfile(profile) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  
  const errors = [];
  
  if (!profile.email || !emailRegex.test(profile.email)) {
    errors.push('Invalid email format');
  }
  
  if (!profile.phone || !phoneRegex.test(profile.phone)) {
    errors.push('Invalid phone number format');
  }
  
  if (!profile.name || profile.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (profile.age && (profile.age < 0 || profile.age > 150)) {
    errors.push('Age must be between 0 and 150');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

module.exports = validateUserProfile;