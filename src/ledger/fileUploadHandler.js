function validateFile(file, maxSize) {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  const fileSize = file.size / 1024 / 1024;

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.');
  }

  if (fileSize > maxSize) {
    throw new Error(`File size exceeds ${maxSize}MB limit.`);
  }

  return {
    name: file.name,
    type: file.type,
    size: fileSize.toFixed(2) + 'MB',
    lastModified: new Date(file.lastModified).toISOString()
  };
}

function handleFileUpload(event, maxSizeMB = 5) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const fileInfo = validateFile(file, maxSizeMB);
    console.log('File validated successfully:', fileInfo);
    return fileInfo;
  } catch (error) {
    console.error('Upload failed:', error.message);
    event.target.value = '';
    alert(error.message);
    return null;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const uploadInput = document.getElementById('fileUpload');
  if (uploadInput) {
    uploadInput.addEventListener('change', function(e) {
      handleFileUpload(e, 10);
    });
  }
});const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

class FileUploadHandler {
  constructor(uploadUrl, options = {}) {
    this.uploadUrl = uploadUrl;
    this.maxSize = options.maxSize || MAX_FILE_SIZE;
    this.allowedTypes = options.allowedTypes || ALLOWED_TYPES;
    this.onProgress = options.onProgress || null;
    this.onComplete = options.onComplete || null;
    this.onError = options.onError || null;
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
      
      if (this.onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            this.onProgress(percentComplete);
          }
        });
      }

      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            if (this.onComplete) this.onComplete(response);
            resolve(response);
          } else {
            const error = new Error(`Upload failed with status ${xhr.status}`);
            if (this.onError) this.onError(error);
            reject(error);
          }
        };

        xhr.onerror = () => {
          const error = new Error('Network error during upload');
          if (this.onError) this.onError(error);
          reject(error);
        };
      });

      xhr.open('POST', this.uploadUrl, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send(formData);

      return await uploadPromise;
    } catch (error) {
      if (this.onError) this.onError(error);
      throw error;
    }
  }

  async uploadMultiple(files) {
    const uploadPromises = Array.from(files).map(file => this.upload(file));
    return Promise.allSettled(uploadPromises);
  }
}

export default FileUploadHandler;