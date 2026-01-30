const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

function validateFile(file) {
    if (!file) {
        return { valid: false, error: 'No file selected' };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        return { 
            valid: false, 
            error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(', ')}` 
        };
    }

    if (file.size > MAX_FILE_SIZE) {
        return { 
            valid: false, 
            error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` 
        };
    }

    return { valid: true, error: null };
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    const validation = validateFile(file);
    
    if (!validation.valid) {
        alert(validation.error);
        event.target.value = '';
        return;
    }
    
    console.log('File validated successfully:', file.name);
}

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
});