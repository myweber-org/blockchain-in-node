function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'language', 'notifications'];
    const allowedThemes = ['light', 'dark', 'auto'];
    const allowedLanguages = ['en', 'es', 'fr', 'de'];
    
    for (const field of requiredFields) {
        if (!preferences.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    
    if (!allowedThemes.includes(preferences.theme)) {
        throw new Error(`Invalid theme. Allowed values: ${allowedThemes.join(', ')}`);
    }
    
    if (!allowedLanguages.includes(preferences.language)) {
        throw new Error(`Invalid language. Allowed values: ${allowedLanguages.join(', ')}`);
    }
    
    if (typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }
    
    if (preferences.hasOwnProperty('fontSize')) {
        const fontSize = parseInt(preferences.fontSize);
        if (isNaN(fontSize) || fontSize < 8 || fontSize > 72) {
            throw new Error('Font size must be a number between 8 and 72');
        }
    }
    
    return true;
}