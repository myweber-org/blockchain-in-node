const crypto = require('crypto');

class FileEncryptionUtility {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.keyLength = 32;
        this.ivLength = 16;
    }

    generateKey() {
        return crypto.randomBytes(this.keyLength);
    }

    generateIV() {
        return crypto.randomBytes(this.ivLength);
    }

    encryptFile(data, key, iv) {
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return {
            encryptedData: encrypted,
            iv: iv.toString('hex')
        };
    }

    decryptFile(encryptedData, key, iv) {
        const decipher = crypto.createDecipheriv(this.algorithm, key, Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    hashFile(data) {
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    validateKey(key) {
        if (!Buffer.isBuffer(key)) {
            throw new Error('Key must be a Buffer');
        }
        if (key.length !== this.keyLength) {
            throw new Error(`Key must be ${this.keyLength} bytes`);
        }
        return true;
    }
}

module.exports = FileEncryptionUtility;const crypto = require('crypto');

class FileEncryptionUtility {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.keyLength = 32;
        this.ivLength = 16;
    }

    generateKey() {
        return crypto.randomBytes(this.keyLength);
    }

    generateIV() {
        return crypto.randomBytes(this.ivLength);
    }

    encryptFile(data, key, iv) {
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decryptFile(encryptedData, key, iv) {
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    createKeyFromPassword(password, salt) {
        return crypto.pbkdf2Sync(password, salt, 100000, this.keyLength, 'sha256');
    }

    saveEncryptedFile(filePath, data, key, iv) {
        const encrypted = this.encryptFile(data, key, iv);
        const fs = require('fs');
        const fileData = {
            iv: iv.toString('hex'),
            encryptedData: encrypted
        };
        fs.writeFileSync(filePath, JSON.stringify(fileData));
        return true;
    }

    loadEncryptedFile(filePath, key) {
        const fs = require('fs');
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const iv = Buffer.from(fileData.iv, 'hex');
        return this.decryptFile(fileData.encryptedData, key, iv);
    }
}

module.exports = FileEncryptionUtility;