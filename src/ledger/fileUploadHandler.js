function validateFile(file, maxSize) {
    if (!file) {
        throw new Error('No file provided');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.');
    }

    if (file.size > maxSize) {
        throw new Error(`File size exceeds the limit of ${maxSize / 1024 / 1024}MB`);
    }

    return {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
    };
}

function handleFileUpload(event, maxSize = 5 * 1024 * 1024) {
    const file = event.target.files[0];
    
    try {
        const validatedFile = validateFile(file, maxSize);
        console.log('File validated successfully:', validatedFile);
        
        // Simulate upload process
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'File uploaded successfully',
                    file: validatedFile
                });
            }, 1000);
        });
    } catch (error) {
        console.error('File validation failed:', error.message);
        return Promise.reject({
            success: false,
            message: error.message
        });
    }
}

// Example usage
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.jpg,.jpeg,.png,.pdf';
    
    fileInput.addEventListener('change', function(event) {
        handleFileUpload(event)
            .then(result => console.log(result))
            .catch(error => console.error(error));
    });
    
    // For testing purposes
    window.testFileUpload = handleFileUpload;
});function fileUploadHandler(file, uploadUrl, onProgress, onSuccess, onError) {
    if (!file || !uploadUrl) {
        onError('File or upload URL missing');
        return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
        onError('Invalid file type');
        return;
    }

    if (file.size > maxSize) {
        onError('File size exceeds limit');
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
            try {
                const response = JSON.parse(xhr.responseText);
                onSuccess(response);
            } catch (error) {
                onError('Invalid server response');
            }
        } else {
            onError(`Upload failed: ${xhr.statusText}`);
        }
    });

    xhr.addEventListener('error', () => {
        onError('Network error occurred');
    });

    xhr.addEventListener('abort', () => {
        onError('Upload cancelled');
    });

    xhr.open('POST', uploadUrl, true);
    xhr.send(formData);

    return {
        cancel: () => xhr.abort()
    };
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
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
    };
}

function processUpload(file, options = {}) {
    const defaults = {
        maxSize: 5 * 1024 * 1024,
        chunkSize: 1024 * 1024
    };
    
    const config = { ...defaults, ...options };
    
    try {
        const validatedFile = validateFile(file, config.maxSize);
        
        if (validatedFile.size > config.chunkSize) {
            return uploadInChunks(file, config.chunkSize);
        }
        
        return uploadSingleFile(file);
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
                fileId: `file_${Date.now()}`,
                url: `https://storage.example.com/${file.name}`
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
                fileId: `chunked_${Date.now()}`,
                chunks: results.length,
                url: `https://storage.example.com/assembled/${file.name}`
            };
        });
}

function uploadChunk(chunk, index, total) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                chunkIndex: index,
                totalChunks: total,
                uploaded: true
            });
        }, 500);
    });
}

export { validateFile, processUpload };