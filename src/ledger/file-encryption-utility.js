const crypto = require('crypto');

class FileEncryption {
  constructor(key) {
    this.algorithm = 'aes-256-cbc';
    this.key = crypto.createHash('sha256').update(String(key)).digest();
  }

  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
      iv: iv.toString('hex'),
      content: encrypted
    };
  }

  decrypt(encryptedData) {
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    let decrypted = decipher.update(encryptedData.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  static generateRandomKey(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }
}

module.exports = FileEncryption;