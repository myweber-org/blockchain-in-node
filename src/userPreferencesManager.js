class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return this.getDefaultPreferences();
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
      autoSave: true
    };
  }

  updatePreference(key, value) {
    if (this.preferences.hasOwnProperty(key)) {
      this.preferences[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
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
  }

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  }
}

const preferenceManager = new UserPreferencesManager();const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
        return { ...DEFAULT_PREFERENCES };
    };

    const savePreferences = (preferences) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const updatePreference = (key, value) => {
        const current = loadPreferences();
        if (key in DEFAULT_PREFERENCES) {
            const updated = { ...current, [key]: value };
            return savePreferences(updated);
        }
        return false;
    };

    const resetToDefaults = () => {
        return savePreferences(DEFAULT_PREFERENCES);
    };

    const getPreference = (key) => {
        const preferences = loadPreferences();
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    return {
        get: getPreference,
        set: updatePreference,
        getAll: getAllPreferences,
        reset: resetToDefaults,
        defaults: DEFAULT_PREFERENCES
    };
})();

export default userPreferencesManager;