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
    if (trimmed.length === 0) {
        return '';
    }
    
    const sanitized = sanitizeInput(trimmed);
    const maxLength = 1000;
    
    return sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
}

module.exports = { validateAndSanitize };