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

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
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
    get: getPreferences,
    save: savePreferences,
    reset: resetPreferences,
    subscribe,
    getDefault: () => ({ ...defaultPreferences })
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  
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

  const getStorageKey = (key) => `${PREFIX}${key}`;

  const setPreference = (key, value) => {
    const validKey = validateKey(key);
    const validValue = validateValue(value);
    
    try {
      const serializedValue = JSON.stringify({
        value: validValue,
        timestamp: Date.now(),
        version: '1.0'
      });
      localStorage.setItem(getStorageKey(validKey), serializedValue);
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  };

  const getPreference = (key, defaultValue = null) => {
    const validKey = validateKey(key);
    
    try {
      const stored = localStorage.getItem(getStorageKey(validKey));
      if (!stored) return defaultValue;
      
      const parsed = JSON.parse(stored);
      return parsed.value !== undefined ? parsed.value : defaultValue;
    } catch (error) {
      console.error('Failed to retrieve preference:', error);
      return defaultValue;
    }
  };

  const removePreference = (key) => {
    const validKey = validateKey(key);
    
    try {
      localStorage.removeItem(getStorageKey(validKey));
      return true;
    } catch (error) {
      console.error('Failed to remove preference:', error);
      return false;
    }
  };

  const clearAllPreferences = () => {
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
  };

  const getAllPreferences = () => {
    const preferences = {};
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(PREFIX)) {
          const preferenceKey = key.replace(PREFIX, '');
          preferences[preferenceKey] = getPreference(preferenceKey);
        }
      }
    } catch (error) {
      console.error('Failed to get all preferences:', error);
    }
    
    return preferences;
  };

  const hasPreference = (key) => {
    const validKey = validateKey(key);
    return localStorage.getItem(getStorageKey(validKey)) !== null;
  };

  return {
    set: setPreference,
    get: getPreference,
    remove: removePreference,
    clear: clearAllPreferences,
    getAll: getAllPreferences,
    has: hasPreference
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = {
  storageKey: 'app_user_preferences',

  getPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return {};
    }
  },

  setPreference(key, value) {
    if (!key || typeof key !== 'string') {
      throw new Error('Preference key must be a non-empty string');
    }

    const preferences = this.getPreferences();
    preferences[key] = value;

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  },

  removePreference(key) {
    const preferences = this.getPreferences();
    if (preferences.hasOwnProperty(key)) {
      delete preferences[key];
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    }
    return false;
  },

  clearAllPreferences() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  },

  getAllPreferences() {
    return { ...this.getPreferences() };
  },

  hasPreference(key) {
    const preferences = this.getPreferences();
    return preferences.hasOwnProperty(key);
  }
};

export default UserPreferencesManager;