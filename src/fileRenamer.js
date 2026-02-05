function renameFilesWithSequentialNumbers(files, baseName) {
    return files.map((file, index) => {
        const extension = file.split('.').pop();
        const newName = `${baseName}_${String(index + 1).padStart(3, '0')}.${extension}`;
        return { original: file, renamed: newName };
    });
}