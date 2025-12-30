const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
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

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (e) {
            console.error('Failed to save preferences:', e);
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
        window.addEventListener('storage', function(e) {
            if (e.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        getPreference: getPreference,
        setPreference: setPreference,
        subscribe: subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 'medium'
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Error reading preferences:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Error resetting preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
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
})();const UserPreferences = {
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

  clearAll() {
    this.preferences = {};
    this.save();
  },

  save() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  },

  getAllPreferences() {
    return { ...this.preferences };
  }
};

UserPreferences.init();const UserPreferencesManager = (() => {
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

  const getFullKey = (key) => `${PREFIX}${key}`;

  const getAll = () => {
    const preferences = { ...DEFAULT_PREFERENCES };
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(PREFIX)) {
        const prefKey = key.replace(PREFIX, '');
        try {
          preferences[prefKey] = JSON.parse(localStorage.getItem(key));
        } catch {
          preferences[prefKey] = localStorage.getItem(key);
        }
      }
    });
    return preferences;
  };

  const get = (key) => {
    validateKey(key);
    const fullKey = getFullKey(key);
    const value = localStorage.getItem(fullKey);
    
    if (value === null) {
      return DEFAULT_PREFERENCES[key] !== undefined ? DEFAULT_PREFERENCES[key] : null;
    }

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const set = (key, value) => {
    validateKey(key);
    const fullKey = getFullKey(key);
    const storageValue = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(fullKey, storageValue);
    return true;
  };

  const remove = (key) => {
    validateKey(key);
    localStorage.removeItem(getFullKey(key));
    return true;
  };

  const reset = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    return true;
  };

  const has = (key) => {
    validateKey(key);
    return localStorage.getItem(getFullKey(key)) !== null;
  };

  return {
    getAll,
    get,
    set,
    remove,
    reset,
    has,
    DEFAULT_PREFERENCES
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}