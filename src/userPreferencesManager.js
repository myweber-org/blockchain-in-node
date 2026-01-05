const defaultPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
  language: 'en-US'
};

class UserPreferencesManager {
  constructor(storageKey = 'userPreferences') {
    this.storageKey = storageKey;
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load preferences from localStorage:', error);
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
    return this.preferences[key] ?? defaultPreferences[key];
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

export default UserPreferencesManager;