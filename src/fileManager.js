const fs = require('fs').promises;
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
                throw new Error(`File not found: ${filename}`);
            } else if (error instanceof SyntaxError) {
                throw new Error(`Invalid JSON in file: ${filename}`);
            } else {
                throw new Error(`Failed to read file: ${error.message}`);
            }
        }
    }

    async writeJSON(filename, data) {
        try {
            const filePath = path.join(this.basePath, filename);
            const jsonString = JSON.stringify(data, null, 2);
            await fs.writeFile(filePath, jsonString, 'utf8');
            return { success: true, message: `File ${filename} saved successfully` };
        } catch (error) {
            throw new Error(`Failed to write file: ${error.message}`);
        }
    }

    async fileExists(filename) {
        try {
            const filePath = path.join(this.basePath, filename);
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = FileManager;const fs = require('fs');
const path = require('path');

class FileManager {
    constructor(directory) {
        this.directory = directory;
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    }

    readFile(filename) {
        const filePath = path.join(this.directory, filename);
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`File ${filename} not found. Returning empty object.`);
                return {};
            }
            console.error(`Error reading file ${filename}:`, error.message);
            return null;
        }
    }

    writeFile(filename, data) {
        const filePath = path.join(this.directory, filename);
        try {
            const jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync(filePath, jsonData, 'utf8');
            return true;
        } catch (error) {
            console.error(`Error writing to file ${filename}:`, error.message);
            return false;
        }
    }

    listFiles() {
        try {
            return fs.readdirSync(this.directory).filter(file => file.endsWith('.json'));
        } catch (error) {
            console.error('Error listing files:', error.message);
            return [];
        }
    }

    deleteFile(filename) {
        const filePath = path.join(this.directory, filename);
        try {
            fs.unlinkSync(filePath);
            return true;
        } catch (error) {
            console.error(`Error deleting file ${filename}:`, error.message);
            return false;
        }
    }
}

module.exports = FileManager;const fs = require('fs');
const path = require('path');

class FileManager {
    constructor(basePath = '.') {
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
            const jsonString = JSON.stringify(data, null, 2);
            fs.writeFileSync(filePath, jsonString, 'utf8');
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