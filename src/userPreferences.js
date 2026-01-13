function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        timezone: 'UTC'
    };

    const validated = { ...defaults };

    if (preferences && typeof preferences === 'object') {
        if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
            validated.theme = preferences.theme;
        }

        if (preferences.language && /^[a-z]{2}(-[A-Z]{2})?$/.test(preferences.language)) {
            validated.language = preferences.language;
        }

        if (typeof preferences.notifications === 'boolean') {
            validated.notifications = preferences.notifications;
        }

        if (preferences.timezone && Intl.supportedValuesOf('timeZone').includes(preferences.timezone)) {
            validated.timezone = preferences.timezone;
        }
    }

    return validated;
}

function initializeUserSettings(userId) {
    const stored = localStorage.getItem(`user_prefs_${userId}`);
    let preferences = null;

    try {
        preferences = stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.warn('Failed to parse stored preferences, using defaults');
    }

    const validatedPrefs = validateUserPreferences(preferences);
    localStorage.setItem(`user_prefs_${userId}`, JSON.stringify(validatedPrefs));
    
    return validatedPrefs;
}

export { validateUserPreferences, initializeUserSettings };