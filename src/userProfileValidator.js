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

module.exports = { validateUserProfile };