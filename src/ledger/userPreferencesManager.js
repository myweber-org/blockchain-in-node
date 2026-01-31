const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false,
        lastUpdated: null
    };

    const validatePreference = (key, value) => {
        const validators = {
            theme: (val) => ['light', 'dark', 'auto'].includes(val),
            language: (val) => /^[a-z]{2}$/.test(val),
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

    const exportPreferences = () => {
        const prefs = loadPreferences();
        return JSON.stringify(prefs, null, 2);
    };

    const importPreferences = (jsonString) => {
        try {
            const imported = JSON.parse(jsonString);
            return savePreferences(imported);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
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

    const getAllPreferences = () => {
        return loadPreferences();
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY) {
                callback(loadPreferences());
            }
        };
        window.addEventListener('storage', handler);
        
        return () => window.removeEventListener('storage', handler);
    };

    return {
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        reset: resetToDefaults,
        export: exportPreferences,
        import: importPreferences,
        subscribe: subscribe,
        validate: validatePreference
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

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = {
        ...current,
        ...updates,
        lastUpdated: new Date().toISOString()
      };
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

  const migratePreferences = (oldKey, newKey, transformer = (val) => val) => {
    try {
      const oldData = localStorage.getItem(oldKey);
      if (oldData) {
        const parsed = JSON.parse(oldData);
        const current = getPreferences();
        const updated = {
          ...current,
          [newKey]: transformer(parsed)
        };
        savePreferences(updated);
        localStorage.removeItem(oldKey);
        return true;
      }
    } catch (error) {
      console.warn('Migration failed:', error);
    }
    return false;
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
      if (typeof imported === 'object' && imported !== null) {
        return savePreferences(imported);
      }
    } catch (error) {
      console.error('Invalid preferences format:', error);
    }
    return null;
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    migratePreferences,
    exportPreferences,
    importPreferences,
    subscribe
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}