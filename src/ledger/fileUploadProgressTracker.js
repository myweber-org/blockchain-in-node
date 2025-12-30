function trackUploadProgress(fileInputId, progressBarId, statusId) {
    const fileInput = document.getElementById(fileInputId);
    const progressBar = document.getElementById(progressBarId);
    const statusDisplay = document.getElementById(statusId);

    if (!fileInput || !progressBar || !statusDisplay) {
        console.error('Required elements not found');
        return;
    }

    fileInput.addEventListener('change', function(event) {
        const files = event.target.files;
        if (files.length === 0) {
            statusDisplay.textContent = 'No file selected';
            return;
        }

        const file = files[0];
        statusDisplay.textContent = `Uploading: ${file.name}`;
        progressBar.value = 0;
        progressBar.max = 100;

        simulateUpload(file, progressBar, statusDisplay);
    });

    function simulateUpload(file, progressBar, statusDisplay) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                statusDisplay.textContent = `Upload complete: ${file.name}`;
                progressBar.classList.add('complete');
            }
            progressBar.value = progress;
            statusDisplay.textContent = `Uploading ${file.name}: ${Math.round(progress)}%`;
        }, 200);
    }

    progressBar.addEventListener('error', function() {
        statusDisplay.textContent = 'Upload failed. Please try again.';
        progressBar.value = 0;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    trackUploadProgress('fileInput', 'uploadProgress', 'uploadStatus');
});