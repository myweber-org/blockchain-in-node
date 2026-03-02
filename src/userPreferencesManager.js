const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
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

    const getPreference = (key) => {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
    };

    const setPreference = (key, value) => {
        return savePreferences({ [key]: value });
    };

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference
    };
})();const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        showTutorial: false
    };

    let preferences = { ...defaultPreferences };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                preferences = { ...defaultPreferences, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return preferences;
    };

    const savePreferences = (newPreferences) => {
        try {
            preferences = { ...preferences, ...newPreferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const getPreference = (key) => {
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
    };

    const resetToDefaults = () => {
        preferences = { ...defaultPreferences };
        localStorage.removeItem(STORAGE_KEY);
        return preferences;
    };

    const getAllPreferences = () => {
        return { ...preferences };
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
        set: savePreferences,
        getAll: getAllPreferences,
        reset: resetToDefaults,
        subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}const UserPreferencesManager = (function() {
    const PREFERENCES_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false,
        sidebarCollapsed: false
    };
    
    function getPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
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
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }
    
    function resetPreferences() {
        localStorage.removeItem(PREFERENCES_KEY);
        return defaultPreferences;
    }
    
    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : null;
    }
    
    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }
    
    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === PREFERENCES_KEY) {
                callback(getPreferences());
            }
        });
    }
    
    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        getItem: getPreference,
        setItem: setPreference,
        subscribe: subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferences = {
  storageKey: 'app_preferences',

  defaults: {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  },

  getPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : { ...this.defaults };
  },

  updatePreferences(newPrefs) {
    const current = this.getPreferences();
    const updated = { ...current, ...newPrefs };
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
    return updated;
  },

  resetToDefaults() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.defaults));
    return { ...this.defaults };
  },

  getPreference(key) {
    const prefs = this.getPreferences();
    return prefs[key] !== undefined ? prefs[key] : this.defaults[key];
  },

  setPreference(key, value) {
    const prefs = this.getPreferences();
    prefs[key] = value;
    localStorage.setItem(this.storageKey, JSON.stringify(prefs));
    return value;
  },

  clearPreferences() {
    localStorage.removeItem(this.storageKey);
  },

  exportPreferences() {
    const prefs = this.getPreferences();
    return JSON.stringify(prefs, null, 2);
  },

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      const validated = this.validatePreferences(imported);
      localStorage.setItem(this.storageKey, JSON.stringify(validated));
      return validated;
    } catch (error) {
      console.error('Invalid preferences format:', error);
      return null;
    }
  },

  validatePreferences(prefs) {
    const validated = {};
    for (const key in this.defaults) {
      if (prefs[key] !== undefined && typeof prefs[key] === typeof this.defaults[key]) {
        validated[key] = prefs[key];
      } else {
        validated[key] = this.defaults[key];
      }
    }
    return validated;
  },

  getAllPreferences() {
    return this.getPreferences();
  },

  hasCustomPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    return stored !== null;
  }
};

Object.freeze(UserPreferences.defaults);
Object.freeze(UserPreferences);const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    return this;
  },

  loadPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences');
      this.preferences = stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      this.preferences = {};
    }
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    return this.savePreferences();
  },

  getPreference(key, defaultValue = null) {
    return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    if (this.preferences.hasOwnProperty(key)) {
      delete this.preferences[key];
      return this.savePreferences();
    }
    return false;
  },

  clearAllPreferences() {
    this.preferences = {};
    return this.savePreferences();
  },

  getAllPreferences() {
    return { ...this.preferences };
  }
};

export default UserPreferences.init();