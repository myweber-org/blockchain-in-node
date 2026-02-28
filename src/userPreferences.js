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

export { validateUserPreferences, initializeUserSettings, saveUserPreferences };const defaultPreferences = {
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
  
  if (userPrefs.theme && validThemes.includes(userPrefs.theme)) {
    validated.theme = userPrefs.theme;
  }
  
  if (userPrefs.language && validLanguages.includes(userPrefs.language)) {
    validated.language = userPrefs.language;
  }
  
  if (typeof userPrefs.notifications === 'boolean') {
    validated.notifications = userPrefs.notifications;
  }
  
  if (typeof userPrefs.fontSize === 'number') {
    validated.fontSize = Math.max(minFontSize, Math.min(maxFontSize, userPrefs.fontSize));
  }
  
  if (typeof userPrefs.autoSave === 'boolean') {
    validated.autoSave = userPrefs.autoSave;
  }
  
  return validated;
}

function mergePreferences(existingPrefs, newPrefs) {
  const validatedNew = validatePreferences(newPrefs);
  return { ...existingPrefs, ...validatedNew };
}

function getPreference(key) {
  const stored = localStorage.getItem('userPreferences');
  const preferences = stored ? JSON.parse(stored) : defaultPreferences;
  return preferences[key] || defaultPreferences[key];
}

function savePreferences(preferences) {
  const validated = validatePreferences(preferences);
  localStorage.setItem('userPreferences', JSON.stringify(validated));
  return validated;
}

function resetToDefaults() {
  localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
  return defaultPreferences;
}

export {
  validatePreferences,
  mergePreferences,
  getPreference,
  savePreferences,
  resetToDefaults,
  defaultPreferences
};function validateUserPreferences(prefs) {
    const defaults = {
        theme: 'light',
        notifications: true,
        language: 'en',
        timezone: 'UTC',
        resultsPerPage: 25
    };

    const validated = { ...defaults };

    if (prefs && typeof prefs === 'object') {
        if (typeof prefs.theme === 'string' && ['light', 'dark', 'auto'].includes(prefs.theme)) {
            validated.theme = prefs.theme;
        }

        if (typeof prefs.notifications === 'boolean') {
            validated.notifications = prefs.notifications;
        }

        if (typeof prefs.language === 'string' && /^[a-z]{2}(-[A-Z]{2})?$/.test(prefs.language)) {
            validated.language = prefs.language;
        }

        if (typeof prefs.timezone === 'string' && Intl.supportedValuesOf('timeZone').includes(prefs.timezone)) {
            validated.timezone = prefs.timezone;
        }

        if (typeof prefs.resultsPerPage === 'number' && prefs.resultsPerPage >= 10 && prefs.resultsPerPage <= 100) {
            validated.resultsPerPage = Math.floor(prefs.resultsPerPage);
        }
    }

    return validated;
}

function initializeUserPreferences() {
    let storedPrefs;
    try {
        storedPrefs = JSON.parse(localStorage.getItem('userPreferences'));
    } catch (error) {
        console.warn('Failed to parse stored preferences:', error);
    }

    const preferences = validateUserPreferences(storedPrefs);
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    applyPreferences(preferences);
    
    return preferences;
}

function applyPreferences(prefs) {
    document.documentElement.setAttribute('data-theme', prefs.theme);
    
    if (prefs.language) {
        document.documentElement.lang = prefs.language;
    }
    
    const event = new CustomEvent('preferencesChanged', { detail: prefs });
    window.dispatchEvent(event);
}

function updatePreference(key, value) {
    let currentPrefs;
    try {
        currentPrefs = JSON.parse(localStorage.getItem('userPreferences')) || {};
    } catch (error) {
        currentPrefs = {};
    }

    const updatedPrefs = validateUserPreferences({ ...currentPrefs, [key]: value });
    
    localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
    
    applyPreferences(updatedPrefs);
    
    return updatedPrefs;
}

export { validateUserPreferences, initializeUserPreferences, updatePreference };const userPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  fontSize: 16
};

const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  fontSize: 14
};

const validThemes = ['light', 'dark', 'auto'];
const validLanguages = ['en', 'es', 'fr', 'de'];

