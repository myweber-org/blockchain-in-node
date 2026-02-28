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
};function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

function validateAndSanitize(userInput) {
  if (typeof userInput !== 'string') {
    return '';
  }
  
  const trimmedInput = userInput.trim();
  const sanitized = sanitizeInput(trimmedInput);
  
  const patterns = {
    script: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    onEvent: /on\w+="[^"]*"/gi,
    javascript: /javascript:/gi
  };
  
  let result = sanitized;
  for (const pattern in patterns) {
    result = result.replace(patterns[pattern], '');
  }
  
  return result;
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
    
    const trimmedInput = userInput.trim();
    if (trimmedInput.length === 0) {
        return '';
    }
    
    const sanitized = sanitizeInput(trimmedInput);
    const maxLength = 1000;
    
    return sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
}

export { validateAndSanitize };function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
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

function validateAndSanitizeUserInput(rawInput) {
    if (typeof rawInput !== 'string') {
        return '';
    }
    
    const trimmed = rawInput.trim();
    if (trimmed.length === 0) {
        return '';
    }
    
    const sanitized = sanitizeInput(trimmed);
    const maxLength = 500;
    
    return sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
}

export { validateAndSanitizeUserInput };