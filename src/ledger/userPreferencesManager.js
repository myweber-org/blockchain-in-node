const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true,
        sidebarCollapsed: false
    };

    let currentPreferences = { ...defaultPreferences };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                currentPreferences = { ...defaultPreferences, ...parsed };
            }
            return currentPreferences;
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return defaultPreferences;
        }
    };

    const savePreferences = (updates) => {
        try {
            currentPreferences = { ...currentPreferences, ...updates };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
            return currentPreferences;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    };

    const resetToDefaults = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            currentPreferences = { ...defaultPreferences };
            return currentPreferences;
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const getPreference = (key) => {
        return currentPreferences[key] !== undefined 
            ? currentPreferences[key] 
            : defaultPreferences[key];
    };

    const getAllPreferences = () => {
        return { ...currentPreferences };
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY) {
                callback(getAllPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    loadPreferences();

    return {
        get: getPreference,
        getAll: getAllPreferences,
        set: savePreferences,
        reset: resetToDefaults,
        subscribe,
        defaults: { ...defaultPreferences }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const PreferencesManager = {
  storageKey: 'user_preferences',

  loadPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
    return this.getDefaultPreferences();
  },

  savePreferences(prefs) {
    const merged = { ...this.getDefaultPreferences(), ...prefs };
    localStorage.setItem(this.storageKey, JSON.stringify(merged));
    return merged;
  },

  getDefaultPreferences() {
    return { ...userPreferences };
  },

  resetPreferences() {
    localStorage.removeItem(this.storageKey);
    return this.getDefaultPreferences();
  },

  updatePreference(key, value) {
    const current = this.loadPreferences();
    const updated = { ...current, [key]: value };
    return this.savePreferences(updated);
  }
};

export default PreferencesManager;