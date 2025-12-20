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

module.exports = validateUserProfile;