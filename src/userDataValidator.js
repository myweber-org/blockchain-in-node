function validateUserData(user) {
  const errors = {};

  if (!user.username || user.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }

  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!user.password || user.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (user.password !== user.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

module.exports = { validateUserData };