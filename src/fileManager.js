const fs = require('fs');
const path = require('path');

class FileManager {
  constructor(basePath) {
    this.basePath = basePath;
  }

  readFile(filename) {
    const filePath = path.join(this.basePath, filename);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  writeFile(filename, content) {
    const filePath = path.join(this.basePath, filename);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  deleteFile(filename) {
    const filePath = path.join(this.basePath, filename);
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  listFiles() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.basePath, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });
  }
}

module.exports = FileManager;const fs = require('fs');
const path = require('path');

class FileManager {
  constructor(basePath) {
    this.basePath = basePath;
  }

  readJSON(filename) {
    try {
      const filePath = path.join(this.basePath, filename);
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading file ${filename}:`, error.message);
      return null;
    }
  }

  writeJSON(filename, data) {
    try {
      const filePath = path.join(this.basePath, filename);
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(filePath, jsonData, 'utf8');
      return true;
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error.message);
      return false;
    }
  }

  listFiles(extension = '.json') {
    try {
      const files = fs.readdirSync(this.basePath);
      return files.filter(file => file.endsWith(extension));
    } catch (error) {
      console.error('Error listing files:', error.message);
      return [];
    }
  }
}

module.exports = FileManager;