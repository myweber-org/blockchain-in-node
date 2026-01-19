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

export { sanitizeInput, validateAndSanitizeFormData };