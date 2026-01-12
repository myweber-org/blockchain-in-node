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