function validatePreferences(preferences) {
    const allowedThemes = ['light', 'dark', 'auto'];
    const allowedLanguages = ['en', 'es', 'fr', 'de'];
    
    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }
    
    if (preferences.theme && !allowedThemes.includes(preferences.theme)) {
        throw new Error(`Theme must be one of: ${allowedThemes.join(', ')}`);
    }
    
    if (preferences.language && !allowedLanguages.includes(preferences.language)) {
        throw new Error(`Language must be one of: ${allowedLanguages.join(', ')}`);
    }
    
    if (preferences.fontSize && (typeof preferences.fontSize !== 'number' || preferences.fontSize < 8 || preferences.fontSize > 72)) {
        throw new Error('Font size must be a number between 8 and 72');
    }
    
    if (preferences.notifications && typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }
    
    return true;
}