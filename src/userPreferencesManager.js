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

export default UserPreferencesManager;class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored preferences:', error);
      }
    }
    return this.getDefaultPreferences();
  }

  getDefaultPreferences() {
    return {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16,
      autoSave: true,
      sidebarCollapsed: false
    };
  }

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  updatePreference(key, value) {
    if (key in this.preferences) {
      this.preferences[key] = value;
      return this.savePreferences();
    }
    return false;
  }

  getPreference(key) {
    return this.preferences[key];
  }

  resetToDefaults() {
    this.preferences = this.getDefaultPreferences();
    return this.savePreferences();
  }

  exportPreferences() {
    const dataStr = JSON.stringify(this.preferences, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    return URL.createObjectURL(dataBlob);
  }

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.preferences = { ...this.getDefaultPreferences(), ...imported };
      return this.savePreferences();
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  }
}

export default UserPreferencesManager;