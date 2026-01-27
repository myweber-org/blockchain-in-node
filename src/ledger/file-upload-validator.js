function validateFileUpload(file, allowedTypes, maxSizeInBytes) {
    if (!file || !allowedTypes || !maxSizeInBytes) {
        throw new Error('Missing required parameters for file validation.');
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fileSize = file.size;

    if (!allowedTypes.includes(fileExtension)) {
        return {
            isValid: false,
            message: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}.`
        };
    }

    if (fileSize > maxSizeInBytes) {
        return {
            isValid: false,
            message: `File size exceeds the limit of ${maxSizeInBytes / (1024 * 1024)} MB.`
        };
    }

    return {
        isValid: true,
        message: 'File validation passed.'
    };
}

function handleFileSelect(event) {
    const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif'];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    const selectedFile = event.target.files[0];
    const validationResult = validateFileUpload(selectedFile, allowedFileTypes, maxFileSize);

    const statusElement = document.getElementById('uploadStatus');
    if (statusElement) {
        statusElement.textContent = validationResult.message;
        statusElement.style.color = validationResult.isValid ? 'green' : 'red';
    }

    if (!validationResult.isValid) {
        event.target.value = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
});