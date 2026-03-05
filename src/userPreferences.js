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
};const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25
};

function validatePreferences(userPrefs) {
  const validPrefs = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (['light', 'dark', 'auto'].includes(userPrefs.theme)) {
      validPrefs.theme = userPrefs.theme;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validPrefs.notifications = userPrefs.notifications;
    }
    
    if (['en', 'es', 'fr', 'de'].includes(userPrefs.language)) {
      validPrefs.language = userPrefs.language;
    }
    
    if (Number.isInteger(userPrefs.resultsPerPage) && 
        userPrefs.resultsPerPage >= 10 && 
        userPrefs.resultsPerPage <= 100) {
      validPrefs.resultsPerPage = userPrefs.resultsPerPage;
    }
  }
  
  return validPrefs;
}

function savePreferences(preferences) {
  const validPrefs = validatePreferences(preferences);
  localStorage.setItem('userPreferences', JSON.stringify(validPrefs));
  return validPrefs;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return validatePreferences(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
    }
  }
  return { ...defaultPreferences };
}

export { validatePreferences, savePreferences, loadPreferences, defaultPreferences };const USER_PREFERENCES_KEY = 'app_preferences';

const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  fontSize: 16,
  autoSave: false
};

function validatePreferences(preferences) {
  const validThemes = ['light', 'dark', 'auto'];
  const validLanguages = ['en', 'es', 'fr', 'de'];
  
  if (!preferences || typeof preferences !== 'object') {
    return false;
  }

  if (preferences.theme && !validThemes.includes(preferences.theme)) {
    return false;
  }

  if (preferences.language && !validLanguages.includes(preferences.language)) {
    return false;
  }

  if (preferences.fontSize && (typeof preferences.fontSize !== 'number' || preferences.fontSize < 12 || preferences.fontSize > 24)) {
    return false;
  }

  if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
    return false;
  }

  if (preferences.autoSave !== undefined && typeof preferences.autoSave !== 'boolean') {
    return false;
  }

  return true;
}

function saveUserPreferences(preferences) {
  if (!validatePreferences(preferences)) {
    throw new Error('Invalid preferences format');
  }

  const mergedPreferences = {
    ...defaultPreferences,
    ...preferences
  };

  try {
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(mergedPreferences));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadUserPreferences() {
  try {
    const stored = localStorage.getItem(USER_PREFERENCES_KEY);
    if (!stored) {
      return defaultPreferences;
    }

    const parsed = JSON.parse(stored);
    if (validatePreferences(parsed)) {
      return parsed;
    }
    
    return defaultPreferences;
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return defaultPreferences;
  }
}

function resetUserPreferences() {
  try {
    localStorage.removeItem(USER_PREFERENCES_KEY);
    return true;
  } catch (error) {
    console.error('Failed to reset preferences:', error);
    return false;
  }
}

function getUserPreference(key) {
  const preferences = loadUserPreferences();
  return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
}

export {
  saveUserPreferences,
  loadUserPreferences,
  resetUserPreferences,
  getUserPreference,
  validatePreferences
};function validateUserPreferences(prefs) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
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

    if (typeof validatedPrefs.fontSize !== 'number' || 
        validatedPrefs.fontSize < 12 || 
        validatedPrefs.fontSize > 24) {
        validatedPrefs.fontSize = defaults.fontSize;
    }

    return validatedPrefs;
}

function initializeUserPreferences() {
    const storedPrefs = localStorage.getItem('userPreferences');
    let userPrefs = {};

    try {
        userPrefs = storedPrefs ? JSON.parse(storedPrefs) : {};
    } catch (error) {
        console.error('Failed to parse stored preferences:', error);
    }

    const validatedPrefs = validateUserPreferences(userPrefs);
    
    if (JSON.stringify(userPrefs) !== JSON.stringify(validatedPrefs)) {
        localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    }

    return validatedPrefs;
}

function updateUserPreferences(newPrefs) {
    const currentPrefs = initializeUserPreferences();
    const updatedPrefs = validateUserPreferences({ ...currentPrefs, ...newPrefs });
    
    localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
    
    return updatedPrefs;
}

export { validateUserPreferences, initializeUserPreferences, updateUserPreferences };