function validatePreferences(prefs) {
  const validated = { ...defaultPreferences };
  
  if (prefs.theme && validThemes.includes(prefs.theme)) {
    validated.theme = prefs.theme;
  }
  
  if (typeof prefs.notifications === 'boolean') {
    validated.notifications = prefs.notifications;
  }
  
  if (prefs.language && validLanguages.includes(prefs.language)) {
    validated.language = prefs.language;
  }
  
  if (prefs.fontSize && Number.isInteger(prefs.fontSize) && prefs.fontSize >= 10 && prefs.fontSize <= 24) {
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
    try {
      return validatePreferences(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
    }
  }
  return { ...defaultPreferences };
}

export { userPreferences, savePreferences, loadPreferences, validatePreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    const validated = { ...defaults, ...preferences };

    if (!['light', 'dark'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (!['en', 'es', 'fr'].includes(validated.language)) {
        validated.language = defaults.language;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (typeof validated.fontSize !== 'number' || validated.fontSize < 12 || validated.fontSize > 24) {
        validated.fontSize = defaults.fontSize;
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
        return validateUserPreferences(JSON.parse(stored));
    }
    return validateUserPreferences({});
}

export { validateUserPreferences, savePreferences, loadPreferences };function validateUserPreferences(preferences) {
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

    const supportedLanguages = ['en', 'es', 'fr', 'de', 'ja'];
    if (!supportedLanguages.includes(validated.language)) {
        validated.language = defaults.language;
    }

    try {
        Intl.DateTimeFormat(undefined, { timeZone: validated.timezone });
    } catch (error) {
        validated.timezone = defaults.timezone;
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
            return validateUserPreferences({});
        }
    }
    return validateUserPreferences({});
}

export { validateUserPreferences, savePreferences, loadPreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    const validated = { ...defaults };

    if (preferences && typeof preferences === 'object') {
        if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
            validated.theme = preferences.theme;
        }

        if (preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)) {
            validated.language = preferences.language;
        }

        if (typeof preferences.notifications === 'boolean') {
            validated.notifications = preferences.notifications;
        }

        if (preferences.fontSize && Number.isInteger(preferences.fontSize) && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
            validated.fontSize = preferences.fontSize;
        }
    }

    return validated;
}

function initializeUserPreferences() {
    try {
        const stored = localStorage.getItem('userPreferences');
        const parsed = stored ? JSON.parse(stored) : {};
        return validateUserPreferences(parsed);
    } catch (error) {
        console.error('Failed to initialize user preferences:', error);
        return validateUserPreferences({});
    }
}

function saveUserPreferences(preferences) {
    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

export { validateUserPreferences, initializeUserPreferences, saveUserPreferences };const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

function validatePreferences(userPrefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validatedPrefs = { ...defaultPreferences };

  for (const key of validKeys) {
    if (userPrefs.hasOwnProperty(key)) {
      if (typeof userPrefs[key] === typeof defaultPreferences[key]) {
        validatedPrefs[key] = userPrefs[key];
      }
    }
  }

  return validatedPrefs;
}

function initializePreferences() {
  const storedPrefs = localStorage.getItem('userPreferences');
  let userPrefs = defaultPreferences;

  if (storedPrefs) {
    try {
      const parsedPrefs = JSON.parse(storedPrefs);
      userPrefs = validatePreferences(parsedPrefs);
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
    }
  }

  localStorage.setItem('userPreferences', JSON.stringify(userPrefs));
  return userPrefs;
}

function updatePreference(key, value) {
  if (!defaultPreferences.hasOwnProperty(key)) {
    throw new Error(`Invalid preference key: ${key}`);
  }

  if (typeof value !== typeof defaultPreferences[key]) {
    throw new Error(`Invalid type for preference ${key}`);
  }

  const currentPrefs = JSON.parse(localStorage.getItem('userPreferences')) || defaultPreferences;
  currentPrefs[key] = value;
  localStorage.setItem('userPreferences', JSON.stringify(currentPrefs));
  return currentPrefs;
}

export { initializePreferences, updatePreference, validatePreferences };function initializeUserPreferences(preferences) {
  const defaults = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 14,
    autoSave: false
  };

  function validatePreferences(prefs) {
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    return {
      theme: validThemes.includes(prefs.theme) ? prefs.theme : defaults.theme,
      language: validLanguages.includes(prefs.language) ? prefs.language : defaults.language,
      notifications: typeof prefs.notifications === 'boolean' ? prefs.notifications : defaults.notifications,
      fontSize: Number.isInteger(prefs.fontSize) && prefs.fontSize >= 10 && prefs.fontSize <= 24 ? prefs.fontSize : defaults.fontSize,
      autoSave: typeof prefs.autoSave === 'boolean' ? prefs.autoSave : defaults.autoSave
    };
  }

  function mergeWithDefaults(prefs) {
    return {
      ...defaults,
      ...validatePreferences(prefs)
    };
  }

  function savePreferences(prefs) {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(prefs));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  const validatedPrefs = mergeWithDefaults(preferences || {});
  const saved = savePreferences(validatedPrefs);
  
  return {
    preferences: validatedPrefs,
    saved: saved,
    timestamp: new Date().toISOString()
  };
}

function loadUserPreferences() {
  try {
    const stored = localStorage.getItem('userPreferences');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return null;
  }
}

function resetToDefaultPreferences() {
  const result = initializeUserPreferences({});
  return result.preferences;
}

export { initializeUserPreferences, loadUserPreferences, resetToDefaultPreferences };const USER_PREFERENCES_KEY = 'app_preferences';

function saveUserPreferences(preferences) {
    try {
        const serialized = JSON.stringify(preferences);
        localStorage.setItem(USER_PREFERENCES_KEY, serialized);
        return true;
    } catch (error) {
        console.error('Failed to save preferences:', error);
        return false;
    }
}

function loadUserPreferences() {
    try {
        const stored = localStorage.getItem(USER_PREFERENCES_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Failed to load preferences:', error);
        return {};
    }
}

function updateUserPreferences(updates) {
    const current = loadUserPreferences();
    const updated = { ...current, ...updates };
    return saveUserPreferences(updated);
}

function clearUserPreferences() {
    localStorage.removeItem(USER_PREFERENCES_KEY);
}

export {
    saveUserPreferences,
    loadUserPreferences,
    updateUserPreferences,
    clearUserPreferences
};const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: true
};

const defaultPreferences = {
  theme: 'dark',
  language: 'en',
  notifications: false,
  fontSize: 14,
  autoSave: false
};

function validatePreferences(prefs) {
  const validated = {};
  const keys = Object.keys(defaultPreferences);
  
  keys.forEach(key => {
    if (prefs[key] !== undefined && typeof prefs[key] === typeof defaultPreferences[key]) {
      validated[key] = prefs[key];
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
  try {
    localStorage.setItem('userPreferences', JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      return mergePreferences(JSON.parse(saved));
    }
    return defaultPreferences;
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return defaultPreferences;
  }
}

export { validatePreferences, mergePreferences, savePreferences, loadPreferences };const defaultPreferences = {
  theme: 'light',
  language: 'en',
  fontSize: 16,
  notifications: true,
  autoSave: true
};

const UserPreferences = {
  get: function(key) {
    const stored = localStorage.getItem('userPreferences');
    const preferences = stored ? JSON.parse(stored) : defaultPreferences;
    return key ? preferences[key] : preferences;
  },

  set: function(key, value) {
    const current = this.get();
    const updated = { ...current, [key]: value };
    localStorage.setItem('userPreferences', JSON.stringify(updated));
    return updated;
  },

  reset: function() {
    localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
    return defaultPreferences;
  },

  clear: function() {
    localStorage.removeItem('userPreferences');
  },

  isSet: function() {
    return localStorage.getItem('userPreferences') !== null;
  }
};

export default UserPreferences;const userPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en'
};

function validatePreferences(prefs) {
  const validThemes = ['light', 'dark', 'auto'];
  const validLanguages = ['en', 'es', 'fr', 'de'];
  
  if (!validThemes.includes(prefs.theme)) {
    throw new Error('Invalid theme selection');
  }
  
  if (!validLanguages.includes(prefs.language)) {
    throw new Error('Invalid language selection');
  }
  
  if (typeof prefs.notifications !== 'boolean') {
    throw new Error('Notifications must be boolean');
  }
  
  return true;
}

function savePreferences(prefs) {
  if (validatePreferences(prefs)) {
    localStorage.setItem('userPreferences', JSON.stringify(prefs));
    return true;
  }
  return false;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
      return userPreferences;
    }
  }
  return userPreferences;
}

function updatePreference(key, value) {
  const current = loadPreferences();
  current[key] = value;
  return savePreferences(current);
}

export { validatePreferences, savePreferences, loadPreferences, updatePreference };