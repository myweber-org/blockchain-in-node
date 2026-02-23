const userPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
  language: 'en'
};

class PreferencesManager {
  constructor() {
    this.prefs = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    return stored ? JSON.parse(stored) : { ...userPreferences };
  }

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
    return this.prefs;
  }

  updatePreference(key, value) {
    if (this.prefs.hasOwnProperty(key)) {
      this.prefs[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  resetToDefaults() {
    this.prefs = { ...userPreferences };
    this.savePreferences();
    return this.prefs;
  }

  getAllPreferences() {
    return { ...this.prefs };
  }
}

const preferencesManager = new PreferencesManager();

export { preferencesManager, PreferencesManager };