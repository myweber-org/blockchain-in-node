function validateUserInput(username, password) {
    const errors = [];
    
    if (!username || username.trim().length === 0) {
        errors.push("Username cannot be empty");
    } else if (username.length < 3) {
        errors.push("Username must be at least 3 characters long");
    } else if (username.length > 20) {
        errors.push("Username cannot exceed 20 characters");
    }
    
    if (!password || password.trim().length === 0) {
        errors.push("Password cannot be empty");
    } else if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    } else if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    } else if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    if (!usernameValid && !passwordValid) {
        return 'Invalid username and password';
    } else if (!usernameValid) {
        return 'Invalid username';
    } else if (!passwordValid) {
        return 'Invalid password';
    }
    return 'Valid input';
}

module.exports = { validateUserInput, validateUsername, validatePassword };