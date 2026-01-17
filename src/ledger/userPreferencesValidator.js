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
}function validateUserPreferences(prefs) {
    const requiredFields = ['theme', 'notifications', 'language'];
    const fieldTypes = {
        theme: 'string',
        notifications: 'boolean',
        language: 'string'
    };

    for (const field of requiredFields) {
        if (!prefs.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
        }
        if (typeof prefs[field] !== fieldTypes[field]) {
            throw new Error(`Invalid type for field ${field}. Expected ${fieldTypes[field]}, got ${typeof prefs[field]}`);
        }
    }

    const validThemes = ['light', 'dark', 'auto'];
    if (!validThemes.includes(prefs.theme)) {
        throw new Error(`Invalid theme value. Must be one of: ${validThemes.join(', ')}`);
    }

    const validLanguages = ['en', 'es', 'fr', 'de'];
    if (!validLanguages.includes(prefs.language)) {
        throw new Error(`Invalid language value. Must be one of: ${validLanguages.join(', ')}`);
    }

    return true;
}function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'notifications', 'language'];
    const validationRules = {
        theme: ['light', 'dark', 'auto'],
        notifications: ['enabled', 'disabled'],
        language: ['en', 'es', 'fr', 'de']
    };

    for (const field of requiredFields) {
        if (!preferences.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    for (const [field, value] of Object.entries(preferences)) {
        if (validationRules[field]) {
            if (!validationRules[field].includes(value)) {
                throw new Error(`Invalid value for ${field}: ${value}. Allowed values: ${validationRules[field].join(', ')}`);
            }
        }
    }

    return true;
}function validateUserPreferences(preferences) {
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
    
    if (preferences.hasOwnProperty('timezone')) {
        const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
        if (!timezoneRegex.test(preferences.timezone)) {
            throw new Error('Invalid timezone format');
        }
    }
    
    return true;
}