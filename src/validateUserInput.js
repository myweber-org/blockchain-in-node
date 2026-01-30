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
        throw new Error('Invalid username. Username must be 3-20 characters long and contain only letters, numbers, and underscores.');
    }
    
    if (!isPasswordValid) {
        throw new Error('Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    }
    
    return true;
}

module.exports = { validateUserInput, validateUsername, validatePassword };