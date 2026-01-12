function renameFilesWithSequentialNumbering(fileList, baseName) {
    if (!Array.isArray(fileList) || fileList.length === 0) {
        console.error('Invalid file list provided');
        return [];
    }

    if (typeof baseName !== 'string' || baseName.trim() === '') {
        console.error('Invalid base name provided');
        return [];
    }

    const renamedFiles = [];
    const paddedLength = String(fileList.length).length;

    fileList.forEach((file, index) => {
        const sequenceNumber = String(index + 1).padStart(paddedLength, '0');
        const newFileName = `${baseName}_${sequenceNumber}${getFileExtension(file)}`;
        renamedFiles.push({
            original: file,
            renamed: newFileName
        });
    });

    return renamedFiles;
}

function getFileExtension(filename) {
    const lastDotIndex = filename.lastIndexOf('.');
    return lastDotIndex === -1 ? '' : filename.substring(lastDotIndex);
}