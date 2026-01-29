const userPreferencesManager = (() => {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        notifications: true,
        language: 'en',
        fontSize: 16,
        autoSave: false
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    };

    const savePreferences = (preferences) => {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const getPreference = (key) => {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    };

    const setPreference = (key, value) => {
        return savePreferences({ [key]: value });
    };

    const migratePreferences = (oldKey, newKey, defaultValue) => {
        const oldValue = localStorage.getItem(oldKey);
        if (oldValue !== null) {
            const preferences = getPreferences();
            preferences[newKey] = oldValue;
            savePreferences(preferences);
            localStorage.removeItem(oldKey);
            return oldValue;
        }
        return defaultValue;
    };

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference,
        migratePreferences,
        DEFAULT_PREFERENCES
    };
})();const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

class PreferencesManager {
  constructor() {
    this.storageKey = 'app_preferences';
    this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        Object.assign(userPreferences, JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored preferences:', error);
      }
    }
  }

  savePreferences() {
    localStorage.setItem(this.storageKey, JSON.stringify(userPreferences));
  }

  updatePreference(key, value) {
    if (key in userPreferences) {
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

  getAllPreferences() {
    return { ...userPreferences };
  }
}

const preferencesManager = new PreferencesManager();

export { preferencesManager, userPreferences };