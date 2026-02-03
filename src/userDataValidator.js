function validateUserData(user) {
    const errors = [];

    if (!user.username || user.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.push('Please provide a valid email address');
    }

    if (!user.password || user.password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (user.password !== user.confirmPassword) {
        errors.push('Passwords do not match');
    }

    if (user.age && (user.age < 18 || user.age > 120)) {
        errors.push('Age must be between 18 and 120');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateRegistrationForm(userData) {
    const errors = [];
    
    if (!validateUsername(userData.username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }
    
    if (!validateEmail(userData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase, and a number');
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    return true;
}

function validateUserData(userData) {
    const errors = [];
    
    if (!userData.email || !validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    if (!userData.password || !validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase and number');
    }
    
    if (userData.age && (userData.age < 0 || userData.age > 150)) {
        errors.push('Age must be between 0 and 150');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateEmail, validatePassword, validateUserData };