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
}