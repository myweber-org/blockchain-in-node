class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
    this.listeners = new Set();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences');
      return stored ? JSON.parse(stored) : this.getDefaultPreferences();
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return this.getDefaultPreferences();
    }
  }

  getDefaultPreferences() {
    return {
      theme: 'light',
      notifications: true,
      language: 'en',
      fontSize: 16,
      autoSave: true,
      showTutorial: false
    };
  }

  updatePreference(key, value) {
    if (!this.preferences.hasOwnProperty(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    const oldValue = this.preferences[key];
    this.preferences[key] = value;
    
    this.savePreferences();
    this.notifyListeners(key, value, oldValue);
    
    return true;
  }

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }

  getPreference(key) {
    return this.preferences[key];
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  resetToDefaults() {
    this.preferences = this.getDefaultPreferences();
    this.savePreferences();
    this.notifyListeners('reset', this.preferences, null);
  }

  addListener(callback) {
    this.listeners.add(callback);
  }

  removeListener(callback) {
    this.listeners.delete(callback);
  }

  notifyListeners(key, newValue, oldValue) {
    this.listeners.forEach(callback => {
      try {
        callback(key, newValue, oldValue);
      } catch (error) {
        console.error('Listener error:', error);
      }
    });
  }

  exportPreferences() {
    const dataStr = JSON.stringify(this.preferences, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    return URL.createObjectURL(dataBlob);
  }

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      const validated = this.validatePreferences(imported);
      
      this.preferences = { ...this.preferences, ...validated };
      this.savePreferences();
      this.notifyListeners('import', this.preferences, null);
      
      return true;
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  }

  validatePreferences(prefs) {
    const defaultPrefs = this.getDefaultPreferences();
    const validated = {};
    
    for (const key in defaultPrefs) {
      if (prefs.hasOwnProperty(key) && typeof prefs[key] === typeof defaultPrefs[key]) {
        validated[key] = prefs[key];
      }
    }
    
    return validated;
  }
}

export default UserPreferencesManager;