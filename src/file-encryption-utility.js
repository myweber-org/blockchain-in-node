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
        const iv = crypto.randomBytes(this.ivLength);
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        return {
            iv: iv.toString('hex'),
            encryptedData: encrypted
        };
    }

    decryptFile(encryptedData, key, iv) {
        const decipher = crypto.createDecipheriv(
            this.algorithm, 
            key, 
            Buffer.from(iv, 'hex')
        );
        
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    }

    createKeyFromPassword(password, salt) {
        return crypto.pbkdf2Sync(
            password, 
            salt, 
            100000, 
            this.keyLength, 
            'sha256'
        );
    }
}

module.exports = FileEncryptionUtility;