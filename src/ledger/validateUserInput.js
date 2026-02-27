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

module.exports = { validateUserInput, validateUsername, validatePassword };