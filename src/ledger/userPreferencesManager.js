
const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    return this;
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    this.savePreferences();
    return this;
  },

  getPreference(key, defaultValue = null) {
    return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    delete this.preferences[key];
    this.savePreferences();
    return this;
  },

  clearAllPreferences() {
    this.preferences = {};
    this.savePreferences();
    return this;
  },

  getAllPreferences() {
    return { ...this.preferences };
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  },

  loadPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences');
      this.preferences = stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      this.preferences = {};
    }
  }
};

export default UserPreferences.init();const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    notifications: true,
    language: 'en',
    fontSize: 16
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
    } catch (error) {
      console.warn('Failed to save preferences:', error);
    }
    return preferences;
  };

  const resetPreferences = () => {
    preferences = { ...DEFAULT_PREFERENCES };
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to reset preferences:', error);
    }
    return preferences;
  };

  const getPreference = (key) => {
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetPreferences,
    get: getPreference,
    getAll: () => ({ ...preferences })
  };
})();