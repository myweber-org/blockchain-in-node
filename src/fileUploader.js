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
}const fileUploader = (() => {
    const uploadQueue = new Map();
    let uploadEndpoint = '/api/upload';

    const setEndpoint = (endpoint) => {
        uploadEndpoint = endpoint;
    };

    const validateFile = (file, options = {}) => {
        const { maxSize = 10 * 1024 * 1024, allowedTypes = [] } = options;
        
        if (file.size > maxSize) {
            throw new Error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
        }
        
        if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
            throw new Error(`File type ${file.type} not allowed`);
        }
        
        return true;
    };

    const uploadFile = async (file, onProgress = null) => {
        const fileId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        try {
            validateFile(file);
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('timestamp', Date.now());
            
            const xhr = new XMLHttpRequest();
            
            const uploadPromise = new Promise((resolve, reject) => {
                xhr.upload.addEventListener('progress', (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        onProgress({
                            fileId,
                            fileName: file.name,
                            progress: Math.round(percentComplete),
                            loaded: event.loaded,
                            total: event.total
                        });
                    }
                });
                
                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const response = JSON.parse(xhr.responseText);
                        resolve({
                            fileId,
                            fileName: file.name,
                            success: true,
                            data: response,
                            status: xhr.status
                        });
                    } else {
                        reject({
                            fileId,
                            fileName: file.name,
                            success: false,
                            error: `Upload failed with status ${xhr.status}`,
                            status: xhr.status
                        });
                    }
                    uploadQueue.delete(fileId);
                });
                
                xhr.addEventListener('error', () => {
                    reject({
                        fileId,
                        fileName: file.name,
                        success: false,
                        error: 'Network error during upload',
                        status: xhr.status
                    });
                    uploadQueue.delete(fileId);
                });
                
                xhr.addEventListener('abort', () => {
                    reject({
                        fileId,
                        fileName: file.name,
                        success: false,
                        error: 'Upload cancelled',
                        status: xhr.status
                    });
                    uploadQueue.delete(fileId);
                });
            });
            
            xhr.open('POST', uploadEndpoint);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            
            uploadQueue.set(fileId, {
                promise: uploadPromise,
                xhr,
                file,
                progress: 0
            });
            
            xhr.send(formData);
            
            return uploadPromise;
        } catch (error) {
            return Promise.reject({
                fileId,
                fileName: file.name,
                success: false,
                error: error.message
            });
        }
    };

    const cancelUpload = (fileId) => {
        const upload = uploadQueue.get(fileId);
        if (upload) {
            upload.xhr.abort();
            uploadQueue.delete(fileId);
            return true;
        }
        return false;
    };

    const getUploadStatus = (fileId) => {
        const upload = uploadQueue.get(fileId);
        return upload ? {
            fileId,
            fileName: upload.file.name,
            inProgress: upload.xhr.readyState !== 4,
            readyState: upload.xhr.readyState
        } : null;
    };

    const setupDropZone = (element, onFilesSelected) => {
        const preventDefaults = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const highlight = () => {
            element.classList.add('drag-over');
        };

        const unhighlight = () => {
            element.classList.remove('drag-over');
        };

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            element.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, unhighlight, false);
        });

        element.addEventListener('drop', (e) => {
            const files = Array.from(e.dataTransfer.files);
            if (onFilesSelected && files.length > 0) {
                onFilesSelected(files);
            }
        }, false);
    };

    return {
        setEndpoint,
        uploadFile,
        cancelUpload,
        getUploadStatus,
        setupDropZone,
        validateFile,
        get queueSize() {
            return uploadQueue.size;
        }
    };
})();

