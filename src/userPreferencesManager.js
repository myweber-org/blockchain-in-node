const UserPreferences = {
  storageKey: 'app_preferences',

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
    delete preferences[key];
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to remove preference:', error);
      return false;
    }
  },

  clearAll() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  },

  hasPreference(key) {
    const preferences = this.getPreferences();
    return key in preferences;
  },

  getAllKeys() {
    const preferences = this.getPreferences();
    return Object.keys(preferences);
  }
};

export default UserPreferences;