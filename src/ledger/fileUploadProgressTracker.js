function trackUploadProgress(file, onProgress) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            onProgress(percentComplete);
        }
    });

    xhr.open('POST', '/upload');
    xhr.send(formData);

    return xhr;
}

function simulateUpload() {
    const dummyFile = new Blob(['dummy content'], { type: 'text/plain' });
    const progressElement = document.getElementById('uploadProgress');

    const xhr = trackUploadProgress(dummyFile, (progress) => {
        progressElement.textContent = `Upload Progress: ${progress}%`;
        if (progress === 100) {
            progressElement.textContent = 'Upload complete!';
        }
    });
}