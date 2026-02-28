const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true
  };

  const validateKey = (key) => {
    if (!key || typeof key !== 'string') {
      throw new Error('Invalid preference key');
    }
    return true;
  };

  const getFullKey = (key) => `${PREFIX}${key}`;

  const getAll = () => {
    const preferences = { ...DEFAULT_PREFERENCES };
    
    Object.keys(DEFAULT_PREFERENCES).forEach(key => {
      const storedValue = localStorage.getItem(getFullKey(key));
      if (storedValue !== null) {
        try {
          preferences[key] = JSON.parse(storedValue);
        } catch {
          preferences[key] = storedValue;
        }
      }
    });
    
    return preferences;
  };

  const get = (key) => {
    validateKey(key);
    
    if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
      throw new Error(`Unknown preference: ${key}`);
    }
    
    const storedValue = localStorage.getItem(getFullKey(key));
    
    if (storedValue === null) {
      return DEFAULT_PREFERENCES[key];
    }
    
    try {
      return JSON.parse(storedValue);
    } catch {
      return storedValue;
    }
  };

  const set = (key, value) => {
    validateKey(key);
    
    if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
      throw new Error(`Cannot set unknown preference: ${key}`);
    }
    
    const expectedType = typeof DEFAULT_PREFERENCES[key];
    if (typeof value !== expectedType) {
      throw new Error(`Expected ${expectedType} for ${key}, got ${typeof value}`);
    }
    
    localStorage.setItem(getFullKey(key), JSON.stringify(value));
    return true;
  };

  const reset = (key = null) => {
    if (key) {
      validateKey(key);
      localStorage.removeItem(getFullKey(key));
    } else {
      Object.keys(DEFAULT_PREFERENCES).forEach(k => {
        localStorage.removeItem(getFullKey(k));
      });
    }
    return true;
  };

  const subscribe = (key, callback) => {
    validateKey(key);
    
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    
    const storageListener = (event) => {
      if (event.key === getFullKey(key)) {
        callback(get(key));
      }
    };
    
    window.addEventListener('storage', storageListener);
    
    return () => {
      window.removeEventListener('storage', storageListener);
    };
  };

  return {
    getAll,
    get,
    set,
    reset,
    subscribe,
    DEFAULT_PREFERENCES
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        sidebarCollapsed: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : { ...defaultPreferences };
        } catch (error) {
            console.error('Error reading preferences:', error);
            return { ...defaultPreferences };
        }
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return null;
        }
    }

    function resetToDefaults() {
        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(defaultPreferences));
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Error resetting preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === PREFERENCES_KEY) {
                callback(getPreferences());
            }
        };
        
        return function unsubscribe() {
            localStorage.setItem = originalSetItem;
        };
    }

    return {
        getPreferences,
        savePreferences,
        resetToDefaults,
        getPreference,
        setPreference,
        subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false,
    lastUpdated: null
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return { ...DEFAULT_PREFERENCES };
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const merged = {
        ...current,
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return { success: true, preferences: merged };
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return { success: false, error: error.message };
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { success: true, preferences: DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return { success: false, error: error.message };
    }
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      language: (val) => /^[a-z]{2}$/.test(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean'
    };

    if (!validators[key]) return false;
    return validators[key](value);
  };

  const updatePreference = (key, value) => {
    if (!validatePreference(key, value)) {
      return { success: false, error: `Invalid value for ${key}` };
    }
    return savePreferences({ [key]: value });
  };

  const exportPreferences = () => {
    const prefs = getPreferences();
    const blob = new Blob([JSON.stringify(prefs, null, 2)], {
      type: 'application/json'
    });
    return URL.createObjectURL(blob);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      const validUpdates = {};
      
      Object.keys(imported).forEach(key => {
        if (key in DEFAULT_PREFERENCES && validatePreference(key, imported[key])) {
          validUpdates[key] = imported[key];
        }
      });

      if (Object.keys(validUpdates).length > 0) {
        return savePreferences(validUpdates);
      }
      return { success: false, error: 'No valid preferences found in import' };
    } catch (error) {
      return { success: false, error: 'Invalid JSON format' };
    }
  };

  return {
    get: getPreferences,
    save: savePreferences,
    reset: resetPreferences,
    update: updatePreference,
    export: exportPreferences,
    import: importPreferences,
    validate: validatePreference,
    defaults: DEFAULT_PREFERENCES
  };
})();

export default userPreferencesManager;const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    let currentPreferences = { ...DEFAULT_PREFERENCES };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                currentPreferences = { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return currentPreferences;
    };

    const savePreferences = (updates) => {
        try {
            currentPreferences = { ...currentPreferences, ...updates };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetPreferences = () => {
        currentPreferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        return currentPreferences;
    };

    const getPreference = (key) => {
        return currentPreferences[key] !== undefined ? currentPreferences[key] : null;
    };

    const getAllPreferences = () => {
        return { ...currentPreferences };
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY) {
                loadPreferences();
                callback(getAllPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    loadPreferences();

    return {
        get: getPreference,
        getAll: getAllPreferences,
        set: savePreferences,
        reset: resetPreferences,
        subscribe,
        constants: {
            THEMES: ['light', 'dark', 'auto'],
            LANGUAGES: ['en', 'es', 'fr', 'de']
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}