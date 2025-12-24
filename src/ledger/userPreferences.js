function validatePreferences(prefs) {
    const defaults = {
        theme: 'light',
        notifications: true,
        language: 'en',
        timezone: 'UTC',
        resultsPerPage: 25
    };

    const validated = { ...defaults, ...prefs };

    if (!['light', 'dark', 'auto'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (!Number.isInteger(validated.resultsPerPage) || validated.resultsPerPage < 10 || validated.resultsPerPage > 100) {
        validated.resultsPerPage = defaults.resultsPerPage;
    }

    return Object.freeze(validated);
}

function savePreferences(prefs) {
    try {
        const validated = validatePreferences(prefs);
        localStorage.setItem('userPreferences', JSON.stringify(validated));
        return { success: true, preferences: validated };
    } catch (error) {
        console.error('Failed to save preferences:', error);
        return { success: false, error: error.message };
    }
}

function loadPreferences() {
    try {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            return validatePreferences(JSON.parse(stored));
        }
        return validatePreferences({});
    } catch (error) {
        console.error('Failed to load preferences:', error);
        return validatePreferences({});
    }
}

export { validatePreferences, savePreferences, loadPreferences };