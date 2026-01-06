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

export { sanitizeInput, validateEmail, escapeHtml };function sanitizeInput(input) {
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

module.exports = { validateAndSanitize };function sanitizeInput(input) {
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
    if (typeof input !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function processUserData(userInput) {
    const cleanInput = sanitizeInput(userInput);
    
    if (validateEmail(cleanInput)) {
        return { 
            type: 'email', 
            value: cleanInput,
            timestamp: new Date().toISOString()
        };
    }
    
    return { 
        type: 'text', 
        value: cleanInput,
        timestamp: new Date().toISOString()
    };
}

module.exports = { sanitizeInput, validateEmail, processUserData };function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitize(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmedInput = userInput.trim();
    if (trimmedInput.length === 0) {
        return '';
    }
    
    const sanitized = sanitizeInput(trimmedInput);
    const dangerousPatterns = /<script|javascript:|on\w+\s*=/i;
    
    if (dangerousPatterns.test(sanitized)) {
        console.warn('Potentially dangerous input detected and neutralized');
        return sanitized.replace(dangerousPatterns, match => {
            return match.replace(/./g, '&#x' + match.charCodeAt(0).toString(16) + ';');
        });
    }
    
    return sanitized;
}

export { validateAndSanitize };