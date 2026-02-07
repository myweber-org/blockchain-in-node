const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

class FileUploadHandler {
  constructor() {
    this.uploadQueue = [];
    this.isUploading = false;
  }

  validateFile(file) {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 5MB limit');
    }
    
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('File type not supported');
    }
    
    return true;
  }

  async uploadFile(file) {
    try {
      this.validateFile(file);
      
      const formData = new FormData();
      formData.append('file', file);
      
      const progressCallback = (progress) => {
        console.log(`Upload progress: ${progress}%`);
      };
      
      const result = await this.sendRequest(formData, progressCallback);
      console.log('Upload completed:', result);
      return result;
      
    } catch (error) {
      console.error('Upload failed:', error.message);
      throw error;
    }
  }

  async sendRequest(formData, progressCallback) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          progressCallback(progress);
        }
      });
      
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });
      
      xhr.addEventListener('error', () => {
        reject(new Error('Network error occurred'));
      });
      
      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    });
  }

  addToQueue(file) {
    this.uploadQueue.push(file);
    this.processQueue();
  }

  async processQueue() {
    if (this.isUploading || this.uploadQueue.length === 0) {
      return;
    }
    
    this.isUploading = true;
    const file = this.uploadQueue.shift();
    
    try {
      await this.uploadFile(file);
    } finally {
      this.isUploading = false;
      this.processQueue();
    }
  }
}

export default FileUploadHandler;