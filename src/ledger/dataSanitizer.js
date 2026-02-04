function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

module.exports = {
    sanitizeInput,
    validateEmail,
    escapeHtml
};function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitizeUserInput(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmedInput = userInput.trim();
    if (trimmedInput.length === 0) {
        return '';
    }
    
    const sanitized = sanitizeInput(trimmedInput);
    const maxLength = 500;
    
    return sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
}

export { validateAndSanitizeUserInput };function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };
    
    const reg = /[&<>"'/]/ig;
    return input.replace(reg, (match) => map[match]);
}

function validateAndSanitizeUserData(userInput) {
    const sanitized = sanitizeInput(userInput);
    
    if (sanitized.length === 0) {
        throw new Error('Invalid input provided');
    }
    
    if (sanitized.length > 1000) {
        throw new Error('Input exceeds maximum length');
    }
    
    return sanitized;
}

module.exports = {
    sanitizeInput,
    validateAndSanitizeUserData
};