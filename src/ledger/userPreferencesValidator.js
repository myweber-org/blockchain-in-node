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
}function validateUserPreferences(preferences) {
    const errors = [];

    if (!preferences || typeof preferences !== 'object') {
        errors.push('Preferences must be an object');
        return errors;
    }

    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        errors.push('Theme must be one of: light, dark, auto');
    }

    if (preferences.language && typeof preferences.language !== 'string') {
        errors.push('Language must be a string');
    }

    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        errors.push('Notifications must be a boolean value');
    }

    if (preferences.timezone) {
        const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
        if (!timezoneRegex.test(preferences.timezone)) {
            errors.push('Timezone must be in format: Area/Location');
        }
    }

    if (preferences.itemsPerPage && (typeof preferences.itemsPerPage !== 'number' || preferences.itemsPerPage < 1 || preferences.itemsPerPage > 100)) {
        errors.push('Items per page must be a number between 1 and 100');
    }

    return errors;
}