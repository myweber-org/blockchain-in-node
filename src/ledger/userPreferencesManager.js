const userPreferencesManager = {
  storageKey: 'app_preferences',

  getPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading preferences:', error);
      return {};
    }
  },

  setPreference(key, value) {
    try {
      const preferences = this.getPreferences();
      preferences[key] = value;
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Error saving preference:', error);
      return false;
    }
  },

  removePreference(key) {
    try {
      const preferences = this.getPreferences();
      delete preferences[key];
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Error removing preference:', error);
      return false;
    }
  },

  clearAll() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing preferences:', error);
      return false;
    }
  },

  getAllKeys() {
    const preferences = this.getPreferences();
    return Object.keys(preferences);
  },

  hasPreference(key) {
    const preferences = this.getPreferences();
    return key in preferences;
  }
};

export default userPreferencesManager;const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false,
        lastUpdated: null
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...defaultPreferences, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    };

    const savePreferences = (updates) => {
        try {
            const current = getPreferences();
            const updated = {
                ...current,
                ...updates,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const exportPreferences = () => {
        const prefs = getPreferences();
        const dataStr = JSON.stringify(prefs, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        return dataUri;
    };

    const importPreferences = (jsonString) => {
        try {
            const imported = JSON.parse(jsonString);
            return savePreferences(imported);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return null;
        }
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY && event.newValue) {
                try {
                    const newPrefs = JSON.parse(event.newValue);
                    callback(newPrefs);
                } catch (error) {
                    console.warn('Failed to parse updated preferences:', error);
                }
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        export: exportPreferences,
        import: importPreferences,
        subscribe: subscribe,
        getDefaults: () => ({ ...defaultPreferences })
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}