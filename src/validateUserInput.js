function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    if (!usernameValid && !passwordValid) {
        return { 
            valid: false, 
            message: "Username must be 3-20 alphanumeric characters and password must be at least 8 characters with uppercase, lowercase, number, and special character" 
        };
    }
    
    if (!usernameValid) {
        return { 
            valid: false, 
            message: "Username must be 3-20 alphanumeric characters" 
        };
    }
    
    if (!passwordValid) {
        return { 
            valid: false, 
            message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character" 
        };
    }
    
    return { 
        valid: true, 
        message: "Input validation successful" 
    };
}

module.exports = { validateUserInput, validateUsername, validatePassword };