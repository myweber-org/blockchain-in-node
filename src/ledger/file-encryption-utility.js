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

    encryptFile(data, key) {
        if (!Buffer.isBuffer(data)) {
            data = Buffer.from(data);
        }

        const iv = crypto.randomBytes(this.ivLength);
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        
        const encrypted = Buffer.concat([
            cipher.update(data),
            cipher.final()
        ]);

        return Buffer.concat([iv, encrypted]);
    }

    decryptFile(encryptedData, key) {
        if (!Buffer.isBuffer(encryptedData)) {
            encryptedData = Buffer.from(encryptedData);
        }

        const iv = encryptedData.slice(0, this.ivLength);
        const data = encryptedData.slice(this.ivLength);
        
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        
        return Buffer.concat([
            decipher.update(data),
            decipher.final()
        ]);
    }

    encryptFileWithPassword(data, password) {
        const salt = crypto.randomBytes(16);
        const key = crypto.pbkdf2Sync(password, salt, 100000, this.keyLength, 'sha256');
        
        const encrypted = this.encryptFile(data, key);
        return Buffer.concat([salt, encrypted]);
    }

    decryptFileWithPassword(encryptedData, password) {
        const salt = encryptedData.slice(0, 16);
        const data = encryptedData.slice(16);
        
        const key = crypto.pbkdf2Sync(password, salt, 100000, this.keyLength, 'sha256');
        return this.decryptFile(data, key);
    }

    calculateHash(data, algorithm = 'sha256') {
        return crypto.createHash(algorithm).update(data).digest('hex');
    }

    verifyIntegrity(data, expectedHash, algorithm = 'sha256') {
        const actualHash = this.calculateHash(data, algorithm);
        return actualHash === expectedHash;
    }
}

module.exports = FileEncryptionUtility;