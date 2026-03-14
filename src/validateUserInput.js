function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUserInput(username, email) {
    const errors = [];
    
    if (!validateUsername(username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }
    
    if (!validateEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserInput, validateUsername, validateEmail };function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const errors = [];
    
    if (!usernameRegex.test(username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores.');
    }
    
    if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address.');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}function validateUserInput(input, type) {
    if (typeof input !== 'string') {
        return { isValid: false, error: 'Input must be a string' };
    }

    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
        return { isValid: false, error: 'Input cannot be empty' };
    }

    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmedInput)) {
                return { isValid: false, error: 'Invalid email format' };
            }
            break;
        case 'username':
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            if (!usernameRegex.test(trimmedInput)) {
                return { isValid: false, error: 'Username must be 3-20 characters and contain only letters, numbers, and underscores' };
            }
            break;
        case 'password':
            if (trimmedInput.length < 8) {
                return { isValid: false, error: 'Password must be at least 8 characters long' };
            }
            break;
        default:
            return { isValid: false, error: 'Unknown validation type' };
    }

    return { isValid: true, value: trimmedInput };
}