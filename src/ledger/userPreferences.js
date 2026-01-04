function validateUserPreferences(prefs) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        timezone: 'UTC'
    };

    const validatedPrefs = { ...defaults, ...prefs };

    if (!['light', 'dark', 'auto'].includes(validatedPrefs.theme)) {
        validatedPrefs.theme = defaults.theme;
    }

    if (!['en', 'es', 'fr', 'de'].includes(validatedPrefs.language)) {
        validatedPrefs.language = defaults.language;
    }

    if (typeof validatedPrefs.notifications !== 'boolean') {
        validatedPrefs.notifications = defaults.notifications;
    }

    if (!/^[A-Za-z_]+\/[A-Za-z_]+$/.test(validatedPrefs.timezone)) {
        validatedPrefs.timezone = defaults.timezone;
    }

    return validatedPrefs;
}

function initializeUserPreferences() {
    const storedPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const validatedPrefs = validateUserPreferences(storedPrefs);
    
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    return validatedPrefs;
}

function updateUserPreferences(newPrefs) {
    const currentPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const mergedPrefs = { ...currentPrefs, ...newPrefs };
    const validatedPrefs = validateUserPreferences(mergedPrefs);
    
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    return validatedPrefs;
}

export { validateUserPreferences, initializeUserPreferences, updateUserPreferences };