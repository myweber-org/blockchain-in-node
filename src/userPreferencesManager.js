class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return this.getDefaultPreferences();
      }
    }
    return this.getDefaultPreferences();
  }

  getDefaultPreferences() {
    return {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16,
      autoSave: true
    };
  }

  updatePreference(key, value) {
    if (this.preferences.hasOwnProperty(key)) {
      this.preferences[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
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

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  }
}

const preferenceManager = new UserPreferencesManager();const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
        return { ...DEFAULT_PREFERENCES };
    };

    const savePreferences = (preferences) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const updatePreference = (key, value) => {
        const current = loadPreferences();
        if (key in DEFAULT_PREFERENCES) {
            const updated = { ...current, [key]: value };
            return savePreferences(updated);
        }
        return false;
    };

    const resetToDefaults = () => {
        return savePreferences(DEFAULT_PREFERENCES);
    };

    const getPreference = (key) => {
        const preferences = loadPreferences();
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    return {
        get: getPreference,
        set: updatePreference,
        getAll: getAllPreferences,
        reset: resetToDefaults,
        defaults: DEFAULT_PREFERENCES
    };
})();

export default userPreferencesManager;const UserPreferences = {
    storageKey: 'app_preferences',

    defaultPreferences: {
        theme: 'light',
        language: 'en',
        fontSize: 16,
        notifications: true
    },

    getPreferences() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : { ...this.defaultPreferences };
    },

    updatePreferences(newPreferences) {
        const current = this.getPreferences();
        const updated = { ...current, ...newPreferences };
        localStorage.setItem(this.storageKey, JSON.stringify(updated));
        this.dispatchChangeEvent(updated);
        return updated;
    },

    resetToDefaults() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.defaultPreferences));
        this.dispatchChangeEvent(this.defaultPreferences);
        return { ...this.defaultPreferences };
    },

    dispatchChangeEvent(preferences) {
        const event = new CustomEvent('preferencesChanged', { detail: preferences });
        window.dispatchEvent(event);
    },

    getTheme() {
        return this.getPreferences().theme;
    },

    setTheme(theme) {
        return this.updatePreferences({ theme });
    },

    getLanguage() {
        return this.getPreferences().language;
    },

    setLanguage(lang) {
        return this.updatePreferences({ language: lang });
    }
};

window.UserPreferences = UserPreferences;const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULTS = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  };

  const validateKey = (key) => {
    if (!Object.keys(DEFAULTS).includes(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
  };

  const get = (key) => {
    validateKey(key);
    const stored = localStorage.getItem(PREFIX + key);
    
    if (stored === null) {
      return DEFAULTS[key];
    }

    try {
      return JSON.parse(stored);
    } catch {
      return stored;
    }
  };

  const set = (key, value) => {
    validateKey(key);
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    dispatchEvent(new CustomEvent('preferencesChanged', { 
      detail: { key, value } 
    }));
  };

  const reset = () => {
    Object.keys(DEFAULTS).forEach(key => {
      localStorage.removeItem(PREFIX + key);
    });
    dispatchEvent(new Event('preferencesReset'));
  };

  const getAll = () => {
    return Object.keys(DEFAULTS).reduce((prefs, key) => {
      prefs[key] = get(key);
      return prefs;
    }, {});
  };

  const subscribe = (callback) => {
    addEventListener('preferencesChanged', callback);
    addEventListener('preferencesReset', callback);
    
    return () => {
      removeEventListener('preferencesChanged', callback);
      removeEventListener('preferencesReset', callback);
    };
  };

  return {
    get,
    set,
    reset,
    getAll,
    subscribe
  };
})();

export default UserPreferencesManager;