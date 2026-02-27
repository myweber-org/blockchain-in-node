function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(username, password) {
    if (!validateUsername(username)) {
        return { isValid: false, message: "Invalid username format. Must be 3-20 characters and contain only letters, numbers, and underscores." };
    }
    
    if (!validatePassword(password)) {
        return { isValid: false, message: "Invalid password format. Must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character." };
    }
    
    return { isValid: true, message: "Input validation successful." };
}

module.exports = { validateUserInput, validateUsername, validatePassword };function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateUserInput(username, email) {
  const errors = [];
  
  if (!validateUsername(username)) {
    errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
  }
  
  if (!validateEmail(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { validateUsername, validateEmail, validateUserInput };