function validateUserPreferences(preferences) {
    const errors = [];

    if (!preferences || typeof preferences !== 'object') {
        errors.push('Preferences must be a valid object');
        return errors;
    }

    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        errors.push('Theme must be one of: light, dark, auto');
    }

    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        errors.push('Notifications must be a boolean value');
    }

    if (preferences.language && typeof preferences.language !== 'string') {
        errors.push('Language must be a string');
    }

    if (preferences.timezone) {
        const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
        if (!timezoneRegex.test(preferences.timezone)) {
            errors.push('Timezone must be in format: Area/Location');
        }
    }

    if (preferences.itemsPerPage !== undefined) {
        const items = parseInt(preferences.itemsPerPage);
        if (isNaN(items) || items < 5 || items > 100) {
            errors.push('Items per page must be between 5 and 100');
        }
    }

    return errors;
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
        throw new Error(`Invalid language code. Must be one of: ${validLanguages.join(', ')}`);
    }

    return true;
}function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'language', 'notifications'];
    const allowedThemes = ['light', 'dark', 'auto'];
    const allowedLanguages = ['en', 'es', 'fr', 'de'];

    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }

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
            throw new Error('Invalid timezone format. Use format: Area/Location');
        }
    }

    return true;
}function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'notifications', 'language'];
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

    if (typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }

    if (!allowedLanguages.includes(preferences.language)) {
        throw new Error(`Invalid language. Allowed values: ${allowedLanguages.join(', ')}`);
    }

    if (preferences.hasOwnProperty('itemsPerPage')) {
        const items = parseInt(preferences.itemsPerPage);
        if (isNaN(items) || items < 5 || items > 100) {
            throw new Error('Items per page must be a number between 5 and 100');
        }
    }

    return true;
}