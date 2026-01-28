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

export { preferenceManager, userPreferences };const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        sidebarCollapsed: false
    };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    }

    function savePreferences(preferences) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function updatePreference(key, value) {
        if (!defaultPreferences.hasOwnProperty(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
        
        const current = loadPreferences();
        const updated = { ...current, [key]: value };
        
        if (savePreferences(updated)) {
            dispatchPreferenceChange(key, value);
            return true;
        }
        return false;
    }

    function resetPreferences() {
        if (savePreferences(defaultPreferences)) {
            Object.keys(defaultPreferences).forEach(key => {
                dispatchPreferenceChange(key, defaultPreferences[key]);
            });
            return true;
        }
        return false;
    }

    function dispatchPreferenceChange(key, value) {
        window.dispatchEvent(new CustomEvent('preferencechange', {
            detail: { key, value }
        }));
    }

    function getPreference(key) {
        const prefs = loadPreferences();
        return prefs[key];
    }

    function getAllPreferences() {
        return loadPreferences();
    }

    function exportPreferences() {
        const prefs = loadPreferences();
        return JSON.stringify(prefs, null, 2);
    }

    function importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            const validated = { ...defaultPreferences, ...imported };
            return savePreferences(validated);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }

    return {
        get: getPreference,
        getAll: getAllPreferences,
        update: updatePreference,
        reset: resetPreferences,
        export: exportPreferences,
        import: importPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}