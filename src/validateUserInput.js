function validateUserInput(username, password) {
  const errors = [];

  if (!username || username.trim().length === 0) {
    errors.push("Username cannot be empty");
  }

  if (username && username.length < 3) {
    errors.push("Username must be at least 3 characters long");
  }

  if (!password || password.trim().length === 0) {
    errors.push("Password cannot be empty");
  }

  if (password && password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (password && !(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
    errors.push("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        throw new Error('Invalid username format');
    }

    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }

    return true;
}