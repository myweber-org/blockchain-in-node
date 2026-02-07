const UserPreferences = {
  storageKey: 'app_preferences',

  getPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : {};
  },

  setPreference(key, value) {
    const preferences = this.getPreferences();
    preferences[key] = value;
    localStorage.setItem(this.storageKey, JSON.stringify(preferences));
    return true;
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

  clearAll() {
    localStorage.removeItem(this.storageKey);
    return true;
  },

  getAll() {
    return this.getPreferences();
  }
};

export default UserPreferences;