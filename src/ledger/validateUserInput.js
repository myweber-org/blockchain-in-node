function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateUserInput(username, password) {
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    
    if (!isUsernameValid) {
        return {
            isValid: false,
            message: "Username must be 3-20 characters long and contain only letters, numbers, and underscores."
        };
    }
    
    if (!isPasswordValid) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        };
    }
    
    return {
        isValid: true,
        message: "User input is valid."
    };
}

export { validateUserInput, validateUsername, validatePassword };