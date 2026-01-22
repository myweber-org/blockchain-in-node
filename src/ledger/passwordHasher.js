const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

class PasswordHasher {
    static async hashPassword(plainPassword) {
        if (!plainPassword || typeof plainPassword !== 'string') {
            throw new Error('Invalid password input');
        }
        
        try {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(plainPassword, salt);
            return hashedPassword;
        } catch (error) {
            throw new Error('Password hashing failed: ' + error.message);
        }
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        if (!plainPassword || !hashedPassword) {
            return false;
        }
        
        try {
            const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
            return isMatch;
        } catch (error) {
            return false;
        }
    }

    static generateRandomPassword(length = 16) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        
        return password;
    }

    static getPasswordStrength(password) {
        if (!password) return 0;
        
        let strength = 0;
        
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
        
        return Math.min(strength, 5);
    }
}

module.exports = PasswordHasher;const bcrypt = require('bcrypt');

const saltRounds = 10;

async function hashPassword(plainPassword) {
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Password hashing failed');
    }
}

async function verifyPassword(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Password verification failed');
    }
}

module.exports = {
    hashPassword,
    verifyPassword
};