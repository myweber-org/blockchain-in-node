const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

class PreferencesManager {
  constructor() {
    this.key = 'app_preferences';
    this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem(this.key);
    if (stored) {
      Object.assign(userPreferences, JSON.parse(stored));
    }
  }

  savePreferences() {
    localStorage.setItem(this.key, JSON.stringify(userPreferences));
  }

  updatePreference(key, value) {
    if (userPreferences.hasOwnProperty(key)) {
      userPreferences[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  getPreference(key) {
    return userPreferences[key];
  }

  resetToDefaults() {
    const defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    Object.assign(userPreferences, defaults);
    this.savePreferences();
  }
}

const preferenceManager = new PreferencesManager();

export { preferenceManager, userPreferences };