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

export { validateUserPreferences, initializeUserSettings };const defaultPreferences = {
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

function savePreferences(prefs) {
  const validated = validatePreferences(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validated));
  return validated;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return validatePreferences(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to parse stored preferences:', e);
    }
  }
  return { ...defaultPreferences };
}

export { validatePreferences, savePreferences, loadPreferences };const defaultPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
  language: 'en'
};

function validatePreferences(userPrefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validatedPrefs = { ...defaultPreferences };

  for (const key of validKeys) {
    if (userPrefs.hasOwnProperty(key)) {
      if (typeof userPrefs[key] === typeof defaultPreferences[key]) {
        validatedPrefs[key] = userPrefs[key];
      } else {
        console.warn(`Invalid type for preference "${key}". Using default.`);
      }
    }
  }

  const invalidKeys = Object.keys(userPrefs).filter(key => !validKeys.includes(key));
  if (invalidKeys.length > 0) {
    console.warn(`Ignored invalid preference keys: ${invalidKeys.join(', ')}`);
  }

  return validatedPrefs;
}

function savePreferences(preferences) {
  const validated = validatePreferences(preferences);
  localStorage.setItem('userPreferences', JSON.stringify(validated));
  return validated;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return validatePreferences(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
      return { ...defaultPreferences };
    }
  }
  return { ...defaultPreferences };
}

export { savePreferences, loadPreferences, defaultPreferences };function validateUserPreferences(prefs) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        timezone: 'UTC'
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

    if (!Intl.supportedValuesOf('timeZone').includes(validated.timezone)) {
        validated.timezone = defaults.timezone;
    }

    return validated;
}

function initializeUserSettings() {
    const stored = localStorage.getItem('userPreferences');
    let preferences = {};

    try {
        preferences = stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Failed to parse stored preferences:', error);
    }

    return validateUserPreferences(preferences);
}

function saveUserPreferences(preferences) {
    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

export { validateUserPreferences, initializeUserSettings, saveUserPreferences };