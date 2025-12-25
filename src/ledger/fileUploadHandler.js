function validateFile(file, maxSize) {
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
                throw new Error('File type not allowed');
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
                throw new Error('Upload failed');
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