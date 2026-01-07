function validateFileUpload(file, allowedTypes, maxSizeMB) {
    if (!file) {
        throw new Error('No file provided');
    }

    const allowedTypesSet = new Set(allowedTypes);
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fileType = file.type;

    if (!allowedTypesSet.has(fileExtension) && !allowedTypesSet.has(fileType)) {
        throw new Error(`File type not allowed. Allowed types: ${Array.from(allowedTypes).join(', ')}`);
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        throw new Error(`File size exceeds limit of ${maxSizeMB}MB`);
    }

    return {
        isValid: true,
        fileName: file.name,
        fileSize: file.size,
        fileType: fileType
    };
}