const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 14
};

const validThemes = ['light', 'dark', 'auto'];
const validLanguages = ['en', 'es', 'fr', 'de'];

function validatePreferences(prefs) {
  const validated = { ...defaultPreferences };
  
  if (prefs.theme && validThemes.includes(prefs.theme)) {
    validated.theme = prefs.theme;
  }
  
  if (prefs.language && validLanguages.includes(prefs.language)) {
    validated.language = prefs.language;
  }
  
  if (typeof prefs.notifications === 'boolean') {
    validated.notifications = prefs.notifications;
  }
  
  if (typeof prefs.fontSize === 'number' && prefs.fontSize >= 12 && prefs.fontSize <= 24) {
    validated.fontSize = prefs.fontSize;
  }
  
  return validated;
}

function mergePreferences(newPrefs) {
  return validatePreferences({ ...userPreferences, ...newPrefs });
}

export { userPreferences, validatePreferences, mergePreferences };function validateUserPreferences(prefs) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    const validated = { ...defaults };

    if (prefs && typeof prefs === 'object') {
        if (prefs.theme && ['light', 'dark', 'auto'].includes(prefs.theme)) {
            validated.theme = prefs.theme;
        }

        if (prefs.language && ['en', 'es', 'fr', 'de'].includes(prefs.language)) {
            validated.language = prefs.language;
        }

        if (typeof prefs.notifications === 'boolean') {
            validated.notifications = prefs.notifications;
        }

        if (prefs.fontSize && Number.isInteger(prefs.fontSize) && prefs.fontSize >= 12 && prefs.fontSize <= 24) {
            validated.fontSize = prefs.fontSize;
        }
    }

    return validated;
}

function initializeUserPreferences() {
    const stored = localStorage.getItem('userPreferences');
    let parsedPrefs = null;

    try {
        parsedPrefs = stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.warn('Failed to parse stored preferences, using defaults');
    }

    const preferences = validateUserPreferences(parsedPrefs);
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    return preferences;
}

export { validateUserPreferences, initializeUserPreferences };const USER_PREFERENCES_KEY = 'app_user_preferences';

const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
};

function getUserPreferences() {
    const stored = localStorage.getItem(USER_PREFERENCES_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (error) {
            console.error('Failed to parse stored preferences:', error);
            return defaultPreferences;
        }
    }
    return defaultPreferences;
}

function saveUserPreferences(preferences) {
    try {
        const merged = { ...defaultPreferences, ...preferences };
        localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(merged));
        return true;
    } catch (error) {
        console.error('Failed to save preferences:', error);
        return false;
    }
}

function resetUserPreferences() {
    localStorage.removeItem(USER_PREFERENCES_KEY);
    return defaultPreferences;
}

function updatePreference(key, value) {
    const current = getUserPreferences();
    const updated = { ...current, [key]: value };
    return saveUserPreferences(updated);
}

export {
    getUserPreferences,
    saveUserPreferences,
    resetUserPreferences,
    updatePreference
};