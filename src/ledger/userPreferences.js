const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

function validatePreferences(userPrefs) {
  const validPreferences = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (['light', 'dark'].includes(userPrefs.theme)) {
      validPreferences.theme = userPrefs.theme;
    }
    
    if (['en', 'es', 'fr'].includes(userPrefs.language)) {
      validPreferences.language = userPrefs.language;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validPreferences.notifications = userPrefs.notifications;
    }
    
    if (typeof userPrefs.fontSize === 'number' && userPrefs.fontSize >= 12 && userPrefs.fontSize <= 24) {
      validPreferences.fontSize = userPrefs.fontSize;
    }
  }
  
  return validPreferences;
}

function initializePreferences() {
  const storedPrefs = localStorage.getItem('userPreferences');
  let userPrefs = defaultPreferences;
  
  if (storedPrefs) {
    try {
      const parsedPrefs = JSON.parse(storedPrefs);
      userPrefs = validatePreferences(parsedPrefs);
    } catch (error) {
      console.warn('Invalid preferences in localStorage, using defaults');
    }
  }
  
  localStorage.setItem('userPreferences', JSON.stringify(userPrefs));
  return userPrefs;
}

function updatePreference(key, value) {
  const currentPrefs = JSON.parse(localStorage.getItem('userPreferences')) || defaultPreferences;
  
  if (key in defaultPreferences) {
    const tempObj = { [key]: value };
    const validated = validatePreferences({ ...currentPrefs, ...tempObj });
    
    if (validated[key] === value) {
      localStorage.setItem('userPreferences', JSON.stringify(validated));
      return true;
    }
  }
  
  return false;
}

export { validatePreferences, initializePreferences, updatePreference };function validateUserPreferences(preferences) {
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
    const validatedPrefs = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    return validatedPrefs;
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

export { validateUserPreferences, savePreferences, loadPreferences };