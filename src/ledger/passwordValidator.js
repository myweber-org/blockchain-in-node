function validatePassword(password, rules) {
    const result = {
        isValid: true,
        errors: []
    };

    if (!password || typeof password !== 'string') {
        result.isValid = false;
        result.errors.push('Password must be a non-empty string');
        return result;
    }

    if (rules.minLength && password.length < rules.minLength) {
        result.isValid = false;
        result.errors.push(`Password must be at least ${rules.minLength} characters long`);
    }

    if (rules.requireUppercase && !/[A-Z]/.test(password)) {
        result.isValid = false;
        result.errors.push('Password must contain at least one uppercase letter');
    }

    if (rules.requireLowercase && !/[a-z]/.test(password)) {
        result.isValid = false;
        result.errors.push('Password must contain at least one lowercase letter');
    }

    if (rules.requireNumbers && !/\d/.test(password)) {
        result.isValid = false;
        result.errors.push('Password must contain at least one number');
    }

    if (rules.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        result.isValid = false;
        result.errors.push('Password must contain at least one special character');
    }

    if (rules.maxRepeatingChars) {
        const repeatingRegex = new RegExp(`(.)\\1{${rules.maxRepeatingChars},}`);
        if (repeatingRegex.test(password)) {
            result.isValid = false;
            result.errors.push(`Password cannot contain more than ${rules.maxRepeatingChars} repeating characters in a row`);
        }
    }

    if (rules.forbiddenSequences) {
        rules.forbiddenSequences.forEach(sequence => {
            if (password.includes(sequence)) {
                result.isValid = false;
                result.errors.push(`Password cannot contain the sequence: ${sequence}`);
            }
        });
    }

    return result;
}

export { validatePassword };