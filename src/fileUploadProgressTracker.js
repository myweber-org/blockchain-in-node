function trackUploadProgress(file, onProgress) {
    const startTime = Date.now();
    let lastLoaded = 0;
    let lastTime = startTime;

    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const currentTime = Date.now();
            const loaded = event.loaded;
            const total = event.total;
            
            const percentage = Math.round((loaded / total) * 100);
            const speed = calculateSpeed(loaded, lastLoaded, currentTime, lastTime);
            
            lastLoaded = loaded;
            lastTime = currentTime;
            
            onProgress({
                percentage: percentage,
                loaded: loaded,
                total: total,
                speed: speed,
                timeElapsed: currentTime - startTime
            });
        }
    });
    
    xhr.open('POST', '/upload');
    xhr.send(file);
}

function calculateSpeed(currentLoaded, previousLoaded, currentTime, previousTime) {
    const timeDiff = (currentTime - previousTime) / 1000;
    if (timeDiff === 0) return 0;
    
    const dataDiff = currentLoaded - previousLoaded;
    const speedBps = dataDiff / timeDiff;
    
    if (speedBps >= 1048576) {
        return (speedBps / 1048576).toFixed(2) + ' MB/s';
    } else if (speedBps >= 1024) {
        return (speedBps / 1024).toFixed(2) + ' KB/s';
    } else {
        return speedBps.toFixed(2) + ' B/s';
    }
}

function formatTimeRemaining(loaded, total, speed) {
    if (speed === 0) return 'Calculating...';
    
    const remainingBytes = total - loaded;
    const speedNum = parseFloat(speed);
    const timeSeconds = remainingBytes / speedNum;
    
    if (timeSeconds > 3600) {
        return (timeSeconds / 3600).toFixed(1) + ' hours';
    } else if (timeSeconds > 60) {
        return (timeSeconds / 60).toFixed(1) + ' minutes';
    } else {
        return timeSeconds.toFixed(1) + ' seconds';
    }
}