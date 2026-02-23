const uploadProgressTracker = (() => {
    const progressBars = new Map();
    const uploadEvents = new Map();

    const createProgressElement = (fileId) => {
        const container = document.createElement('div');
        container.className = 'upload-progress-container';
        container.dataset.fileId = fileId;

        const fileName = document.createElement('span');
        fileName.className = 'file-name';
        fileName.textContent = `Uploading: ${fileId}`;

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `
            <div class="progress-fill"></div>
            <span class="progress-text">0%</span>
        `;

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'cancel-upload';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = () => cancelUpload(fileId);

        container.appendChild(fileName);
        container.appendChild(progressBar);
        container.appendChild(cancelBtn);

        progressBars.set(fileId, {
            container,
            fill: progressBar.querySelector('.progress-fill'),
            text: progressBar.querySelector('.progress-text')
        });

        return container;
    };

    const updateProgress = (fileId, percentage) => {
        const progress = progressBars.get(fileId);
        if (!progress) return;

        const clampedPercentage = Math.min(100, Math.max(0, percentage));
        progress.fill.style.width = `${clampedPercentage}%`;
        progress.text.textContent = `${Math.round(clampedPercentage)}%`;

        if (clampedPercentage === 100) {
            progress.container.classList.add('completed');
            setTimeout(() => {
                progress.container.remove();
                progressBars.delete(fileId);
                uploadEvents.delete(fileId);
            }, 1500);
        }
    };

    const cancelUpload = (fileId) => {
        const event = uploadEvents.get(fileId);
        if (event && event.cancelable) {
            event.dispatchEvent(new CustomEvent('uploadCancelled', {
                detail: { fileId }
            }));
        }

        const progress = progressBars.get(fileId);
        if (progress) {
            progress.container.remove();
            progressBars.delete(fileId);
        }
        uploadEvents.delete(fileId);
    };

    const handleUploadError = (fileId, error) => {
        const progress = progressBars.get(fileId);
        if (progress) {
            progress.container.classList.add('error');
            progress.text.textContent = `Error: ${error.message}`;
            progress.container.querySelector('.cancel-upload').textContent = 'Dismiss';

            setTimeout(() => {
                progress.container.remove();
                progressBars.delete(fileId);
                uploadEvents.delete(fileId);
            }, 5000);
        }
    };

    const trackUpload = (file, uploadEvent) => {
        const fileId = `${file.name}-${Date.now()}`;
        const progressElement = createProgressElement(fileId);
        document.getElementById('upload-container').appendChild(progressElement);

        uploadEvents.set(fileId, uploadEvent);

        uploadEvent.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                updateProgress(fileId, percentComplete);
            }
        });

        uploadEvent.addEventListener('error', (e) => {
            handleUploadError(fileId, e.error || new Error('Upload failed'));
        });

        uploadEvent.addEventListener('abort', () => {
            cancelUpload(fileId);
        });

        return fileId;
    };

    return {
        trackUpload,
        cancelUpload,
        getActiveUploads: () => Array.from(progressBars.keys())
    };
})();