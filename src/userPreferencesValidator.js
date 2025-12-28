function validateUserPreferences(preferences) {
    const validKeys = ['theme', 'language', 'notifications', 'timezone'];
    const requiredKeys = ['theme', 'language'];
    
    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }
    
    const preferenceKeys = Object.keys(preferences);
    
    for (const key of preferenceKeys) {
        if (!validKeys.includes(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
    }
    
    for (const requiredKey of requiredKeys) {
        if (!preferenceKeys.includes(requiredKey)) {
            throw new Error(`Missing required preference: ${requiredKey}`);
        }
    }
    
    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        throw new Error('Theme must be one of: light, dark, auto');
    }
    
    if (preferences.language && preferences.language.length !== 2) {
        throw new Error('Language code must be 2 characters');
    }
    
    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }
    
    if (preferences.timezone && !/^[A-Za-z_]+\/[A-Za-z_]+$/.test(preferences.timezone)) {
        throw new Error('Timezone must be in format: Area/Location');
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
    const errors = [];

    if (!preferences || typeof preferences !== 'object') {
        return ['Invalid preferences object'];
    }

    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        errors.push('Theme must be light, dark, or auto');
    }

    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        errors.push('Notifications must be a boolean value');
    }

    if (preferences.itemsPerPage && (typeof preferences.itemsPerPage !== 'number' || preferences.itemsPerPage < 1 || preferences.itemsPerPage > 100)) {
        errors.push('Items per page must be a number between 1 and 100');
    }

    if (preferences.language && typeof preferences.language !== 'string') {
        errors.push('Language must be a string');
    }

    if (preferences.timezone && !/^[A-Za-z_]+\/[A-Za-z_]+$/.test(preferences.timezone)) {
        errors.push('Timezone must be in format Area/Location');
    }

    return errors;
}

module.exports = { validateUserPreferences };