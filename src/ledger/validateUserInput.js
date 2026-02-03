function sanitizeInput(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }
    
    const trimmed = input.trim();
    
    if (trimmed.length === 0) {
        throw new Error('Input cannot be empty after trimming');
    }
    
    const sanitized = trimmed
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
    
    return sanitized.substring(0, 255);
}