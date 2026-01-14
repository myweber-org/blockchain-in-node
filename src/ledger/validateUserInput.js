function validateUsername(username) {
    const minLength = 3;
    const maxLength = 20;
    const regex = /^[a-zA-Z0-9_]+$/;
    
    if (typeof username !== 'string') return false;
    if (username.length < minLength || username.length > maxLength) return false;
    if (!regex.test(username)) return false;
    
    return true;
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    if (typeof password !== 'string') return false;
    if (password.length < minLength) return false;
    if (!hasUpperCase || !hasLowerCase) return false;
    if (!hasNumbers) return false;
    if (!hasSpecialChar) return false;
    
    return true;
}

function validateUserInput(username, password) {
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    
    return {
        isValid: usernameValid && passwordValid,
        usernameError: usernameValid ? null : 'Username must be 3-20 characters and contain only letters, numbers, and underscores',
        passwordError: passwordValid ? null : 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
    };
}

export { validateUsername, validatePassword, validateUserInput };