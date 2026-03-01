const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

function validateFile(file) {
    if (!file) {
        return { valid: false, error: 'No file selected' };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        return { 
            valid: false, 
            error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(', ')}` 
        };
    }

    if (file.size > MAX_FILE_SIZE) {
        return { 
            valid: false, 
            error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` 
        };
    }

    return { valid: true, error: null };
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    const validation = validateFile(file);
    
    if (!validation.valid) {
        alert(validation.error);
        event.target.value = '';
        return;
    }
    
    console.log('File validated successfully:', file.name);
}

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
});const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image and PDF files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

module.exports = upload;