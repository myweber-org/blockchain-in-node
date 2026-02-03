function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long" };
    }
    
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    
    if (!/\d/.test(password)) {
        return { valid: false, message: "Password must contain at least one number" };
    }
    
    return { valid: true, message: "Password is valid" };
}

function validateUserInput(email, password) {
    const validationResults = {
        emailValid: validateEmail(email),
        passwordValid: validatePassword(password),
        overallValid: false
    };
    
    validationResults.overallValid = validationResults.emailValid && validationResults.passwordValid.valid;
    
    return validationResults;
}

export { validateEmail, validatePassword, validateUserInput };