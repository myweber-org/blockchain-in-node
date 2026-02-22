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
        return { valid: false, message: 'Username and password are invalid' };
    }
    
    if (!usernameValid) {
        return { valid: false, message: 'Username is invalid' };
    }
    
    if (!passwordValid) {
        return { valid: false, message: 'Password is invalid' };
    }
    
    return { valid: true, message: 'Input is valid' };
}

module.exports = { validateUserInput, validateUsername, validatePassword };