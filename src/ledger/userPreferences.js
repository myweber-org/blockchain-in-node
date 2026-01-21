const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: true
};

const validThemes = ['light', 'dark', 'system'];
const validLanguages = ['en', 'es', 'fr', 'de'];
const minFontSize = 8;
const maxFontSize = 32;

function validatePreferences(userPrefs) {
  const validated = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (validThemes.includes(userPrefs.theme)) {
      validated.theme = userPrefs.theme;
    }
    
    if (validLanguages.includes(userPrefs.language)) {
      validated.language = userPrefs.language;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validated.notifications = userPrefs.notifications;
    }
    
    if (typeof userPrefs.fontSize === 'number' && 
        userPrefs.fontSize >= minFontSize && 
        userPrefs.fontSize <= maxFontSize) {
      validated.fontSize = userPrefs.fontSize;
    }
    
    if (typeof userPrefs.autoSave === 'boolean') {
      validated.autoSave = userPrefs.autoSave;
    }
  }
  
  return validated;
}

function savePreferences(prefs) {
  const validatedPrefs = validatePreferences(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
  return validatedPrefs;
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

export { validatePreferences, savePreferences, loadPreferences, defaultPreferences };const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 10
};

function validatePreferences(userPrefs) {
  const validPrefs = {};
  
  // Validate theme
  if (['light', 'dark', 'auto'].includes(userPrefs.theme)) {
    validPrefs.theme = userPrefs.theme;
  } else {
    validPrefs.theme = defaultPreferences.theme;
  }
  
  // Validate notifications
  if (typeof userPrefs.notifications === 'boolean') {
    validPrefs.notifications = userPrefs.notifications;
  } else {
    validPrefs.notifications = defaultPreferences.notifications;
  }
  
  // Validate language
  if (['en', 'es', 'fr', 'de'].includes(userPrefs.language)) {
    validPrefs.language = userPrefs.language;
  } else {
    validPrefs.language = defaultPreferences.language;
  }
  
  // Validate results per page
  if (Number.isInteger(userPrefs.resultsPerPage) && userPrefs.resultsPerPage >= 5 && userPrefs.resultsPerPage <= 100) {
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

export { validatePreferences, mergeWithDefaults, defaultPreferences };const userPreferences = {
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

function validatePreferences(prefs) {
  const validated = { ...defaultPreferences };
  
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
  
  return validated;
}

function savePreferences(prefs) {
  const validatedPrefs = validatePreferences(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
  return validatedPrefs;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    return validatePreferences(JSON.parse(stored));
  }
  return { ...defaultPreferences };
}

export { userPreferences, validatePreferences, savePreferences, loadPreferences };