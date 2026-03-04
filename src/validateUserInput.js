function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function validateUserInput(username, password) {
  const usernameValid = validateUsername(username);
  const passwordValid = validatePassword(password);
  
  if (!usernameValid && !passwordValid) {
    return 'Username and password are invalid';
  } else if (!usernameValid) {
    return 'Username is invalid';
  } else if (!passwordValid) {
    return 'Password is invalid';
  }
  
  return 'User input is valid';
}

module.exports = {
  validateUsername,
  validatePassword,
  validateUserInput
};function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores."
        };
    }

    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters with uppercase, lowercase, and a number."
        };
    }

    return {
        isValid: true,
        message: "Input validation passed."
    };
}