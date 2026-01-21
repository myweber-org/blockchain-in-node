function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumber && 
           hasSpecialChar;
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);

    if (!usernameValid) {
        throw new Error('Invalid username. Username must be 3-20 characters long and contain only letters, numbers, and underscores.');
    }

    if (!passwordValid) {
        throw new Error('Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    }

    return true;
}

module.exports = { validateUserInput, validateUsername, validatePassword };