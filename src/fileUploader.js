const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

class FileUploader {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.progressBars = new Map();
    this.initialize();
  }

  initialize() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = ALLOWED_TYPES.join(',');
    input.addEventListener('change', this.handleFileSelect.bind(this));
    
    this.container.appendChild(input);
  }

  handleFileSelect(event) {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (this.validateFile(file)) {
        this.uploadFile(file);
      }
    });
  }

  validateFile(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      this.showError(`File type ${file.type} not allowed`);
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      this.showError(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
      return false;
    }

    return true;
  }

  uploadFile(file) {
    const fileId = Date.now() + Math.random();
    const progressBar = this.createProgressBar(file.name, fileId);
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        this.updateProgressBar(fileId, percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.completeUpload(fileId);
      } else {
        this.showError(`Upload failed: ${xhr.statusText}`);
        this.removeProgressBar(fileId);
      }
    });

    xhr.addEventListener('error', () => {
      this.showError('Network error during upload');
      this.removeProgressBar(fileId);
    });

    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
  }

  createProgressBar(filename, fileId) {
    const wrapper = document.createElement('div');
    wrapper.className = 'upload-item';
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = filename;
    
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = '0%';
    
    progressContainer.appendChild(progressBar);
    wrapper.appendChild(nameSpan);
    wrapper.appendChild(progressContainer);
    this.container.appendChild(wrapper);
    
    this.progressBars.set(fileId, { wrapper, progressBar });
    return progressBar;
  }

  updateProgressBar(fileId, percentage) {
    const item = this.progressBars.get(fileId);
    if (item) {
      item.progressBar.style.width = `${percentage}%`;
    }
  }

  completeUpload(fileId) {
    const item = this.progressBars.get(fileId);
    if (item) {
      item.progressBar.style.backgroundColor = '#4CAF50';
      setTimeout(() => {
        this.removeProgressBar(fileId);
      }, 1500);
    }
  }

  removeProgressBar(fileId) {
    const item = this.progressBars.get(fileId);
    if (item) {
      item.wrapper.remove();
      this.progressBars.delete(fileId);
    }
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'upload-error';
    errorDiv.textContent = message;
    this.container.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FileUploader;
}function uploadFile(file, uploadUrl, onProgress, onSuccess, onError) {
    if (!file || !uploadUrl) {
        onError('File or upload URL is missing');
        return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
        onError('Invalid file type. Allowed types: JPEG, PNG, PDF');
        return;
    }

    if (file.size > maxSize) {
        onError('File size exceeds 10MB limit');
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            onProgress(Math.round(percentComplete));
        }
    });

    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                onSuccess(response);
            } catch (e) {
                onError('Invalid server response');
            }
        } else {
            onError(`Upload failed with status: ${xhr.status}`);
        }
    });

    xhr.addEventListener('error', () => {
        onError('Network error occurred during upload');
    });

    xhr.addEventListener('abort', () => {
        onError('Upload was cancelled');
    });

    xhr.open('POST', uploadUrl, true);
    xhr.send(formData);

    return {
        abort: () => xhr.abort()
    };
}