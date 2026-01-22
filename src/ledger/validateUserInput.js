function validateUserInput(input, type) {
    if (typeof input !== 'string') {
        return { valid: false, error: 'Input must be a string' };
    }

    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
        return { valid: false, error: 'Input cannot be empty' };
    }

    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmedInput)) {
                return { valid: false, error: 'Invalid email format' };
            }
            break;

        case 'username':
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            if (!usernameRegex.test(trimmedInput)) {
                return { valid: false, error: 'Username must be 3-20 alphanumeric characters or underscores' };
            }
            break;

        case 'password':
            if (trimmedInput.length < 8) {
                return { valid: false, error: 'Password must be at least 8 characters long' };
            }
            if (!/[A-Z]/.test(trimmedInput) || !/[a-z]/.test(trimmedInput) || !/[0-9]/.test(trimmedInput)) {
                return { valid: false, error: 'Password must contain uppercase, lowercase, and numbers' };
            }
            break;

        default:
            return { valid: false, error: 'Invalid validation type' };
    }

    return { valid: true, sanitized: trimmedInput };
}function validateUsername(username) {
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

export { validateUsername, validateEmail, validateUserInput };function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!usernameRegex.test(username)) {
        throw new Error('Invalid username format');
    }
    
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }
    
    return { username, email };
}function validateUserInput(username, email) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        return {
            valid: false,
            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores."
        };
    }

    if (!emailRegex.test(email)) {
        return {
            valid: false,
            message: "Please provide a valid email address."
        };
    }

    return {
        valid: true,
        message: "Input validation successful."
    };
}function validateUserInput(username, email) {
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
}function validateUserInput(username, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: "Username must be 3-20 characters long and contain only letters, numbers, and underscores."
        };
    }

    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters long and contain at least one letter and one number."
        };
    }

    return {
        isValid: true,
        message: "Input validation passed."
    };
}