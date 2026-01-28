const bcrypt = require('bcrypt');

class PasswordHasher {
    constructor(saltRounds = 10) {
        this.saltRounds = saltRounds;
    }

    async hashPassword(plainPassword) {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            const hashedPassword = await bcrypt.hash(plainPassword, salt);
            return hashedPassword;
        } catch (error) {
            throw new Error('Password hashing failed: ' + error.message);
        }
    }

    async verifyPassword(plainPassword, hashedPassword) {
        try {
            const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
            return isMatch;
        } catch (error) {
            throw new Error('Password verification failed: ' + error.message);
        }
    }

    static generateRandomPassword(length = 12) {
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