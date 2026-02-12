const defaultPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
  language: 'en'
};

class UserPreferencesManager {
  constructor() {
    this.storageKey = 'user_preferences';
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
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

  getPreference(key) {
    return this.preferences[key] !== undefined ? this.preferences[key] : defaultPreferences[key];
  }

  setPreference(key, value) {
    if (key in defaultPreferences) {
      this.preferences[key] = value;
      return this.savePreferences();
    }
    return false;
  }

  resetToDefaults() {
    this.preferences = { ...defaultPreferences };
    return this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  clearPreferences() {
    try {
      localStorage.removeItem(this.storageKey);
      this.preferences = { ...defaultPreferences };
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  }
}

const userPrefs = new UserPreferencesManager();const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  let preferences = { ...DEFAULT_PREFERENCES };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        preferences = { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return preferences;
  };

  const savePreferences = (newPreferences) => {
    preferences = { ...preferences, ...newPreferences };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const getPreference = (key) => {
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const resetPreferences = () => {
    preferences = { ...DEFAULT_PREFERENCES };
    localStorage.removeItem(STORAGE_KEY);
    return preferences;
  };

  const getAllPreferences = () => {
    return { ...preferences };
  };

  loadPreferences();

  return {
    get: getPreference,
    set: savePreferences,
    reset: resetPreferences,
    getAll: getAllPreferences
  };
})();const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
        return { ...DEFAULT_PREFERENCES };
    }

    function savePreferences(preferences) {
        try {
            const validated = validatePreferences(preferences);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function validatePreferences(preferences) {
        const result = { ...DEFAULT_PREFERENCES };
        
        if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
            result.theme = preferences.theme;
        }
        
        if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
            result.fontSize = preferences.fontSize;
        }
        
        if (typeof preferences.notifications === 'boolean') {
            result.notifications = preferences.notifications;
        }
        
        if (preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)) {
            result.language = preferences.language;
        }
        
        if (typeof preferences.autoSave === 'boolean') {
            result.autoSave = preferences.autoSave;
        }
        
        return result;
    }

    function resetToDefaults() {
        localStorage.removeItem(STORAGE_KEY);
        return { ...DEFAULT_PREFERENCES };
    }

    function getPreference(key) {
        const prefs = loadPreferences();
        return prefs[key];
    }

    function setPreference(key, value) {
        const prefs = loadPreferences();
        prefs[key] = value;
        return savePreferences(prefs);
    }

    function getAllPreferences() {
        return loadPreferences();
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === STORAGE_KEY) {
                callback(loadPreferences());
            }
        };

        return () => {
            localStorage.setItem = originalSetItem;
        };
    }

    return {
        load: loadPreferences,
        save: savePreferences,
        reset: resetToDefaults,
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        subscribe: subscribe,
        DEFAULT_PREFERENCES: { ...DEFAULT_PREFERENCES }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}const UserPreferences = {
    preferences: {},

    init() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            this.preferences = JSON.parse(stored);
        }
    },

    setPreference(key, value) {
        this.preferences[key] = value;
        this.save();
    },

    getPreference(key) {
        return this.preferences[key];
    },

    removePreference(key) {
        delete this.preferences[key];
        this.save();
    },

    save() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    },

    clearAll() {
        this.preferences = {};
        localStorage.removeItem('userPreferences');
    }
};

UserPreferences.init();