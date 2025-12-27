const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25
};

function validatePreferences(userPrefs) {
  const validPrefs = {};
  
  if (userPrefs.theme && ['light', 'dark', 'auto'].includes(userPrefs.theme)) {
    validPrefs.theme = userPrefs.theme;
  } else {
    validPrefs.theme = defaultPreferences.theme;
  }
  
  if (typeof userPrefs.notifications === 'boolean') {
    validPrefs.notifications = userPrefs.notifications;
  } else {
    validPrefs.notifications = defaultPreferences.notifications;
  }
  
  if (userPrefs.language && ['en', 'es', 'fr', 'de'].includes(userPrefs.language)) {
    validPrefs.language = userPrefs.language;
  } else {
    validPrefs.language = defaultPreferences.language;
  }
  
  if (Number.isInteger(userPrefs.resultsPerPage) && userPrefs.resultsPerPage > 0 && userPrefs.resultsPerPage <= 100) {
    validPrefs.resultsPerPage = userPrefs.resultsPerPage;
  } else {
    validPrefs.resultsPerPage = defaultPreferences.resultsPerPage;
  }
  
  return validPrefs;
}

function mergeWithDefaults(userPrefs) {
  return {
    ...defaultPreferences,
    ...validatePreferences(userPrefs)
  };
}

export { validatePreferences, mergeWithDefaults, defaultPreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        notifications: true,
        language: 'en',
        resultsPerPage: 25
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
}const defaultPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
  language: 'en'
};

function validatePreferences(userPrefs) {
  const validPrefs = {};
  
  Object.keys(defaultPreferences).forEach(key => {
    if (userPrefs.hasOwnProperty(key)) {
      const value = userPrefs[key];
      switch(key) {
        case 'theme':
          validPrefs[key] = ['light', 'dark', 'auto'].includes(value) ? value : defaultPreferences[key];
          break;
        case 'fontSize':
          validPrefs[key] = Number.isInteger(value) && value >= 12 && value <= 24 ? value : defaultPreferences[key];
          break;
        case 'notifications':
          validPrefs[key] = typeof value === 'boolean' ? value : defaultPreferences[key];
          break;
        case 'language':
          validPrefs[key] = ['en', 'es', 'fr', 'de'].includes(value) ? value : defaultPreferences[key];
          break;
        default:
          validPrefs[key] = defaultPreferences[key];
      }
    } else {
      validPrefs[key] = defaultPreferences[key];
    }
  });
  
  return validPrefs;
}

function mergePreferences(existingPrefs, newPrefs) {
  const validatedNewPrefs = validatePreferences(newPrefs);
  return { ...existingPrefs, ...validatedNewPrefs };
}

export { defaultPreferences, validatePreferences, mergePreferences };const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 14,
  autoSave: false
};

function validatePreferences(userPrefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validatedPrefs = { ...defaultPreferences };

  for (const key in userPrefs) {
    if (validKeys.includes(key)) {
      const value = userPrefs[key];
      const defaultValue = defaultPreferences[key];
      
      if (typeof value === typeof defaultValue) {
        validatedPrefs[key] = value;
      }
    }
  }

  return validatedPrefs;
}

function mergePreferences(existingPrefs, newPrefs) {
  const validatedNew = validatePreferences(newPrefs);
  return { ...existingPrefs, ...validatedNew };
}

function resetToDefaults() {
  return { ...defaultPreferences };
}

export { validatePreferences, mergePreferences, resetToDefaults, defaultPreferences };