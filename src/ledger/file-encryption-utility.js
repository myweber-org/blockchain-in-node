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
                
                input.on('data', (chunk) => {
                    iv = chunk;
                });
                
                input.on('end', () => {
                    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
                    const fileInput = fs.createReadStream(inputPath, { start: 16 });
                    const output = fs.createWriteStream(outputPath);
                    
                    fileInput.pipe(decipher).pipe(output);
                    
                    output.on('finish', () => {
                        resolve('Decryption completed successfully');
                    });
                    
                    output.on('error', reject);
                });
                
                input.on('error', reject);
            } catch (error) {
                reject(error);
            }
        });
    }

    generateRandomKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}

module.exports = FileEncryptor;const crypto = require('crypto');
const fs = require('fs');

class FileEncryption {
    constructor(key) {
        this.algorithm = 'aes-256-cbc';
        this.key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
    }

    encryptFile(inputPath, outputPath) {
        return new Promise((resolve, reject) => {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
            const input = fs.createReadStream(inputPath);
            const output = fs.createWriteStream(outputPath);

            output.write(iv);

            input.pipe(cipher).pipe(output)
                .on('finish', () => resolve(outputPath))
                .on('error', reject);
        });
    }

    decryptFile(inputPath, outputPath) {
        return new Promise((resolve, reject) => {
            const input = fs.createReadStream(inputPath, { start: 0, end: 15 });
            let iv;

            input.on('data', (chunk) => {
                iv = chunk;
                input.destroy();
            });

            input.on('close', () => {
                const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
                const fileInput = fs.createReadStream(inputPath, { start: 16 });
                const output = fs.createWriteStream(outputPath);

                fileInput.pipe(decipher).pipe(output)
                    .on('finish', () => resolve(outputPath))
                    .on('error', reject);
            });
        });
    }

    static generateKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}

module.exports = FileEncryption;