class UserPreferencesManager {
  constructor(storageKey = 'user_preferences') {
    this.storageKey = storageKey;
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {};
    }
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

  setPreference(key, value) {
    this.preferences[key] = value;
    return this.savePreferences();
  }

  getPreference(key, defaultValue = null) {
    return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
  }

  removePreference(key) {
    if (this.preferences.hasOwnProperty(key)) {
      delete this.preferences[key];
      return this.savePreferences();
    }
    return false;
  }

  clearAllPreferences() {
    this.preferences = {};
    return this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  hasPreference(key) {
    return this.preferences.hasOwnProperty(key);
  }
}

export default UserPreferencesManager;const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        fontSize: 16,
        notifications: true
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Error reading preferences:', error);
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
            console.error('Error saving preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Error resetting preferences:', error);
            return null;
        }
    };

    const getPreference = (key) => {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : null;
    };

    const setPreference = (key, value) => {
        return savePreferences({ [key]: value });
    };

    const applyTheme = () => {
        const { theme } = getPreferences();
        document.documentElement.setAttribute('data-theme', theme);
    };

    const applyFontSize = () => {
        const { fontSize } = getPreferences();
        document.documentElement.style.fontSize = `${fontSize}px`;
    };

    const initialize = () => {
        applyTheme();
        applyFontSize();
    };

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference,
        applyTheme,
        applyFontSize,
        initialize
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}