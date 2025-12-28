const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

class FileUploader {
  constructor(options = {}) {
    this.endpoint = options.endpoint || '/api/upload';
    this.maxSize = options.maxSize || MAX_FILE_SIZE;
    this.allowedTypes = options.allowedTypes || ALLOWED_TYPES;
    this.onProgress = options.onProgress || (() => {});
    this.onComplete = options.onComplete || (() => {});
    this.onError = options.onError || (() => {});
  }

  validateFile(file) {
    if (file.size > this.maxSize) {
      throw new Error(`File size exceeds ${this.maxSize / 1024 / 1024}MB limit`);
    }

    if (!this.allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} not allowed`);
    }

    return true;
  }

  async upload(file) {
    try {
      this.validateFile(file);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('timestamp', Date.now());

      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          this.onProgress({
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round(percentComplete)
          });
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          this.onComplete(response);
        } else {
          this.onError(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        this.onError(new Error('Network error during upload'));
      });

      xhr.open('POST', this.endpoint, true);
      xhr.send(formData);

    } catch (error) {
      this.onError(error);
      throw error;
    }
  }

  static async readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  static getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export default FileUploader;