export default fileUploader;function uploadFile(file, url, onProgress, onSuccess, onError) {
    if (!file || !url) {
        onError('File or URL is missing');
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            onProgress(percentComplete);
        }
    });

    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            onSuccess(xhr.responseText);
        } else {
            onError(`Upload failed with status: ${xhr.status}`);
        }
    });

    xhr.addEventListener('error', () => {
        onError('Network error occurred');
    });

    xhr.open('POST', url, true);
    xhr.send(formData);
}const FileUploader = (function() {
    const uploadQueue = new Map();
    let uploadEndpoint = '/api/upload';

    function setEndpoint(url) {
        if (typeof url === 'string' && url.trim() !== '') {
            uploadEndpoint = url;
        }
    }

    function validateFile(file) {
        const maxSize = 10 * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

        if (file.size > maxSize) {
            throw new Error('File size exceeds 10MB limit');
        }

        if (!allowedTypes.includes(file.type)) {
            throw new Error('File type not supported');
        }

        return true;
    }

    function createProgressTracker(fileId) {
        const progressElement = document.createElement('div');
        progressElement.className = 'upload-progress';
        progressElement.innerHTML = `
            <div class="progress-bar"></div>
            <span class="progress-text">0%</span>
        `;

        return {
            update: function(percentage) {
                const bar = progressElement.querySelector('.progress-bar');
                const text = progressElement.querySelector('.progress-text');
                bar.style.width = `${percentage}%`;
                text.textContent = `${Math.round(percentage)}%`;
            },
            element: progressElement
        };
    }

    async function uploadFile(file, options = {}) {
        const fileId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        try {
            validateFile(file);
            
            const formData = new FormData();
            formData.append('file', file);
            
            if (options.metadata) {
                formData.append('metadata', JSON.stringify(options.metadata));
            }

            const progressTracker = createProgressTracker(fileId);
            uploadQueue.set(fileId, { file, progressTracker });

            if (options.onProgress) {
                options.onProgress(0, fileId);
            }

            const xhr = new XMLHttpRequest();
            
            xhr.upload.onprogress = function(event) {
                if (event.lengthComputable) {
                    const percentage = (event.loaded / event.total) * 100;
                    progressTracker.update(percentage);
                    
                    if (options.onProgress) {
                        options.onProgress(percentage, fileId);
                    }
                }
            };

            return new Promise((resolve, reject) => {
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const response = JSON.parse(xhr.responseText);
                        uploadQueue.delete(fileId);
                        
                        if (options.onSuccess) {
                            options.onSuccess(response, fileId);
                        }
                        resolve(response);
                    } else {
                        throw new Error(`Upload failed: ${xhr.statusText}`);
                    }
                };

                xhr.onerror = function() {
                    uploadQueue.delete(fileId);
                    const error = new Error('Network error during upload');
                    
                    if (options.onError) {
                        options.onError(error, fileId);
                    }
                    reject(error);
                };

                xhr.open('POST', uploadEndpoint, true);
                
                if (options.headers) {
                    Object.entries(options.headers).forEach(([key, value]) => {
                        xhr.setRequestHeader(key, value);
                    });
                }
                
                xhr.send(formData);
            });

        } catch (error) {
            uploadQueue.delete(fileId);
            
            if (options.onError) {
                options.onError(error, fileId);
            }
            throw error;
        }
    }

    function cancelUpload(fileId) {
        const upload = uploadQueue.get(fileId);
        if (upload) {
            uploadQueue.delete(fileId);
            return true;
        }
        return false;
    }

    function getQueueSize() {
        return uploadQueue.size;
    }

    function clearQueue() {
        uploadQueue.clear();
    }

    function setupDropZone(elementId) {
        const dropZone = document.getElementById(elementId);
        
        if (!dropZone) {
            throw new Error(`Element with id "${elementId}" not found`);
        }

        dropZone.addEventListener('dragover', function(event) {
            event.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', function(event) {
            event.preventDefault();
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', function(event) {
            event.preventDefault();
            dropZone.classList.remove('drag-over');
            
            const files = Array.from(event.dataTransfer.files);
            files.forEach(file => {
                uploadFile(file).catch(console.error);
            });
        });

        return {
            destroy: function() {
                dropZone.removeEventListener('dragover', arguments.callee);
                dropZone.removeEventListener('dragleave', arguments.callee);
                dropZone.removeEventListener('drop', arguments.callee);
            }
        };
    }

    return {
        setEndpoint,
        uploadFile,
        cancelUpload,
        getQueueSize,
        clearQueue,
        setupDropZone,
        validateFile
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FileUploader;
}