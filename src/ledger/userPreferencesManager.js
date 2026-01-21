const userPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    notifications: true,
    language: 'en',
    fontSize: 16,
    autoSave: false
  };

  const validateKey = (key) => {
    if (!key || typeof key !== 'string') {
      throw new Error('Invalid preference key');
    }
    return true;
  };

  const getStoredPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFIX + 'all');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const savePreferences = (prefs) => {
    try {
      localStorage.setItem(PREFIX + 'all', JSON.stringify(prefs));
      return true;
    } catch {
      return false;
    }
  };

  return {
    get: (key) => {
      validateKey(key);
      const stored = getStoredPreferences();
      return stored.hasOwnProperty(key) ? stored[key] : DEFAULT_PREFERENCES[key];
    },

    set: (key, value) => {
      validateKey(key);
      const stored = getStoredPreferences();
      stored[key] = value;
      return savePreferences(stored);
    },

    getAll: () => {
      const stored = getStoredPreferences();
      return { ...DEFAULT_PREFERENCES, ...stored };
    },

    reset: () => {
      try {
        localStorage.removeItem(PREFIX + 'all');
        return true;
      } catch {
        return false;
      }
    },

    resetToDefaults: () => {
      return savePreferences(DEFAULT_PREFERENCES);
    },

    has: (key) => {
      validateKey(key);
      const stored = getStoredPreferences();
      return stored.hasOwnProperty(key);
    },

    remove: (key) => {
      validateKey(key);
      const stored = getStoredPreferences();
      delete stored[key];
      return savePreferences(stored);
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = userPreferencesManager;
}