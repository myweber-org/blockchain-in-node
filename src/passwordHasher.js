const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

class PasswordHasher {
    static async hashPassword(plainPassword) {
        if (!plainPassword || typeof plainPassword !== 'string') {
            throw new Error('Invalid password provided');
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
}

module.exports = PasswordHasher;