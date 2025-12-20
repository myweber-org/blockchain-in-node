const bcrypt = require('bcrypt');

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