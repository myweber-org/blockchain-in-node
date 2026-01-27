function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'notifications', 'language'];
    const fieldTypes = {
        theme: 'string',
        notifications: 'boolean',
        language: 'string'
    };

    for (const field of requiredFields) {
        if (!preferences.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
        }
        if (typeof preferences[field] !== fieldTypes[field]) {
            throw new Error(`Invalid type for field ${field}. Expected ${fieldTypes[field]}, got ${typeof preferences[field]}`);
        }
    }

    const validThemes = ['light', 'dark', 'auto'];
    if (!validThemes.includes(preferences.theme)) {
        throw new Error(`Invalid theme value. Must be one of: ${validThemes.join(', ')}`);
    }

    const validLanguages = ['en', 'es', 'fr', 'de'];
    if (!validLanguages.includes(preferences.language)) {
        throw new Error(`Invalid language value. Must be one of: ${validLanguages.join(', ')}`);
    }

    return true;
}function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'language', 'notifications'];
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];

    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }

    for (const field of requiredFields) {
        if (!(field in preferences)) {
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

    if (preferences.fontSize && (typeof preferences.fontSize !== 'number' || preferences.fontSize < 8 || preferences.fontSize > 72)) {
        throw new Error('Font size must be a number between 8 and 72');
    }

    return true;
}