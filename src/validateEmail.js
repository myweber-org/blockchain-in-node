function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeEmail(email) {
  return email.trim().toLowerCase();
}

function isDisposableEmail(email) {
  const disposableDomains = [
    'tempmail.com',
    'throwaway.com',
    'mailinator.com'
  ];
  
  const domain = email.split('@')[1];
  return disposableDomains.includes(domain);
}

function validateEmailWithChecks(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, reason: 'Invalid input' };
  }
  
  const sanitizedEmail = sanitizeEmail(email);
  
  if (!validateEmail(sanitizedEmail)) {
    return { valid: false, reason: 'Invalid email format' };
  }
  
  if (isDisposableEmail(sanitizedEmail)) {
    return { valid: false, reason: 'Disposable email not allowed' };
  }
  
  return { valid: true, email: sanitizedEmail };
}

module.exports = {
  validateEmail,
  sanitizeEmail,
  isDisposableEmail,
  validateEmailWithChecks
};