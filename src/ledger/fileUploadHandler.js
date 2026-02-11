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
}