const fs = require('fs');
const path = require('path');

class FileManager {
  constructor(baseDir) {
    this.baseDir = baseDir;
  }

  readJSON(filename) {
    const filePath = path.join(this.baseDir, filename);
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`File ${filename} not found. Returning empty object.`);
        return {};
      }
      throw error;
    }
  }

  writeJSON(filename, data) {
    const filePath = path.join(this.baseDir, filename);
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonString, 'utf8');
    console.log(`Data written to ${filename} successfully.`);
  }

  mergeJSON(targetFile, sourceFile) {
    const targetData = this.readJSON(targetFile);
    const sourceData = this.readJSON(sourceFile);
    const mergedData = { ...targetData, ...sourceData };
    this.writeJSON(targetFile, mergedData);
    return mergedData;
  }
}

module.exports = FileManager;