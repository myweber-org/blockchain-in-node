function validateFile(file, maxSize) {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  const fileSize = file.size / 1024 / 1024;

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.');
  }

  if (fileSize > maxSize) {
    throw new Error(`File size exceeds ${maxSize}MB limit.`);
  }

  return {
    name: file.name,
    type: file.type,
    size: fileSize.toFixed(2) + 'MB',
    lastModified: new Date(file.lastModified).toISOString()
  };
}

function handleFileUpload(event, maxSizeMB = 5) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const fileInfo = validateFile(file, maxSizeMB);
    console.log('File validated successfully:', fileInfo);
    return fileInfo;
  } catch (error) {
    console.error('Upload failed:', error.message);
    event.target.value = '';
    alert(error.message);
    return null;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const uploadInput = document.getElementById('fileUpload');
  if (uploadInput) {
    uploadInput.addEventListener('change', function(e) {
      handleFileUpload(e, 10);
    });
  }
});