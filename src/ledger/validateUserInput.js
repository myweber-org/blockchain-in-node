function validateUserInput(username, password) {
    const errors = [];

    if (!username || username.trim().length === 0) {
        errors.push('Username is required');
    } else if (username.length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    if (!password || password.trim().length === 0) {
        errors.push('Password is required');
    } else if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}