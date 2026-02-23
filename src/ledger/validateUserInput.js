function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUserInput(username, email) {
    const errors = [];
    
    if (!validateUsername(username)) {
        errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
    }
    
    if (!validateEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateUserInput, validateUsername, validateEmail };function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateUserInput(username, email) {
  const errors = [];
  
  if (!validateUsername(username)) {
    errors.push('Username must be 3-20 characters and contain only letters, numbers, and underscores');
  }
  
  if (!validateEmail(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { validateUsername, validateEmail, validateUserInput };function validateUserInput(input, options = {}) {
  const defaults = {
    maxLength: 100,
    minLength: 1,
    allowSpecialChars: false,
    trim: true
  };
  
  const config = { ...defaults, ...options };
  
  if (typeof input !== 'string') {
    return { isValid: false, error: 'Input must be a string' };
  }
  
  let processedInput = input;
  
  if (config.trim) {
    processedInput = processedInput.trim();
  }
  
  if (processedInput.length < config.minLength) {
    return { 
      isValid: false, 
      error: `Input must be at least ${config.minLength} characters long` 
    };
  }
  
  if (processedInput.length > config.maxLength) {
    return { 
      isValid: false, 
      error: `Input must not exceed ${config.maxLength} characters` 
    };
  }
  
  if (!config.allowSpecialChars) {
    const specialCharRegex = /[<>{}[\];'"`]/;
    if (specialCharRegex.test(processedInput)) {
      return { 
        isValid: false, 
        error: 'Input contains disallowed special characters' 
      };
    }
  }
  
  return { 
    isValid: true, 
    cleanedInput: processedInput,
    length: processedInput.length
  };
}