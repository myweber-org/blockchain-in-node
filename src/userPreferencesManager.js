const UserPreferencesManager = {
  storageKey: 'app_user_preferences',

  defaults: {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true
  },

  getPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return { ...this.defaults, ...JSON.parse(stored) };
      }
      return { ...this.defaults };
    } catch (error) {
      console.warn('Failed to load preferences:', error);
      return { ...this.defaults };
    }
  },

  savePreferences(preferences) {
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(this.storageKey, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  resetToDefaults() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.defaults));
      return true;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return false;
    }
  },

  getPreference(key) {
    const prefs = this.getPreferences();
    return prefs[key] !== undefined ? prefs[key] : this.defaults[key];
  },

  setPreference(key, value) {
    return this.savePreferences({ [key]: value });
  },

  clearAll() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  }
};

export default UserPreferencesManager;const UserPreferences = {
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

const userPrefs = UserPreferences.init();