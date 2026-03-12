class FileManager {
  constructor() {
    this.files = new Map();
  }

  createFile(filename, content) {
    if (this.files.has(filename)) {
      throw new Error(`File ${filename} already exists`);
    }
    this.files.set(filename, content);
    return { success: true, filename };
  }

  readFile(filename) {
    if (!this.files.has(filename)) {
      throw new Error(`File ${filename} not found`);
    }
    return this.files.get(filename);
  }

  deleteFile(filename) {
    if (!this.files.has(filename)) {
      throw new Error(`File ${filename} not found`);
    }
    this.files.delete(filename);
    return { success: true, filename };
  }

  listFiles() {
    return Array.from(this.files.keys());
  }

  getFileCount() {
    return this.files.size;
  }
}

const fileManager = new FileManager();

try {
  fileManager.createFile('config.json', JSON.stringify({ port: 3000, env: 'development' }));
  fileManager.createFile('readme.txt', 'This is a sample file');
  
  console.log('Files:', fileManager.listFiles());
  console.log('Config content:', fileManager.readFile('config.json'));
  console.log('Total files:', fileManager.getFileCount());
  
  fileManager.deleteFile('readme.txt');
  console.log('After deletion:', fileManager.listFiles());
} catch (error) {
  console.error('Error:', error.message);
}