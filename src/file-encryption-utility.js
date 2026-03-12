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

    createKeyFromPassword(password, salt) {
        return crypto.pbkdf2Sync(password, salt, 100000, this.keyLength, 'sha256');
    }

    validateKey(key) {
        return Buffer.isBuffer(key) && key.length === this.keyLength;
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

    createKeyFromPassword(password, salt) {
        return crypto.pbkdf2Sync(password, salt, 100000, this.keyLength, 'sha256');
    }

    validateKey(key) {
        return Buffer.isBuffer(key) && key.length === this.keyLength;
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

    createHash(data) {
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
const fs = require('fs');

class FileEncryptor {
    constructor(key) {
        this.algorithm = 'aes-256-cbc';
        this.key = crypto.createHash('sha256').update(key).digest();
    }

    encryptFile(inputPath, outputPath) {
        return new Promise((resolve, reject) => {
            try {
                const iv = crypto.randomBytes(16);
                const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
                
                const input = fs.createReadStream(inputPath);
                const output = fs.createWriteStream(outputPath);
                
                output.write(iv);
                
                input.pipe(cipher).pipe(output);
                
                output.on('finish', () => {
                    resolve('Encryption completed successfully');
                });
                
                output.on('error', reject);
            } catch (error) {
                reject(error);
            }
        });
    }

    decryptFile(inputPath, outputPath) {
        return new Promise((resolve, reject) => {
            try {
                const input = fs.createReadStream(inputPath, { start: 0, end: 15 });
                let iv;
                
                input.on('data', (data) => {
                    iv = data;
                });
                
                input.on('end', () => {
                    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
                    const fileInput = fs.createReadStream(inputPath, { start: 16 });
                    const fileOutput = fs.createWriteStream(outputPath);
                    
                    fileInput.pipe(decipher).pipe(fileOutput);
                    
                    fileOutput.on('finish', () => {
                        resolve('Decryption completed successfully');
                    });
                    
                    fileOutput.on('error', reject);
                });
                
                input.on('error', reject);
            } catch (error) {
                reject(error);
            }
        });
    }

    static generateRandomKey(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }
}

module.exports = FileEncryptor;