const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

function validateFile(file) {
    if (!file) {
        return { valid: false, error: 'No file selected' };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        return { valid: false, error: 'Invalid file type. Only JPEG, PNG and GIF are allowed' };
    }

    if (file.size > MAX_FILE_SIZE) {
        return { valid: false, error: 'File size exceeds 5MB limit' };
    }

    return { valid: true, error: null };
}

function validateMultipleFiles(files) {
    const results = [];
    let hasError = false;

    for (let i = 0; i < files.length; i++) {
        const result = validateFile(files[i]);
        results.push(result);
        if (!result.valid) {
            hasError = true;
        }
    }

    return {
        allValid: !hasError,
        results: results
    };
}

export { validateFile, validateMultipleFiles };