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

module.exports = FileManager;const fs = require('fs').promises;
const path = require('path');

class FileManager {
  constructor(basePath = process.cwd()) {
    this.basePath = basePath;
  }

  async readJSON(filePath) {
    try {
      const fullPath = path.resolve(this.basePath, filePath);
      const data = await fs.readFile(fullPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`File not found: ${filePath}`);
      } else if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON in file: ${filePath}`);
      }
      throw error;
    }
  }

  async writeJSON(filePath, data, options = {}) {
    const defaultOptions = {
      spaces: 2,
      createDir: true,
      ...options
    };

    try {
      const fullPath = path.resolve(this.basePath, filePath);
      
      if (defaultOptions.createDir) {
        const dir = path.dirname(fullPath);
        await fs.mkdir(dir, { recursive: true });
      }

      const jsonString = JSON.stringify(data, null, defaultOptions.spaces);
      await fs.writeFile(fullPath, jsonString, 'utf8');
      return { success: true, path: fullPath };
    } catch (error) {
      throw new Error(`Failed to write JSON file: ${error.message}`);
    }
  }

  async mergeJSON(filePath, newData) {
    try {
      const existingData = await this.readJSON(filePath).catch(() => ({}));
      const mergedData = { ...existingData, ...newData };
      return await this.writeJSON(filePath, mergedData);
    } catch (error) {
      throw error;
    }
  }

  static validateJSON(data) {
    try {
      JSON.stringify(data);
      return { valid: true };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}

module.exports = FileManager;