const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
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
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    return {
      theme: validThemes.includes(preferences.theme) ? preferences.theme : DEFAULT_PREFERENCES.theme,
      language: validLanguages.includes(preferences.language) ? preferences.language : DEFAULT_PREFERENCES.language,
      notifications: typeof preferences.notifications === 'boolean' ? preferences.notifications : DEFAULT_PREFERENCES.notifications,
      fontSize: Number.isInteger(preferences.fontSize) && preferences.fontSize >= 12 && preferences.fontSize <= 24 
        ? preferences.fontSize 
        : DEFAULT_PREFERENCES.fontSize,
      autoSave: typeof preferences.autoSave === 'boolean' ? preferences.autoSave : DEFAULT_PREFERENCES.autoSave
    };
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...DEFAULT_PREFERENCES };
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
  };

  const setPreference = (key, value) => {
    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
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
    load: loadPreferences,
    save: savePreferences,
    reset: resetToDefaults,
    get: getPreference,
    set: setPreference,
    subscribe,
    defaults: { ...DEFAULT_PREFERENCES }
  };
})();const UserPreferencesManager = (() => {
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
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  };

  const updatePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to update preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return DEFAULT_PREFERENCES;
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
    getPreferences,
    updatePreferences,
    resetPreferences,
    subscribe
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = {
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  },

  init: function() {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      this.preferences = JSON.parse(saved);
    }
    return this;
  },

  updatePreference: function(key, value) {
    if (this.preferences.hasOwnProperty(key)) {
      this.preferences[key] = value;
      this.save();
      return true;
    }
    return false;
  },

  getPreference: function(key) {
    return this.preferences[key];
  },

  getAllPreferences: function() {
    return {...this.preferences};
  },

  resetToDefaults: function() {
    this.preferences = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    this.save();
  },

  save: function() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  }
};

export default UserPreferencesManager.init();const userPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_preferences';

    function getPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        return stored ? JSON.parse(stored) : {};
    }

    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
        return preferences;
    }

    function removePreference(key) {
        const preferences = getPreferences();
        delete preferences[key];
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
        return preferences;
    }

    function clearPreferences() {
        localStorage.removeItem(PREFERENCES_KEY);
        return {};
    }

    function getAllPreferences() {
        return getPreferences();
    }

    function hasPreference(key) {
        const preferences = getPreferences();
        return key in preferences;
    }

    return {
        get: getPreferences,
        set: setPreference,
        remove: removePreference,
        clear: clearPreferences,
        all: getAllPreferences,
        has: hasPreference
    };
})();