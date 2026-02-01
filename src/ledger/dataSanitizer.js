function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

function validateAndSanitizeFormData(formData) {
  const sanitizedData = {};
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      sanitizedData[key] = sanitizeInput(value);
    } else {
      sanitizedData[key] = value;
    }
  }
  
  return sanitizedData;
}

export { sanitizeInput, validateAndSanitizeFormData };function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    const dangerousPatterns = [
        /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /data:/gi,
        /vbscript:/gi
    ];
    
    let sanitized = input.trim();
    
    dangerousPatterns.forEach(pattern => {
        sanitized = sanitized.replace(pattern, '');
    });
    
    const safeChars = sanitized.replace(/[^\w\s@.-]/g, '');
    
    return safeChars.substring(0, 255);
}

function validateEmail(email) {
    const sanitizedEmail = sanitizeInput(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sanitizedEmail);
}

module.exports = {
    sanitizeInput,
    validateEmail
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
    
    const regex = /^[a-zA-Z0-9\s.,!?-]*$/;
    if (!regex.test(trimmedInput)) {
        console.warn('Input contains potentially dangerous characters');
        return '';
    }
    
    return sanitized;
}

export { validateAndSanitize };