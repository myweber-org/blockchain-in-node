function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
}

function validateUserRegistration(userData) {
    const errors = [];
    
    if (!userData.username || userData.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }
    
    if (!validateEmail(userData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!validatePassword(userData.password)) {
        errors.push('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters');
    }
    
    if (userData.password !== userData.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function formatRegistrationResponse(validationResult) {
    if (validationResult.isValid) {
        return {
            status: 'success',
            message: 'User registration data is valid',
            timestamp: new Date().toISOString()
        };
    } else {
        return {
            status: 'error',
            message: 'Validation failed',
            errors: validationResult.errors,
            timestamp: new Date().toISOString()
        };
    }
}

export { validateUserRegistration, formatRegistrationResponse };function validateRegistrationForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email format" };
    }
    
    if (!passwordRegex.test(password)) {
        return { valid: false, message: "Password must be at least 8 characters with letters and numbers" };
    }
    
    return { valid: true, message: "Registration data is valid" };
}const bcrypt = require('bcrypt');
const validator = require('validator');

class UserRegistration {
    constructor() {
        this.users = [];
    }

    async registerUser(email, password, username) {
        if (!validator.isEmail(email)) {
            throw new Error('Invalid email format');
        }

        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }

        if (this.users.find(user => user.email === email)) {
            throw new Error('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = {
            id: Date.now().toString(),
            email: email,
            username: username,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        return {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            createdAt: newUser.createdAt
        };
    }

    async verifyPassword(email, password) {
        const user = this.users.find(user => user.email === email);
        if (!user) {
            return false;
        }
        return await bcrypt.compare(password, user.password);
    }

    getUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }
}

module.exports = UserRegistration;