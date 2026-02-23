function initializeUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        timezone: 'UTC'
    };

    const validatePreference = (key, value) => {
        const validators = {
            theme: (val) => ['light', 'dark', 'auto'].includes(val),
            language: (val) => /^[a-z]{2}$/.test(val),
            notifications: (val) => typeof val === 'boolean',
            timezone: (val) => typeof val === 'string' && val.length > 0
        };

        return validators[key] ? validators[key](value) : false;
    };

    const validatedPrefs = {};
    
    Object.keys(defaults).forEach(key => {
        const userValue = preferences[key];
        if (userValue !== undefined && validatePreference(key, userValue)) {
            validatedPrefs[key] = userValue;
        } else {
            validatedPrefs[key] = defaults[key];
        }
    });

    return Object.freeze(validatedPrefs);
}

function savePreferences(preferences) {
    const validPrefs = initializeUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validPrefs));
    return validPrefs;
}

function loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
        try {
            return initializeUserPreferences(JSON.parse(stored));
        } catch {
            return initializeUserPreferences({});
        }
    }
    return initializeUserPreferences({});
}function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    const validated = { ...defaults, ...preferences };

    if (!['light', 'dark'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (!['en', 'es', 'fr'].includes(validated.language)) {
        validated.language = defaults.language;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (typeof validated.fontSize !== 'number' || validated.fontSize < 12 || validated.fontSize > 24) {
        validated.fontSize = defaults.fontSize;
    }

    return validated;
}

function saveUserPreferences(preferences) {
    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

function loadUserPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
        return validateUserPreferences(JSON.parse(stored));
    }
    return validateUserPreferences({});
}

export { validateUserPreferences, saveUserPreferences, loadUserPreferences };