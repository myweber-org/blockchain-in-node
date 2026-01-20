const fs = require('fs');
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
            if (error.code === 'ENOENT') {
                console.error(`File not found: ${filename}`);
            } else if (error instanceof SyntaxError) {
                console.error(`Invalid JSON in file: ${filename}`);
            } else {
                console.error(`Error reading file ${filename}:`, error.message);
            }
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
            console.error(`Error writing to file ${filename}:`, error.message);
            return false;
        }
    }

    fileExists(filename) {
        const filePath = path.join(this.basePath, filename);
        return fs.existsSync(filePath);
    }

    deleteFile(filename) {
        try {
            const filePath = path.join(this.basePath, filename);
            fs.unlinkSync(filePath);
            return true;
        } catch (error) {
            console.error(`Error deleting file ${filename}:`, error.message);
            return false;
        }
    }
}

module.exports = FileManager;
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

module.exports = FileManager;const fs = require('fs').promises;
const path = require('path');

class FileManager {
    constructor(basePath) {
        this.basePath = basePath;
    }

    async readJSON(filename) {
        try {
            const filePath = path.join(this.basePath, filename);
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.warn(`File not found: ${filename}`);
                return null;
            }
            throw new Error(`Failed to read JSON file ${filename}: ${error.message}`);
        }
    }

    async writeJSON(filename, data) {
        try {
            const filePath = path.join(this.basePath, filename);
            const jsonString = JSON.stringify(data, null, 2);
            await fs.writeFile(filePath, jsonString, 'utf8');
            return true;
        } catch (error) {
            throw new Error(`Failed to write JSON file ${filename}: ${error.message}`);
        }
    }

    async listFiles(pattern = /.*/) {
        try {
            const files = await fs.readdir(this.basePath);
            return files.filter(file => pattern.test(file));
        } catch (error) {
            throw new Error(`Failed to list files: ${error.message}`);
        }
    }
}

module.exports = FileManager;const fs = require('fs');
const path = require('path');

class FileManager {
  constructor(basePath) {
    this.basePath = basePath;
  }

  readFile(filePath) {
    const fullPath = path.join(this.basePath, filePath);
    return new Promise((resolve, reject) => {
      fs.readFile(fullPath, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  writeFile(filePath, content) {
    const fullPath = path.join(this.basePath, filePath);
    return new Promise((resolve, reject) => {
      fs.writeFile(fullPath, content, 'utf8', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  listFiles(directoryPath) {
    const fullPath = path.join(this.basePath, directoryPath);
    return new Promise((resolve, reject) => {
      fs.readdir(fullPath, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });
  }

  getFileStats(filePath) {
    const fullPath = path.join(this.basePath, filePath);
    return new Promise((resolve, reject) => {
      fs.stat(fullPath, (err, stats) => {
        if (err) reject(err);
        else resolve(stats);
      });
    });
  }

  static validateFileName(fileName) {
    const invalidChars = /[<>:"/\\|?*]/;
    return !invalidChars.test(fileName);
  }
}

module.exports = FileManager;