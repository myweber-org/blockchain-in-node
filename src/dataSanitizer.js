function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitize(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmed = userInput.trim();
    const sanitized = sanitizeInput(trimmed);
    
    const maxLength = 500;
    if (sanitized.length > maxLength) {
        return sanitized.substring(0, maxLength);
    }
    
    return sanitized;
}

export { validateAndSanitize };function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitize(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmed = userInput.trim();
    const sanitized = sanitizeInput(trimmed);
    
    const allowedPattern = /^[a-zA-Z0-9\s.,!?@-]+$/;
    if (!allowedPattern.test(trimmed)) {
        return '';
    }
    
    return sanitized;
}

export { validateAndSanitize };