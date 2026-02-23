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
});