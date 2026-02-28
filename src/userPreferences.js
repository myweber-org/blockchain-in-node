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

export { validateUserPreferences, initializeUserPreferences };