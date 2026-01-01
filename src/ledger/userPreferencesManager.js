const USER_PREFERENCES_KEY = 'app_preferences';

class UserPreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem(USER_PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : this.getDefaultPreferences();
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return this.getDefaultPreferences();
        }
    }

    getDefaultPreferences() {
        return {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16,
            autoSave: true,
            lastUpdated: new Date().toISOString()
        };
    }

    updatePreference(key, value) {
        if (key in this.preferences) {
            this.preferences[key] = value;
            this.preferences.lastUpdated = new Date().toISOString();
            this.savePreferences();
            return true;
        }
        return false;
    }

    savePreferences() {
        try {
            localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(this.preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    getPreference(key) {
        return this.preferences[key];
    }

    getAllPreferences() {
        return { ...this.preferences };
    }

    resetToDefaults() {
        this.preferences = this.getDefaultPreferences();
        this.savePreferences();
    }

    exportPreferences() {
        return JSON.stringify(this.preferences, null, 2);
    }

    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.preferences = { ...this.getDefaultPreferences(), ...imported };
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }
}

const preferencesManager = new UserPreferencesManager();
export default preferencesManager;const UserPreferencesManager = (() => {
    const PREFIX = 'user_pref_';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const validateKey = (key) => {
        if (!key || typeof key !== 'string') {
            throw new Error('Key must be a non-empty string');
        }
        return true;
    };

    const validateValue = (value) => {
        if (value === undefined || value === null) {
            throw new Error('Value cannot be null or undefined');
        }
        return true;
    };

    const getStorageKey = (key) => `${PREFIX}${key}`;

    const get = (key) => {
        validateKey(key);
        const storageKey = getStorageKey(key);
        const storedValue = localStorage.getItem(storageKey);
        
        if (storedValue === null) {
            return DEFAULT_PREFERENCES[key] !== undefined ? DEFAULT_PREFERENCES[key] : null;
        }

        try {
            return JSON.parse(storedValue);
        } catch {
            return storedValue;
        }
    };

    const set = (key, value) => {
        validateKey(key);
        validateValue(value);
        
        const storageKey = getStorageKey(key);
        const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
        
        localStorage.setItem(storageKey, valueToStore);
        return true;
    };

    const remove = (key) => {
        validateKey(key);
        const storageKey = getStorageKey(key);
        localStorage.removeItem(storageKey);
        return true;
    };

    const clear = () => {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(PREFIX)) {
                keysToRemove.push(key);
            }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
        return keysToRemove.length;
    };

    const getAll = () => {
        const preferences = { ...DEFAULT_PREFERENCES };
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(PREFIX)) {
                const prefKey = key.replace(PREFIX, '');
                try {
                    preferences[prefKey] = JSON.parse(localStorage.getItem(key));
                } catch {
                    preferences[prefKey] = localStorage.getItem(key);
                }
            }
        }
        
        return preferences;
    };

    const resetToDefaults = () => {
        clear();
        Object.keys(DEFAULT_PREFERENCES).forEach(key => {
            set(key, DEFAULT_PREFERENCES[key]);
        });
        return getAll();
    };

    const has = (key) => {
        validateKey(key);
        const storageKey = getStorageKey(key);
        return localStorage.getItem(storageKey) !== null;
    };

    return {
        get,
        set,
        remove,
        clear,
        getAll,
        resetToDefaults,
        has,
        DEFAULT_PREFERENCES
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  
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
      language: (val) => /^[a-z]{2}(-[A-Z]{2})?$/.test(val),
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

  const subscribe = (callback) => {
    const storageHandler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(loadPreferences());
      }
    };
    window.addEventListener('storage', storageHandler);
    
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  };

  return {
    get: (key) => {
      const prefs = loadPreferences();
      return prefs[key];
    },
    
    set: (key, value) => {
      if (!validatePreference(key, value)) {
        throw new Error(`Invalid value for preference "${key}"`);
      }
      
      const prefs = loadPreferences();
      prefs[key] = value;
      return savePreferences(prefs);
    },
    
    getAll: () => loadPreferences(),
    
    update: (updates) => {
      const prefs = loadPreferences();
      Object.keys(updates).forEach(key => {
        if (validatePreference(key, updates[key])) {
          prefs[key] = updates[key];
        }
      });
      return savePreferences(prefs);
    },
    
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    subscribe
  };
})();