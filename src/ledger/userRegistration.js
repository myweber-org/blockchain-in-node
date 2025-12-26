function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
}

function validateRegistrationForm(email, password, confirmPassword) {
    const errors = [];

    if (!validateEmail(email)) {
        errors.push('Invalid email format');
    }

    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters with one uppercase letter and one number');
    }

    if (password !== confirmPassword) {
        errors.push('Passwords do not match');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const validationResult = validateRegistrationForm(email, password, confirmPassword);
    
    if (validationResult.isValid) {
        console.log('Registration successful');
        return true;
    } else {
        console.log('Registration failed:', validationResult.errors);
        return false;
    }
}