function validateFile(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG and PDF files are allowed.');
    }
    
    if (file.size > maxSize) {
        throw new Error('File size exceeds 5MB limit.');
    }
    
    return true;
}

function uploadFile(file, onProgress, onComplete, onError) {
    try {
        validateFile(file);
        
        const formData = new FormData();
        formData.append('file', file);
        
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                onProgress(percentComplete);
            }
        });
        
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                onComplete(JSON.parse(xhr.responseText));
            } else {
                onError(new Error(`Upload failed with status: ${xhr.status}`));
            }
        });
        
        xhr.addEventListener('error', () => {
            onError(new Error('Network error during upload'));
        });
        
        xhr.open('POST', '/api/upload');
        xhr.send(formData);
        
    } catch (error) {
        onError(error);
    }
}

function handleFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    
    const file = files[0];
    const progressBar = document.getElementById('uploadProgress');
    const statusDiv = document.getElementById('uploadStatus');
    
    progressBar.style.width = '0%';
    statusDiv.textContent = 'Starting upload...';
    
    uploadFile(
        file,
        (progress) => {
            progressBar.style.width = `${progress}%`;
            statusDiv.textContent = `Uploading: ${Math.round(progress)}%`;
        },
        (response) => {
            statusDiv.textContent = 'Upload completed successfully!';
            console.log('Upload response:', response);
        },
        (error) => {
            statusDiv.textContent = `Error: ${error.message}`;
            console.error('Upload error:', error);
        }
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
});function uploadFile(file, uploadUrl, onProgress, onSuccess, onError) {
    if (!file || !uploadUrl) {
        onError('Invalid file or upload URL');
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            if (onProgress && typeof onProgress === 'function') {
                onProgress(percentComplete);
            }
        }
    });

    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(xhr.responseText);
            }
        } else {
            if (onError && typeof onError === 'function') {
                onError(`Upload failed with status: ${xhr.status}`);
            }
        }
    });

    xhr.addEventListener('error', () => {
        if (onError && typeof onError === 'function') {
            onError('Network error occurred during upload');
        }
    });

    xhr.open('POST', uploadUrl, true);
    xhr.send(formData);
}function handleFileUpload(file, options = {}) {
  const defaultOptions = {
    maxSize: 10 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    onProgress: () => {},
    onComplete: () => {},
    onError: () => {}
  };

  const config = { ...defaultOptions, ...options };

  return new Promise((resolve, reject) => {
    if (!file) {
      const error = new Error('No file provided');
      config.onError(error);
      return reject(error);
    }

    if (file.size > config.maxSize) {
      const error = new Error(`File size exceeds ${config.maxSize} bytes limit`);
      config.onError(error);
      return reject(error);
    }

    if (!config.allowedTypes.includes(file.type)) {
      const error = new Error(`File type ${file.type} not allowed`);
      config.onError(error);
      return reject(error);
    }

    const reader = new FileReader();
    let progress = 0;

    const progressInterval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        config.onProgress(progress);
      }
    }, 100);

    reader.onload = (event) => {
      clearInterval(progressInterval);
      config.onProgress(100);
      
      const result = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        content: event.target.result,
        uploadedAt: new Date().toISOString()
      };

      config.onComplete(result);
      resolve(result);
    };

    reader.onerror = (error) => {
      clearInterval(progressInterval);
      config.onError(error);
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}function validateFile(file, maxSize) {
    if (!file) {
        throw new Error('No file provided');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type');
    }

    if (file.size > maxSize) {
        throw new Error('File size exceeds limit');
    }

    return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
    };
}

function processUpload(file, options = {}) {
    const defaultOptions = {
        maxSize: 5 * 1024 * 1024,
        chunkSize: 1024 * 1024
    };

    const config = { ...defaultOptions, ...options };

    try {
        const validatedFile = validateFile(file, config.maxSize);
        
        if (validatedFile.size > config.chunkSize) {
            return uploadInChunks(file, config.chunkSize);
        } else {
            return uploadSingleFile(file);
        }
    } catch (error) {
        console.error('Upload failed:', error.message);
        return { success: false, error: error.message };
    }
}

function uploadSingleFile(file) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'File uploaded successfully',
                fileId: generateFileId(),
                timestamp: new Date().toISOString()
            });
        }, 1000);
    });
}

function uploadInChunks(file, chunkSize) {
    const totalChunks = Math.ceil(file.size / chunkSize);
    const uploadPromises = [];

    for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        uploadPromises.push(uploadChunk(chunk, i, totalChunks));
    }

    return Promise.all(uploadPromises)
        .then(results => {
            return {
                success: true,
                message: 'File uploaded in chunks',
                totalChunks: totalChunks,
                chunks: results,
                fileId: generateFileId()
            };
        });
}

function uploadChunk(chunk, index, total) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                chunkNumber: index + 1,
                totalChunks: total,
                size: chunk.size,
                uploaded: true
            });
        }, 500);
    });
}

function generateFileId() {
    return 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}function validateFileUpload(fileInput, maxSizeMB) {
    const file = fileInput.files[0];
    if (!file) {
        console.error('No file selected');
        return false;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        console.error(`File size exceeds ${maxSizeMB}MB limit`);
        return false;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        console.error('Invalid file type. Allowed: JPEG, PNG, PDF');
        return false;
    }

    console.log('File validation passed:', file.name);
    return true;
}function validateFileUpload(fileInput, maxSizeMB) {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (!fileInput.files || fileInput.files.length === 0) {
        throw new Error('No file selected');
    }
    
    const file = fileInput.files[0];
    
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Allowed: JPEG, PNG, PDF');
    }
    
    if (file.size > maxSizeBytes) {
        throw new Error(`File size exceeds ${maxSizeMB}MB limit`);
    }
    
    return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
    };
}function validateFile(file, maxSize) {
    if (!file) {
        throw new Error('No file provided');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Allowed types: JPEG, PNG, PDF');
    }

    if (file.size > maxSize) {
        throw new Error(`File size exceeds limit of ${maxSize} bytes`);
    }

    return {
        name: file.name,
        type: file.type,
        size: file.size,
        isValid: true
    };
}

function handleFileUpload(event, maxSize = 5 * 1024 * 1024) {
    try {
        const file = event.target.files[0];
        const validationResult = validateFile(file, maxSize);
        
        console.log('File validation successful:', validationResult);
        return validationResult;
    } catch (error) {
        console.error('File validation failed:', error.message);
        return {
            isValid: false,
            error: error.message
        };
    }
}

function createFileUploader(options = {}) {
    const defaultOptions = {
        maxSize: 5 * 1024 * 1024,
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
        onSuccess: (file) => console.log('Upload successful:', file),
        onError: (error) => console.error('Upload failed:', error)
    };

    const config = { ...defaultOptions, ...options };

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = config.allowedTypes.join(',');
    input.style.display = 'none';

    input.addEventListener('change', (event) => {
        try {
            const file = event.target.files[0];
            const result = validateFile(file, config.maxSize);
            
            if (result.isValid) {
                config.onSuccess(result);
            }
        } catch (error) {
            config.onError(error.message);
        }
        
        input.value = '';
    });

    return {
        trigger: () => input.click(),
        element: input
    };
}

export { validateFile, handleFileUpload, createFileUploader };