function validatePassword(password, rules) {
    const errors = [];
    const results = { isValid: true, errors: errors };

    if (!rules) {
        rules = {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?"
        };
    }

    if (password.length < rules.minLength) {
        errors.push(`Password must be at least ${rules.minLength} characters long`);
    }

    if (rules.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    if (rules.requireLowercase && !/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }

    if (rules.requireNumbers && !/\d/.test(password)) {
        errors.push("Password must contain at least one number");
    }

    if (rules.requireSpecialChars && rules.specialChars) {
        const specialCharsRegex = new RegExp(`[${rules.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialCharsRegex.test(password)) {
            errors.push(`Password must contain at least one special character from: ${rules.specialChars}`);
        }
    }

    if (errors.length > 0) {
        results.isValid = false;
    }

    return results;
}

function checkCommonPasswords(password, commonPasswords = []) {
    const defaultCommon = ["password", "123456", "qwerty", "letmein", "welcome"];
    const checkList = commonPasswords.length > 0 ? commonPasswords : defaultCommon;
    
    return !checkList.some(common => password.toLowerCase().includes(common.toLowerCase()));
}

export { validatePassword, checkCommonPasswords };