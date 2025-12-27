const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        timezone: 'UTC'
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
                return defaultPreferences;
            }
        }
        return defaultPreferences;
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return defaultPreferences;
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : null;
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === STORAGE_KEY) {
                callback(getPreferences());
            }
        };

        return function unsubscribe() {
            localStorage.setItem = originalSetItem;
        };
    }

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        getPreference,
        setPreference,
        subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 'medium',
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
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
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          callback(JSON.parse(event.newValue));
        } catch (error) {
          console.error('Failed to parse updated preferences:', error);
        }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    subscribe
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = userPreferencesManager;
}const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
        }
        return { ...DEFAULT_PREFERENCES };
    };

    const updatePreferences = (updates) => {
        try {
            const current = getPreferences();
            const updated = { ...current, ...updates };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to update preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const getPreference = (key) => {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : null;
    };

    return {
        getPreferences,
        updatePreferences,
        resetPreferences,
        getPreference
    };
})();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'user_preferences';
  
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
      autoSave: (val) => typeof val === 'boolean',
      lastUpdated: (val) => val === null || val instanceof Date
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

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return false;
    }
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const setPreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid value for preference "${key}"`);
    }
    
    const preferences = loadPreferences();
    preferences[key] = value;
    return savePreferences(preferences);
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const setMultiplePreferences = (updates) => {
    const preferences = loadPreferences();
    
    Object.keys(updates).forEach(key => {
      if (validatePreference(key, updates[key])) {
        preferences[key] = updates[key];
      }
    });
    
    return savePreferences(preferences);
  };

  const exportPreferences = () => {
    const preferences = loadPreferences();
    return JSON.stringify(preferences, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      return setMultiplePreferences(imported);
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  };

  const hasUnsavedChanges = (currentPreferences) => {
    const saved = loadPreferences();
    return JSON.stringify(currentPreferences) !== JSON.stringify(saved);
  };

  return {
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    setMultiple: setMultiplePreferences,
    reset: resetPreferences,
    export: exportPreferences,
    import: importPreferences,
    hasUnsavedChanges: hasUnsavedChanges,
    validate: validatePreference
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
    const PREFIX = 'user_pref_';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false,
        sidebarCollapsed: false
    };

    const validateKey = (key) => {
        if (!key || typeof key !== 'string') {
            throw new Error('Invalid preference key');
        }
        return true;
    };

    const getStorageKey = (key) => `${PREFIX}${key}`;

    const getAllPreferences = () => {
        const preferences = { ...DEFAULT_PREFERENCES };
        
        Object.keys(DEFAULT_PREFERENCES).forEach(key => {
            const storageKey = getStorageKey(key);
            const storedValue = localStorage.getItem(storageKey);
            
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

    const setPreference = (key, value) => {
        validateKey(key);
        
        if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
            throw new Error(`Unknown preference: ${key}`);
        }

        const storageKey = getStorageKey(key);
        const serializedValue = typeof value === 'object' 
            ? JSON.stringify(value) 
            : value.toString();
        
        localStorage.setItem(storageKey, serializedValue);
        return true;
    };

    const getPreference = (key) => {
        validateKey(key);
        
        if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
            throw new Error(`Unknown preference: ${key}`);
        }

        const storageKey = getStorageKey(key);
        const storedValue = localStorage.getItem(storageKey);
        
        if (storedValue === null) {
            return DEFAULT_PREFERENCES[key];
        }

        try {
            return JSON.parse(storedValue);
        } catch {
            return storedValue;
        }
    };

    const resetPreference = (key) => {
        validateKey(key);
        
        if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
            throw new Error(`Unknown preference: ${key}`);
        }

        const storageKey = getStorageKey(key);
        localStorage.removeItem(storageKey);
        return DEFAULT_PREFERENCES[key];
    };

    const resetAllPreferences = () => {
        Object.keys(DEFAULT_PREFERENCES).forEach(key => {
            const storageKey = getStorageKey(key);
            localStorage.removeItem(storageKey);
        });
        return { ...DEFAULT_PREFERENCES };
    };

    const exportPreferences = () => {
        const preferences = getAllPreferences();
        return JSON.stringify(preferences, null, 2);
    };

    const importPreferences = (jsonString) => {
        try {
            const imported = JSON.parse(jsonString);
            Object.keys(imported).forEach(key => {
                if (DEFAULT_PREFERENCES.hasOwnProperty(key)) {
                    setPreference(key, imported[key]);
                }
            });
            return true;
        } catch (error) {
            throw new Error('Invalid preferences data');
        }
    };

    const hasUnsavedChanges = () => {
        return Object.keys(DEFAULT_PREFERENCES).some(key => {
            const currentValue = getPreference(key);
            return currentValue !== DEFAULT_PREFERENCES[key];
        });
    };

    return {
        getAll: getAllPreferences,
        get: getPreference,
        set: setPreference,
        reset: resetPreference,
        resetAll: resetAllPreferences,
        export: exportPreferences,
        import: importPreferences,
        hasUnsavedChanges: hasUnsavedChanges,
        getDefaults: () => ({ ...DEFAULT_PREFERENCES })
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}