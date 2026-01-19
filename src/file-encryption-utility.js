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
        if (!Buffer.isBuffer(data)) {
            data = Buffer.from(data);
        }

        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        
        return {
            encryptedData: encrypted,
            iv: iv,
            key: key
        };
    }

    decryptFile(encryptedData, key, iv) {
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        
        return decrypted;
    }

    encryptWithPassword(data, password) {
        const salt = crypto.randomBytes(16);
        const key = crypto.scryptSync(password, salt, this.keyLength);
        const iv = this.generateIV();
        
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        
        return Buffer.concat([salt, iv, encrypted]);
    }

    decryptWithPassword(encryptedData, password) {
        const salt = encryptedData.slice(0, 16);
        const iv = encryptedData.slice(16, 32);
        const data = encryptedData.slice(32);
        
        const key = crypto.scryptSync(password, salt, this.keyLength);
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        
        return Buffer.concat([decipher.update(data), decipher.final()]);
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

    encryptFile(inputPath, outputPath, key, iv) {
        return new Promise((resolve, reject) => {
            const inputStream = fs.createReadStream(inputPath);
            const outputStream = fs.createWriteStream(outputPath);
            const cipher = crypto.createCipheriv(this.algorithm, key, iv);

            inputStream.pipe(cipher).pipe(outputStream);

            outputStream.on('finish', () => {
                resolve({
                    encrypted: true,
                    outputPath: outputPath,
                    key: key.toString('hex'),
                    iv: iv.toString('hex')
                });
            });

            outputStream.on('error', reject);
        });
    }

    decryptFile(inputPath, outputPath, key, iv) {
        return new Promise((resolve, reject) => {
            const inputStream = fs.createReadStream(inputPath);
            const outputStream = fs.createWriteStream(outputPath);
            const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));

            inputStream.pipe(decipher).pipe(outputStream);

            outputStream.on('finish', () => {
                resolve({
                    decrypted: true,
                    outputPath: outputPath
                });
            });

            outputStream.on('error', reject);
        });
    }

    calculateFileHash(filePath, algorithm = 'sha256') {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash(algorithm);
            const stream = fs.createReadStream(filePath);

            stream.on('data', (data) => {
                hash.update(data);
            });

            stream.on('end', () => {
                resolve(hash.digest('hex'));
            });

            stream.on('error', reject);
        });
    }
}

module.exports = FileEncryptionUtility;