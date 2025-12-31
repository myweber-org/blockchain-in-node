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
                return { valid: false, error: 'Username must be 3-20 characters and contain only letters, numbers, and underscores' };
            }
            break;

        case 'password':
            if (trimmedInput.length < 8) {
                return { valid: false, error: 'Password must be at least 8 characters long' };
            }
            break;

        default:
            return { valid: false, error: 'Invalid validation type' };
    }

    return { valid: true, sanitized: trimmedInput };
}