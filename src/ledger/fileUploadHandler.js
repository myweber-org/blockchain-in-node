function validateFile(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.');
    }

    if (file.size > maxSize) {
        throw new Error('File size exceeds 5MB limit.');
    }

    return true;
}

function trackUploadProgress(file, onProgress) {
    let uploaded = 0;
    const total = file.size;
    const chunkSize = 1024 * 1024;

    function uploadChunk() {
        const chunk = file.slice(uploaded, uploaded + chunkSize);
        uploaded += chunk.size;

        const progress = Math.round((uploaded / total) * 100);
        onProgress(progress);

        if (uploaded < total) {
            setTimeout(uploadChunk, 100);
        }
    }

    uploadChunk();
}

function handleFileUpload(file) {
    try {
        validateFile(file);
        
        trackUploadProgress(file, (progress) => {
            console.log(`Upload progress: ${progress}%`);
        });

        return Promise.resolve({ success: true, message: 'File upload completed' });
    } catch (error) {
        return Promise.reject({ success: false, error: error.message });
    }
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
        lastModified: file.lastModified
    };
}

function processUpload(file, options = {}) {
    const defaults = {
        maxSize: 5 * 1024 * 1024,
        onProgress: null,
        onComplete: null,
        onError: null
    };
    
    const config = { ...defaults, ...options };
    
    try {
        const validatedFile = validateFile(file, config.maxSize);
        
        if (config.onProgress) {
            config.onProgress({ status: 'validated', file: validatedFile });
        }
        
        const reader = new FileReader();
        
        reader.onloadstart = () => {
            if (config.onProgress) {
                config.onProgress({ status: 'reading', progress: 0 });
            }
        };
        
        reader.onprogress = (event) => {
            if (event.lengthComputable && config.onProgress) {
                const progress = Math.round((event.loaded / event.total) * 100);
                config.onProgress({ status: 'reading', progress });
            }
        };
        
        reader.onload = (event) => {
            const result = {
                file: validatedFile,
                content: event.target.result,
                uploadedAt: new Date().toISOString()
            };
            
            if (config.onComplete) {
                config.onComplete(result);
            }
        };
        
        reader.onerror = (error) => {
            if (config.onError) {
                config.onError(new Error('Failed to read file'));
            }
        };
        
        reader.readAsDataURL(file);
        
    } catch (error) {
        if (config.onError) {
            config.onError(error);
        }
        throw error;
    }
}

function createUploadForm(containerId, options) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const form = document.createElement('form');
    form.className = 'upload-form';
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.name = 'file';
    fileInput.accept = '.jpg,.jpeg,.png,.pdf';
    fileInput.required = true;
    
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Upload File';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = '0%';
    
    const statusText = document.createElement('div');
    statusText.className = 'status-text';
    
    form.appendChild(fileInput);
    form.appendChild(submitBtn);
    form.appendChild(progressBar);
    form.appendChild(statusText);
    container.appendChild(form);
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        if (!fileInput.files.length) return;
        
        const file = fileInput.files[0];
        
        processUpload(file, {
            ...options,
            onProgress: (data) => {
                if (data.progress !== undefined) {
                    progressBar.style.width = `${data.progress}%`;
                    statusText.textContent = `Uploading: ${data.progress}%`;
                } else {
                    statusText.textContent = `Status: ${data.status}`;
                }
            },
            onComplete: (result) => {
                progressBar.style.width = '100%';
                statusText.textContent = 'Upload complete!';
                console.log('Upload successful:', result);
            },
            onError: (error) => {
                statusText.textContent = `Error: ${error.message}`;
                console.error('Upload failed:', error);
            }
        });
    });
    
    return {
        form,
        fileInput,
        submitBtn,
        progressBar,
        statusText
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
        throw new Error(`File size exceeds limit of ${maxSize} bytes`);
    }

    return {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
    };
}

function createFileUploader(options = {}) {
    const defaultOptions = {
        maxSize: 5 * 1024 * 1024,
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
        onSuccess: () => {},
        onError: () => {}
    };

    const config = { ...defaultOptions, ...options };

    const upload = async (file) => {
        try {
            const validatedFile = validateFile(file, config.maxSize);
            
            if (!config.allowedTypes.includes(validatedFile.type)) {
                throw new Error(`File type not allowed. Allowed types: ${config.allowedTypes.join(', ')}`);
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('metadata', JSON.stringify({
                name: validatedFile.name,
                size: validatedFile.size,
                type: validatedFile.type
            }));

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status: ${response.status}`);
            }

            const result = await response.json();
            config.onSuccess(result);
            return result;
        } catch (error) {
            config.onError(error);
            throw error;
        }
    };

    return {
        upload,
        validate: (file) => validateFile(file, config.maxSize),
        getConfig: () => ({ ...config })
    };
}

export { createFileUploader, validateFile };