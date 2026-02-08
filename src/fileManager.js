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

module.exports = FileManager;const fs = require('fs');
const path = require('path');

class FileManager {
  constructor(basePath = '.') {
    this.basePath = path.resolve(basePath);
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

  listFiles(directory = '.') {
    const fullPath = path.join(this.basePath, directory);
    return new Promise((resolve, reject) => {
      fs.readdir(fullPath, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });
  }

  fileExists(filePath) {
    const fullPath = path.join(this.basePath, filePath);
    return new Promise((resolve) => {
      fs.access(fullPath, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  }
}

module.exports = FileManager;class FileManager {
    constructor() {
        this.files = new Map();
        this.nextId = 1;
    }

    createFile(name, content = '') {
        if (!name || typeof name !== 'string') {
            throw new Error('Invalid file name');
        }

        const id = this.nextId++;
        const file = {
            id,
            name,
            content: String(content),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.files.set(id, file);
        return { success: true, file: { ...file } };
    }

    readFile(id) {
        const file = this.files.get(Number(id));
        if (!file) {
            return { success: false, error: 'File not found' };
        }
        return { success: true, file: { ...file } };
    }

    updateFile(id, content) {
        const file = this.files.get(Number(id));
        if (!file) {
            return { success: false, error: 'File not found' };
        }

        file.content = String(content);
        file.updatedAt = new Date();
        this.files.set(file.id, file);
        return { success: true, file: { ...file } };
    }

    deleteFile(id) {
        const file = this.files.get(Number(id));
        if (!file) {
            return { success: false, error: 'File not found' };
        }

        this.files.delete(file.id);
        return { success: true, message: 'File deleted successfully' };
    }

    listFiles() {
        return Array.from(this.files.values()).map(file => ({
            id: file.id,
            name: file.name,
            size: file.content.length,
            updatedAt: file.updatedAt
        }));
    }

    searchFiles(query) {
        if (!query || typeof query !== 'string') {
            return [];
        }

        const lowerQuery = query.toLowerCase();
        return Array.from(this.files.values())
            .filter(file => 
                file.name.toLowerCase().includes(lowerQuery) || 
                file.content.toLowerCase().includes(lowerQuery)
            )
            .map(file => ({
                id: file.id,
                name: file.name,
                preview: file.content.substring(0, 50) + (file.content.length > 50 ? '...' : '')
            }));
    }
}

export default FileManager;const fs = require('fs');
const path = require('path');

class FileManager {
    constructor(basePath = process.cwd()) {
        this.basePath = basePath;
    }

    readJSON(filePath) {
        try {
            const fullPath = path.join(this.basePath, filePath);
            const data = fs.readFileSync(fullPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error(`File not found: ${filePath}`);
            } else if (error instanceof SyntaxError) {
                console.error(`Invalid JSON in file: ${filePath}`);
            } else {
                console.error(`Error reading file ${filePath}:`, error.message);
            }
            return null;
        }
    }

    writeJSON(filePath, data) {
        try {
            const fullPath = path.join(this.basePath, filePath);
            const dir = path.dirname(fullPath);
            
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            const jsonString = JSON.stringify(data, null, 2);
            fs.writeFileSync(fullPath, jsonString, 'utf8');
            return true;
        } catch (error) {
            console.error(`Error writing file ${filePath}:`, error.message);
            return false;
        }
    }

    fileExists(filePath) {
        const fullPath = path.join(this.basePath, filePath);
        return fs.existsSync(fullPath);
    }

    deleteFile(filePath) {
        try {
            const fullPath = path.join(this.basePath, filePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Error deleting file ${filePath}:`, error.message);
            return false;
        }
    }
}

module.exports = FileManager;