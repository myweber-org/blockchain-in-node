const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: false
};

const defaultPreferences = {
  theme: 'dark',
  language: 'en',
  notifications: false,
  fontSize: 14,
  autoSave: true
};

function validatePreferences(prefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validated = {};
  
  validKeys.forEach(key => {
    if (prefs.hasOwnProperty(key)) {
      if (key === 'fontSize' && typeof prefs[key] === 'number') {
        validated[key] = Math.max(8, Math.min(prefs[key], 72));
      } else if (key === 'notifications' || key === 'autoSave') {
        validated[key] = Boolean(prefs[key]);
      } else {
        validated[key] = prefs[key];
      }
    } else {
      validated[key] = defaultPreferences[key];
    }
  });
  
  return validated;
}

function mergePreferences(userPrefs) {
  return {
    ...defaultPreferences,
    ...validatePreferences(userPrefs)
  };
}

function savePreferences(prefs) {
  const validPrefs = mergePreferences(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validPrefs));
  return validPrefs;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return mergePreferences(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to parse stored preferences:', e);
    }
  }
  return { ...defaultPreferences };
}

export { savePreferences, loadPreferences, validatePreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        notifications: true,
        language: 'en',
        timezone: 'UTC',
        resultsPerPage: 25
    };

    const validated = { ...defaults, ...preferences };

    if (!['light', 'dark', 'auto'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (!Number.isInteger(validated.resultsPerPage) || validated.resultsPerPage < 10 || validated.resultsPerPage > 100) {
        validated.resultsPerPage = defaults.resultsPerPage;
    }

    return validated;
}

function savePreferences(preferences) {
    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

function loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
        try {
            return validateUserPreferences(JSON.parse(stored));
        } catch (error) {
            console.error('Failed to parse stored preferences:', error);
        }
    }
    return validateUserPreferences({});
}

export { validateUserPreferences, savePreferences, loadPreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        notifications: true,
        language: 'en',
        resultsPerPage: 20,
        timezone: 'UTC'
    };

    const validated = { ...defaults, ...preferences };

    if (!['light', 'dark', 'auto'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (!['en', 'es', 'fr', 'de'].includes(validated.language)) {
        validated.language = defaults.language;
    }

    if (!Number.isInteger(validated.resultsPerPage) || validated.resultsPerPage < 5 || validated.resultsPerPage > 100) {
        validated.resultsPerPage = defaults.resultsPerPage;
    }

    if (typeof validated.timezone !== 'string' || !Intl.supportedValuesOf('timeZone').includes(validated.timezone)) {
        validated.timezone = defaults.timezone;
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
        try {
            return validateUserPreferences(JSON.parse(stored));
        } catch (error) {
            console.error('Failed to parse stored preferences:', error);
        }
    }
    return validateUserPreferences({});
}

export { validateUserPreferences, saveUserPreferences, loadUserPreferences };function validateUserPreferences(prefs) {
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

function resetUserPreferences() {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };
    
    localStorage.setItem('userPreferences', JSON.stringify(defaults));
    
    return defaults;
}

export { 
    validateUserPreferences, 
    initializeUserPreferences, 
    updateUserPreferences, 
    resetUserPreferences 
};