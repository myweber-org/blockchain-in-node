const uploadProgress = (file, onProgress, onComplete, onError) => {
  if (!file) {
    onError('No file provided');
    return;
  }

  const totalSize = file.size;
  let uploadedSize = 0;
  const chunkSize = 1024 * 1024; // 1MB chunks
  const totalChunks = Math.ceil(totalSize / chunkSize);
  let currentChunk = 0;

  const simulateUpload = () => {
    if (currentChunk >= totalChunks) {
      onComplete({ totalSize, uploadedSize });
      return;
    }

    const chunkStart = currentChunk * chunkSize;
    const chunkEnd = Math.min(chunkStart + chunkSize, totalSize);
    const chunk = file.slice(chunkStart, chunkEnd);

    // Simulate network delay
    const delay = Math.random() * 500 + 100;

    setTimeout(() => {
      uploadedSize += chunkEnd - chunkStart;
      currentChunk++;

      const progress = Math.round((uploadedSize / totalSize) * 100);
      onProgress({
        loaded: uploadedSize,
        total: totalSize,
        percentage: progress,
        chunk: currentChunk,
        totalChunks: totalChunks
      });

      // Randomly simulate errors (10% chance)
      if (Math.random() < 0.1) {
        onError(`Upload failed at chunk ${currentChunk}`);
        return;
      }

      simulateUpload();
    }, delay);
  };

  simulateUpload();
};

const createProgressHandler = (fileId) => {
  return {
    onProgress: (data) => {
      console.log(`File ${fileId}: ${data.percentage}% uploaded (${data.loaded}/${data.total} bytes)`);
    },
    onComplete: (data) => {
      console.log(`File ${fileId}: Upload complete. Total: ${data.totalSize} bytes`);
    },
    onError: (error) => {
      console.error(`File ${fileId}: ${error}`);
    }
  };
};

// Example usage
const handleFileSelect = (event) => {
  const files = event.target.files;
  
  Array.from(files).forEach((file, index) => {
    const fileId = `file-${index}-${Date.now()}`;
    const handlers = createProgressHandler(fileId);
    
    console.log(`Starting upload: ${file.name} (${file.size} bytes)`);
    
    uploadProgress(
      file,
      handlers.onProgress,
      handlers.onComplete,
      handlers.onError
    );
  });
};

// Initialize file input
const initializeUploader = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.multiple = true;
  fileInput.addEventListener('change', handleFileSelect);
  
  document.body.appendChild(fileInput);
  fileInput.click();
};

// Export for module usage
export { uploadProgress, createProgressHandler, initializeUploader };