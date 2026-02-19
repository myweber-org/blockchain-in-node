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

module.exports = FileManager;