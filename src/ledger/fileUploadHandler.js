function validateFile(file, allowedTypes, maxSize) {
    const errors = [];
    
    if (!allowedTypes.includes(file.type)) {
        errors.push(`File type ${file.type} not allowed`);
    }
    
    if (file.size > maxSize) {
        errors.push(`File size ${file.size} exceeds limit ${maxSize}`);
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function trackUploadProgress(file, onProgress) {
    let uploaded = 0;
    const total = file.size;
    const chunkSize = 1024 * 1024;
    
    const uploadChunk = () => {
        if (uploaded >= total) {
            onProgress(100);
            return Promise.resolve();
        }
        
        const nextChunk = Math.min(uploaded + chunkSize, total);
        uploaded = nextChunk;
        
        const progress = Math.round((uploaded / total) * 100);
        onProgress(progress);
        
        return new Promise(resolve => {
            setTimeout(resolve, 100);
        }).then(uploadChunk);
    };
    
    return uploadChunk();
}

function handleFileUpload(files, options) {
    const results = [];
    
    Array.from(files).forEach(file => {
        const validation = validateFile(file, options.allowedTypes, options.maxSize);
        
        if (validation.isValid) {
            const uploadPromise = trackUploadProgress(file, options.onProgress)
                .then(() => ({
                    file: file.name,
                    status: 'success',
                    size: file.size
                }))
                .catch(error => ({
                    file: file.name,
                    status: 'error',
                    error: error.message
                }));
            
            results.push(uploadPromise);
        } else {
            results.push(Promise.resolve({
                file: file.name,
                status: 'rejected',
                errors: validation.errors
            }));
        }
    });
    
    return Promise.all(results);
}

export { validateFile, trackUploadProgress, handleFileUpload };