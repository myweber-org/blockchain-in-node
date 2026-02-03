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
}function addTimestampPrefix(filename) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    return `${timestamp}_${filename}`;
}

function renameFiles(fileList) {
    if (!Array.isArray(fileList)) {
        throw new Error('Input must be an array of filenames');
    }
    
    return fileList.map(filename => {
        if (typeof filename !== 'string') {
            throw new Error('Each item must be a string');
        }
        return addTimestampPrefix(filename);
    });
}

module.exports = {
    addTimestampPrefix,
    renameFiles
};