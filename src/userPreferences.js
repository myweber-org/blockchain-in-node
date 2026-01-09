const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25
};

function validatePreferences(userPrefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validated = {};
  
  validKeys.forEach(key => {
    if (userPrefs.hasOwnProperty(key)) {
      const value = userPrefs[key];
      
      switch(key) {
        case 'theme':
          validated[key] = ['light', 'dark', 'auto'].includes(value) ? value : defaultPreferences.theme;
          break;
        case 'notifications':
          validated[key] = typeof value === 'boolean' ? value : defaultPreferences.notifications;
          break;
        case 'language':
          validated[key] = typeof value === 'string' && value.length === 2 ? value : defaultPreferences.language;
          break;
        case 'resultsPerPage':
          validated[key] = Number.isInteger(value) && value >= 10 && value <= 100 ? value : defaultPreferences.resultsPerPage;
          break;
        default:
          validated[key] = defaultPreferences[key];
      }
    } else {
      validated[key] = defaultPreferences[key];
    }
  });
  
  return validated;
}

function mergePreferences(existing, updates) {
  const validatedUpdates = validatePreferences(updates);
  return { ...existing, ...validatedUpdates };
}

function savePreferences(prefs) {
  try {
    const validated = validatePreferences(prefs);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      return validatePreferences(JSON.parse(stored));
    }
    return { ...defaultPreferences };
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return { ...defaultPreferences };
  }
}

export { validatePreferences, mergePreferences, savePreferences, loadPreferences, defaultPreferences };function validateUserPreferences(prefs) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const validated = { ...defaults, ...prefs };

    if (!['light', 'dark', 'auto'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (!['en', 'es', 'fr', 'de'].includes(validated.language)) {
        validated.language = defaults.language;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (typeof validated.fontSize !== 'number' || validated.fontSize < 12 || validated.fontSize > 24) {
        validated.fontSize = defaults.fontSize;
    }

    if (typeof validated.autoSave !== 'boolean') {
        validated.autoSave = defaults.autoSave;
    }

    return validated;
}

function saveUserPreferences(prefs) {
    const validatedPrefs = validateUserPreferences(prefs);
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    return validatedPrefs;
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

export { validateUserPreferences, saveUserPreferences, loadUserPreferences };