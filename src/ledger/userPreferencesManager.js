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
})();