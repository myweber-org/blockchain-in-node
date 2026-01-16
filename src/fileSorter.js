
function sortFiles(files) {
    return files.sort((a, b) => {
        const extA = a.name.split('.').pop().toLowerCase();
        const extB = b.name.split('.').pop().toLowerCase();
        
        if (extA !== extB) {
            return extA.localeCompare(extB);
        }
        
        return a.size - b.size;
    });
}

function groupFilesByExtension(files) {
    const grouped = {};
    
    files.forEach(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        if (!grouped[ext]) {
            grouped[ext] = [];
        }
        grouped[ext].push(file);
    });
    
    return grouped;
}

function getTotalSize(files) {
    return files.reduce((total, file) => total + file.size, 0);
}

export { sortFiles, groupFilesByExtension, getTotalSize };
function sortFilesByExtensionAndSize(files) {
    return files.sort((a, b) => {
        const extA = a.name.split('.').pop().toLowerCase();
        const extB = b.name.split('.').pop().toLowerCase();
        
        if (extA !== extB) {
            return extA.localeCompare(extB);
        }
        
        return a.size - b.size;
    });
}

function validateFileList(files) {
    if (!Array.isArray(files)) {
        throw new TypeError('Input must be an array of file objects');
    }
    
    return files.every(file => 
        file && 
        typeof file === 'object' && 
        'name' in file && 
        'size' in file
    );
}

function getFileStatistics(files) {
    if (!validateFileList(files)) {
        return null;
    }
    
    const sortedFiles = sortFilesByExtensionAndSize(files);
    const stats = {
        totalFiles: sortedFiles.length,
        totalSize: sortedFiles.reduce((sum, file) => sum + file.size, 0),
        extensions: {}
    };
    
    sortedFiles.forEach(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        if (!stats.extensions[ext]) {
            stats.extensions[ext] = { count: 0, totalSize: 0 };
        }
        stats.extensions[ext].count++;
        stats.extensions[ext].totalSize += file.size;
    });
    
    return stats;
}

module.exports = {
    sortFilesByExtensionAndSize,
    validateFileList,
    getFileStatistics
};function sortFiles(files) {
    return files.sort((a, b) => {
        const extA = a.name.split('.').pop().toLowerCase();
        const extB = b.name.split('.').pop().toLowerCase();
        if (extA !== extB) {
            return extA.localeCompare(extB);
        }
        return a.size - b.size;
    });
}

export { sortFiles };