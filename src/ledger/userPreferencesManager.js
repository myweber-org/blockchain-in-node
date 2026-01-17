const userPreferencesManager = {
  storageKey: 'app_preferences',

  getPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading preferences:', error);
      return {};
    }
  },

  setPreference(key, value) {
    try {
      const preferences = this.getPreferences();
      preferences[key] = value;
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Error saving preference:', error);
      return false;
    }
  },

  removePreference(key) {
    try {
      const preferences = this.getPreferences();
      delete preferences[key];
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Error removing preference:', error);
      return false;
    }
  },

  clearAll() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing preferences:', error);
      return false;
    }
  },

  getAllKeys() {
    const preferences = this.getPreferences();
    return Object.keys(preferences);
  },

  hasPreference(key) {
    const preferences = this.getPreferences();
    return key in preferences;
  }
};

export default userPreferencesManager;