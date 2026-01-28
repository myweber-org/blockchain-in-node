function validatePassword(password, rules) {
    const results = {
        isValid: true,
        errors: [],
        score: 0
    };

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
        results.isValid = false;
        results.errors.push(`Password must be at least ${rules.minLength} characters long`);
    }

    if (rules.requireUppercase && !/[A-Z]/.test(password)) {
        results.isValid = false;
        results.errors.push("Password must contain at least one uppercase letter");
    } else if (rules.requireUppercase) {
        results.score += 20;
    }

    if (rules.requireLowercase && !/[a-z]/.test(password)) {
        results.isValid = false;
        results.errors.push("Password must contain at least one lowercase letter");
    } else if (rules.requireLowercase) {
        results.score += 20;
    }

    if (rules.requireNumbers && !/\d/.test(password)) {
        results.isValid = false;
        results.errors.push("Password must contain at least one number");
    } else if (rules.requireNumbers) {
        results.score += 20;
    }

    if (rules.requireSpecialChars) {
        const specialCharRegex = new RegExp(`[${rules.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
        if (!specialCharRegex.test(password)) {
            results.isValid = false;
            results.errors.push("Password must contain at least one special character");
        } else {
            results.score += 20;
        }
    }

    if (password.length >= 12) results.score += 10;
    if (password.length >= 16) results.score += 10;

    results.score = Math.min(results.score, 100);

    return results;
}

function generatePassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let password = "";
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    return password;
}

export { validatePassword, generatePassword };