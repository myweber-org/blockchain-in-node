class UserPreferencesManager {
  constructor(storageKey = 'user_preferences') {
    this.storageKey = storageKey;
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {};
    }
  }

  savePreferences() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  setPreference(key, value) {
    this.preferences[key] = value;
    return this.savePreferences();
  }

  getPreference(key, defaultValue = null) {
    return key in this.preferences ? this.preferences[key] : defaultValue;
  }

  removePreference(key) {
    const exists = key in this.preferences;
    if (exists) {
      delete this.preferences[key];
      this.savePreferences();
    }
    return exists;
  }

  clearAllPreferences() {
    this.preferences = {};
    localStorage.removeItem(this.storageKey);
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  hasPreference(key) {
    return key in this.preferences;
  }
}

export default UserPreferencesManager;const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    localStorage.removeItem(PREFERENCES_KEY);
    return { ...defaultPreferences };
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === PREFERENCES_KEY) {
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
    getPreference,
    setPreference,
    subscribe
  };
})();

export default userPreferencesManager;const userPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en'
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    };

    const savePreferences = (preferences) => {
        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const updatePreference = (key, value) => {
        const current = loadPreferences();
        if (key in DEFAULT_PREFERENCES) {
            current[key] = value;
            return savePreferences(current);
        }
        return false;
    };

    const resetPreferences = () => {
        return savePreferences(DEFAULT_PREFERENCES);
    };

    const getPreference = (key) => {
        const prefs = loadPreferences();
        return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    return {
        loadPreferences,
        savePreferences,
        updatePreference,
        resetPreferences,
        getPreference,
        getAllPreferences
    };
})();const UserPreferencesManager = (() => {
    const PREFIX = 'app_pref_';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const validateKey = (key) => {
        if (!key || typeof key !== 'string') {
            throw new Error('Invalid preference key');
        }
        return true;
    };

    const getFullKey = (key) => `${PREFIX}${key}`;

    const getAllPreferences = () => {
        const preferences = { ...DEFAULT_PREFERENCES };
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(PREFIX)) {
                const prefKey = key.replace(PREFIX, '');
                try {
                    preferences[prefKey] = JSON.parse(localStorage.getItem(key));
                } catch (error) {
                    console.warn(`Failed to parse preference: ${prefKey}`);
                }
            }
        });
        return preferences;
    };

    const setPreference = (key, value) => {
        validateKey(key);
        const storageKey = getFullKey(key);
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(storageKey, serializedValue);
            return true;
        } catch (error) {
            console.error(`Failed to set preference ${key}:`, error);
            return false;
        }
    };

    const getPreference = (key) => {
        validateKey(key);
        const storageKey = getFullKey(key);
        try {
            const storedValue = localStorage.getItem(storageKey);
            if (storedValue === null) {
                return DEFAULT_PREFERENCES[key];
            }
            return JSON.parse(storedValue);
        } catch (error) {
            console.warn(`Failed to get preference ${key}, returning default`);
            return DEFAULT_PREFERENCES[key];
        }
    };

    const removePreference = (key) => {
        validateKey(key);
        localStorage.removeItem(getFullKey(key));
    };

    const resetToDefaults = () => {
        Object.keys(DEFAULT_PREFERENCES).forEach((key) => {
            removePreference(key);
        });
    };

    const exportPreferences = () => {
        const prefs = getAllPreferences();
        return JSON.stringify(prefs, null, 2);
    };

    const importPreferences = (jsonString) => {
        try {
            const importedPrefs = JSON.parse(jsonString);
            Object.keys(importedPrefs).forEach((key) => {
                if (key in DEFAULT_PREFERENCES) {
                    setPreference(key, importedPrefs[key]);
                }
            });
            return true;
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    };

    const subscribe = (callback) => {
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key.startsWith(PREFIX)) {
                const prefKey = key.replace(PREFIX, '');
                callback(prefKey, JSON.parse(value));
            }
        };
        return () => {
            localStorage.setItem = originalSetItem;
        };
    };

    return {
        getAll: getAllPreferences,
        get: getPreference,
        set: setPreference,
        remove: removePreference,
        reset: resetToDefaults,
        export: exportPreferences,
        import: importPreferences,
        subscribe: subscribe,
        defaults: { ...DEFAULT_PREFERENCES }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}