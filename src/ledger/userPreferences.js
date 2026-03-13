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

export { validateUserPreferences, savePreferences, loadPreferences };const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 10,
  autoSave: false
};

function validatePreferences(userPrefs) {
  const validPreferences = {};
  const allowedKeys = Object.keys(defaultPreferences);
  
  for (const key of allowedKeys) {
    if (userPrefs.hasOwnProperty(key)) {
      const value = userPrefs[key];
      
      switch(key) {
        case 'theme':
          if (['light', 'dark', 'auto'].includes(value)) {
            validPreferences[key] = value;
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        case 'notifications':
        case 'autoSave':
          if (typeof value === 'boolean') {
            validPreferences[key] = value;
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        case 'language':
          if (typeof value === 'string' && value.length === 2) {
            validPreferences[key] = value.toLowerCase();
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        case 'resultsPerPage':
          if (Number.isInteger(value) && value >= 5 && value <= 100) {
            validPreferences[key] = value;
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        default:
          validPreferences[key] = defaultPreferences[key];
      }
    } else {
      validPreferences[key] = defaultPreferences[key];
    }
  }
  
  return validPreferences;
}

function mergePreferences(existingPrefs, newPrefs) {
  const validatedNewPrefs = validatePreferences(newPrefs);
  return { ...existingPrefs, ...validatedNewPrefs };
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
      const parsed = JSON.parse(stored);
      return validatePreferences(parsed);
    } catch {
      return { ...defaultPreferences };
    }
  }
  return { ...defaultPreferences };
}

export { validatePreferences, mergePreferences, savePreferences, loadPreferences, defaultPreferences };const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25,
  autoSave: false
};

const validThemes = ['light', 'dark', 'system'];
const validLanguages = ['en', 'es', 'fr', 'de'];
const maxResultsPerPage = 100;

function validatePreferences(userPrefs) {
  const validated = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (validThemes.includes(userPrefs.theme)) {
      validated.theme = userPrefs.theme;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validated.notifications = userPrefs.notifications;
    }
    
    if (validLanguages.includes(userPrefs.language)) {
      validated.language = userPrefs.language;
    }
    
    if (Number.isInteger(userPrefs.resultsPerPage) && 
        userPrefs.resultsPerPage > 0 && 
        userPrefs.resultsPerPage <= maxResultsPerPage) {
      validated.resultsPerPage = userPrefs.resultsPerPage;
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

function resetPreferences() {
  localStorage.removeItem('userPreferences');
  return { ...defaultPreferences };
}

export { validatePreferences, savePreferences, loadPreferences, resetPreferences, defaultPreferences };const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: true
};

function validatePreferences(userPrefs) {
  const validPrefs = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (['light', 'dark'].includes(userPrefs.theme)) {
      validPrefs.theme = userPrefs.theme;
    }
    
    if (['en', 'es', 'fr'].includes(userPrefs.language)) {
      validPrefs.language = userPrefs.language;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validPrefs.notifications = userPrefs.notifications;
    }
    
    if (Number.isInteger(userPrefs.fontSize) && userPrefs.fontSize >= 12 && userPrefs.fontSize <= 24) {
      validPrefs.fontSize = userPrefs.fontSize;
    }
    
    if (typeof userPrefs.autoSave === 'boolean') {
      validPrefs.autoSave = userPrefs.autoSave;
    }
  }
  
  return validPrefs;
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
    }
  }
  return { ...defaultPreferences };
}

export { validatePreferences, savePreferences, loadPreferences };