const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    notifications: true,
    fontSize: 16,
    language: 'en',
    autoSave: false
  };

  let currentPreferences = { ...DEFAULT_PREFERENCES };

  const saveToLocalStorage = (preferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.warn('LocalStorage save failed:', error);
      return false;
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('LocalStorage load failed:', error);
      return null;
    }
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (v) => ['light', 'dark', 'auto'].includes(v),
      notifications: (v) => typeof v === 'boolean',
      fontSize: (v) => Number.isInteger(v) && v >= 12 && v <= 24,
      language: (v) => /^[a-z]{2}(-[A-Z]{2})?$/.test(v),
      autoSave: (v) => typeof v === 'boolean'
    };
    return validators[key] ? validators[key](value) : false;
  };

  const updatePreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid preference value for ${key}: ${value}`);
    }
    
    const oldValue = currentPreferences[key];
    currentPreferences[key] = value;
    
    if (!saveToLocalStorage(currentPreferences)) {
      currentPreferences[key] = oldValue;
      throw new Error('Failed to persist preference change');
    }
    
    return { key, oldValue, newValue: value };
  };

  const resetToDefaults = () => {
    currentPreferences = { ...DEFAULT_PREFERENCES };
    saveToLocalStorage(currentPreferences);
    return currentPreferences;
  };

  const initialize = () => {
    const stored = loadFromLocalStorage();
    if (stored) {
      Object.keys(DEFAULT_PREFERENCES).forEach(key => {
        if (validatePreference(key, stored[key])) {
          currentPreferences[key] = stored[key];
        }
      });
      saveToLocalStorage(currentPreferences);
    }
    return currentPreferences;
  };

  return {
    initialize,
    getPreferences: () => ({ ...currentPreferences }),
    getPreference: (key) => currentPreferences[key],
    updatePreference,
    resetToDefaults,
    subscribe: (callback) => {
      const handler = (event) => {
        if (event.key === STORAGE_KEY) {
          const stored = loadFromLocalStorage();
          if (stored) {
            currentPreferences = stored;
            callback(currentPreferences);
          }
        }
      };
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    }
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true,
    sidebarCollapsed: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
      return defaultPreferences;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return defaultPreferences;
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return defaultPreferences;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', handler);
    
    return () => {
      window.removeEventListener('storage', handler);
    };
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    getPreference,
    setPreference,
    subscribe
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    lastUpdated: null
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean'
    };
    
    return validators[key] ? validators[key](value) : false;
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultPreferences };
      
      const parsed = JSON.parse(stored);
      const merged = { ...defaultPreferences, ...parsed };
      
      Object.keys(merged).forEach(key => {
        if (!validatePreference(key, merged[key])) {
          merged[key] = defaultPreferences[key];
        }
      });
      
      return merged;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const validated = {};
      
      Object.keys(preferences).forEach(key => {
        if (validatePreference(key, preferences[key])) {
          validated[key] = preferences[key];
        }
      });
      
      validated.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : null;
  };

  const setPreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid value for preference "${key}"`);
    }
    
    const current = loadPreferences();
    current[key] = value;
    return savePreferences(current);
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(loadPreferences());
      }
    };
    
    window.addEventListener('storage', handler);
    
    return () => {
      window.removeEventListener('storage', handler);
    };
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetToDefaults,
    get: getPreference,
    set: setPreference,
    subscribe: subscribe,
    validate: validatePreference
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const PREFERENCE_KEYS = {
    THEME: 'user_theme_preference',
    LANGUAGE: 'user_language_preference',
    NOTIFICATIONS: 'user_notifications_enabled',
    TIMEZONE: 'user_timezone_setting'
  };

  const DEFAULT_PREFERENCES = {
    [PREFERENCE_KEYS.THEME]: 'light',
    [PREFERENCE_KEYS.LANGUAGE]: 'en',
    [PREFERENCE_KEYS.NOTIFICATIONS]: true,
    [PREFERENCE_KEYS.TIMEZONE]: 'UTC'
  };

  const validatePreference = (key, value) => {
    const validators = {
      [PREFERENCE_KEYS.THEME]: (val) => ['light', 'dark', 'auto'].includes(val),
      [PREFERENCE_KEYS.LANGUAGE]: (val) => /^[a-z]{2}$/.test(val),
      [PREFERENCE_KEYS.NOTIFICATIONS]: (val) => typeof val === 'boolean',
      [PREFERENCE_KEYS.TIMEZONE]: (val) => Intl.supportedValuesOf('timeZone').includes(val)
    };

    return validators[key] ? validators[key](value) : false;
  };

  const getPreference = (key) => {
    if (!PREFERENCE_KEYS.hasOwnProperty(key)) {
      console.warn(`Invalid preference key: ${key}`);
      return null;
    }

    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        const parsedValue = JSON.parse(storedValue);
        if (validatePreference(key, parsedValue)) {
          return parsedValue;
        }
      } catch {
        return DEFAULT_PREFERENCES[key];
      }
    }
    
    return DEFAULT_PREFERENCES[key];
  };

  const setPreference = (key, value) => {
    if (!PREFERENCE_KEYS.hasOwnProperty(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    if (!validatePreference(key, value)) {
      throw new Error(`Invalid value for preference ${key}: ${value}`);
    }

    localStorage.setItem(key, JSON.stringify(value));
    return true;
  };

  const resetPreferences = () => {
    Object.keys(PREFERENCE_KEYS).forEach(key => {
      localStorage.removeItem(PREFERENCE_KEYS[key]);
    });
  };

  const getAllPreferences = () => {
    return Object.keys(PREFERENCE_KEYS).reduce((prefs, key) => {
      prefs[key] = getPreference(PREFERENCE_KEYS[key]);
      return prefs;
    }, {});
  };

  const exportPreferences = () => {
    const prefs = getAllPreferences();
    return JSON.stringify(prefs, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const importedPrefs = JSON.parse(jsonString);
      Object.keys(importedPrefs).forEach(key => {
        if (PREFERENCE_KEYS.hasOwnProperty(key)) {
          setPreference(PREFERENCE_KEYS[key], importedPrefs[key]);
        }
      });
      return true;
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  };

  return {
    get: getPreference,
    set: setPreference,
    reset: resetPreferences,
    getAll: getAllPreferences,
    export: exportPreferences,
    import: importPreferences,
    keys: PREFERENCE_KEYS
  };
})();const userPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        showTutorial: false
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                return defaultPreferences;
            }
        }
        return defaultPreferences;
    }

    function updatePreferences(updates) {
        const current = getPreferences();
        const updated = { ...current, ...updates };
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (e) {
            console.error('Failed to save preferences:', e);
            return current;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return defaultPreferences;
        } catch (e) {
            console.error('Failed to reset preferences:', e);
            return getPreferences();
        }
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(e) {
            if (e.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        get: getPreferences,
        update: updatePreferences,
        reset: resetPreferences,
        getPreference: getPreference,
        subscribe: subscribe,
        defaultPreferences: defaultPreferences
    };
})();