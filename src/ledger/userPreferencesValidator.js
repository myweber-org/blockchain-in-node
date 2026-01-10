function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'language', 'notifications'];
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }
    
    for (const field of requiredFields) {
        if (!preferences.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    
    if (!validThemes.includes(preferences.theme)) {
        throw new Error(`Invalid theme. Must be one of: ${validThemes.join(', ')}`);
    }
    
    if (!validLanguages.includes(preferences.language)) {
        throw new Error(`Invalid language. Must be one of: ${validLanguages.join(', ')}`);
    }
    
    if (typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }
    
    if (preferences.hasOwnProperty('timezone')) {
        const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
        if (!timezoneRegex.test(preferences.timezone)) {
            throw new Error('Invalid timezone format');
        }
    }
    
    if (preferences.hasOwnProperty('itemsPerPage')) {
        const items = parseInt(preferences.itemsPerPage);
        if (isNaN(items) || items < 5 || items > 100) {
            throw new Error('Items per page must be between 5 and 100');
        }
    }
    
    return true;
}