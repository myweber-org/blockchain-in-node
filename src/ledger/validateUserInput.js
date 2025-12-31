function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    if (!usernameValid && !passwordValid) {
        return 'Invalid username and password format';
    } else if (!usernameValid) {
        return 'Invalid username format';
    } else if (!passwordValid) {
        return 'Invalid password format';
    } else {
        return 'Valid input';
    }
}

export { validateUserInput, validateUsername, validatePassword };function validateUserInput(input, type) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (type === 'username') {
    return usernameRegex.test(input);
  } else if (type === 'email') {
    return emailRegex.test(input);
  }
  
  return false;
}

module.exports = validateUserInput;