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
}