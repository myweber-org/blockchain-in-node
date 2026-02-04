function FileUploader(options) {
  this.url = options.url || '/upload';
  this.maxSize = options.maxSize || 10485760;
  this.allowedTypes = options.allowedTypes || ['image/jpeg', 'image/png', 'application/pdf'];
  this.onProgress = options.onProgress || function() {};
  this.onComplete = options.onComplete || function() {};
  this.onError = options.onError || function() {};
}

FileUploader.prototype.validateFile = function(file) {
  if (file.size > this.maxSize) {
    throw new Error('File size exceeds maximum limit');
  }
  
  if (!this.allowedTypes.includes(file.type)) {
    throw new Error('File type not allowed');
  }
  
  return true;
};

FileUploader.prototype.upload = function(file) {
  const self = this;
  
  try {
    self.validateFile(file);
  } catch (error) {
    self.onError(error.message);
    return Promise.reject(error);
  }
  
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    formData.append('file', file);
    
    xhr.upload.addEventListener('progress', function(event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        self.onProgress(percentComplete);
      }
    });
    
    xhr.addEventListener('load', function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        self.onComplete(response);
        resolve(response);
      } else {
        const error = new Error(`Upload failed with status: ${xhr.status}`);
        self.onError(error.message);
        reject(error);
      }
    });
    
    xhr.addEventListener('error', function() {
      const error = new Error('Network error occurred during upload');
      self.onError(error.message);
      reject(error);
    });
    
    xhr.open('POST', self.url, true);
    xhr.send(formData);
  });
};

FileUploader.prototype.uploadMultiple = function(files) {
  const self = this;
  const uploadPromises = [];
  
  Array.from(files).forEach(function(file) {
    uploadPromises.push(self.upload(file));
  });
  
  return Promise.all(uploadPromises);
};const FileUploader = (() => {
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
    const MAX_SIZE = 5 * 1024 * 1024;

    class Uploader {
        constructor(dropZoneId, previewId) {
            this.dropZone = document.getElementById(dropZoneId);
            this.preview = document.getElementById(previewId);
            this.files = [];
            this.init();
        }

        init() {
            this.setupEventListeners();
            this.renderPreview();
        }

        setupEventListeners() {
            this.dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.dropZone.classList.add('dragover');
            });

            this.dropZone.addEventListener('dragleave', () => {
                this.dropZone.classList.remove('dragover');
            });

            this.dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.dropZone.classList.remove('dragover');
                this.handleFiles(e.dataTransfer.files);
            });

            this.dropZone.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = ALLOWED_TYPES.join(',');
                input.addEventListener('change', (e) => {
                    this.handleFiles(e.target.files);
                });
                input.click();
            });
        }

        handleFiles(fileList) {
            const validFiles = Array.from(fileList).filter(file => {
                if (!ALLOWED_TYPES.includes(file.type)) {
                    console.warn(`File ${file.name} has invalid type: ${file.type}`);
                    return false;
                }
                if (file.size > MAX_SIZE) {
                    console.warn(`File ${file.name} exceeds size limit: ${file.size}`);
                    return false;
                }
                return true;
            });

            this.files = [...this.files, ...validFiles];
            this.renderPreview();
            this.triggerUpload();
        }

        renderPreview() {
            this.preview.innerHTML = '';
            this.files.forEach((file, index) => {
                const item = document.createElement('div');
                item.className = 'file-item';
                item.innerHTML = `
                    <span>${file.name}</span>
                    <span>${this.formatSize(file.size)}</span>
                    <button data-index="${index}">Remove</button>
                `;
                item.querySelector('button').addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    this.removeFile(index);
                });
                this.preview.appendChild(item);
            });
        }

        removeFile(index) {
            this.files.splice(index, 1);
            this.renderPreview();
        }

        formatSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        async triggerUpload() {
            for (const file of this.files) {
                if (!file.uploaded) {
                    await this.uploadFile(file);
                    file.uploaded = true;
                }
            }
        }

        async uploadFile(file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Upload failed: ${response.statusText}`);
                }

                console.log(`File ${file.name} uploaded successfully`);
            } catch (error) {
                console.error(`Error uploading ${file.name}:`, error);
            }
        }

        clearAll() {
            this.files = [];
            this.renderPreview();
        }
    }

    return Uploader;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FileUploader;
}