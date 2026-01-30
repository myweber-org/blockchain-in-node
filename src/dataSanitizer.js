function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    const element = document.createElement('div');
    element.textContent = input;
    
    return element.innerHTML
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) ? sanitizeInput(email) : '';
}

function sanitizeObject(obj) {
    if (!obj || typeof obj !== 'object') return {};
    
    const sanitized = {};
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            sanitized[key] = sanitizeInput(obj[key]);
        } else {
            sanitized[key] = obj[key];
        }
    }
    return sanitized;
}

export { sanitizeInput, validateEmail, sanitizeObject };function sanitizeInput(input) {
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
  
  const regex = /^[a-zA-Z0-9\s.,!?-]*$/;
  if (!regex.test(sanitized)) {
    return '';
  }
  
  return sanitized;
}

export { validateAndSanitize };