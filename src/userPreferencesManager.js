const userPreferencesManager = (() => {
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  };

  const STORAGE_KEY = 'app_user_preferences';

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
      const validated = validatePreferences(preferences);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const validatePreferences = (preferences) => {
    const valid = {};
    
    if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
      valid.theme = preferences.theme;
    }

    if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
      valid.fontSize = preferences.fontSize;
    }

    if (typeof preferences.notifications === 'boolean') {
      valid.notifications = preferences.notifications;
    }

    if (preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)) {
      valid.language = preferences.language;
    }

    return valid;
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...DEFAULT_PREFERENCES };
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
  };

  const updatePreference = (key, value) => {
    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    const validated = validatePreferences(updated);
    return savePreferences({ ...current, ...validated });
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetToDefaults,
    get: getPreference,
    update: updatePreference,
    defaults: { ...DEFAULT_PREFERENCES }
  };
})();

export default userPreferencesManager;const UserPreferencesManager = (() => {
  const PREFIX = 'user_pref_';
  
  const validateKey = (key) => {
    if (typeof key !== 'string' || key.trim() === '') {
      throw new Error('Key must be a non-empty string');
    }
    return key.trim();
  };

  const validateValue = (value) => {
    if (value === undefined || value === null) {
      throw new Error('Value cannot be undefined or null');
    }
    return value;
  };

  const serialize = (value) => {
    try {
      return JSON.stringify(value);
    } catch (error) {
      throw new Error('Failed to serialize value');
    }
  };

  const deserialize = (value) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  };

  return {
    setPreference(key, value) {
      const validKey = validateKey(key);
      const validValue = validateValue(value);
      const storageKey = PREFIX + validKey;
      
      try {
        const serialized = serialize(validValue);
        localStorage.setItem(storageKey, serialized);
        return true;
      } catch (error) {
        console.error('Failed to set preference:', error);
        return false;
      }
    },

    getPreference(key, defaultValue = null) {
      const validKey = validateKey(key);
      const storageKey = PREFIX + validKey;
      
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored === null) {
          return defaultValue;
        }
        return deserialize(stored);
      } catch (error) {
        console.error('Failed to get preference:', error);
        return defaultValue;
      }
    },

    removePreference(key) {
      const validKey = validateKey(key);
      const storageKey = PREFIX + validKey;
      
      try {
        localStorage.removeItem(storageKey);
        return true;
      } catch (error) {
        console.error('Failed to remove preference:', error);
        return false;
      }
    },

    clearAllPreferences() {
      try {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith(PREFIX)) {
            keysToRemove.push(key);
          }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
        return true;
      } catch (error) {
        console.error('Failed to clear preferences:', error);
        return false;
      }
    },

    getAllPreferences() {
      const preferences = {};
      
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith(PREFIX)) {
            const preferenceKey = key.substring(PREFIX.length);
            preferences[preferenceKey] = this.getPreference(preferenceKey);
          }
        }
      } catch (error) {
        console.error('Failed to get all preferences:', error);
      }
      
      return preferences;
    },

    hasPreference(key) {
      const validKey = validateKey(key);
      const storageKey = PREFIX + validKey;
      
      try {
        return localStorage.getItem(storageKey) !== null;
      } catch (error) {
        console.error('Failed to check preference:', error);
        return false;
      }
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}