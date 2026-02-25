const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : { ...defaultPreferences };
    } catch (error) {
      console.error('Error loading preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(defaultPreferences));
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Error resetting preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === PREFERENCES_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    getPreference,
    setPreference,
    subscribe,
    defaultPreferences
  };
})();class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
    this.defaults = {
      theme: 'light',
      fontSize: 16,
      notifications: true,
      language: 'en'
    };
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {};
    }
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

  getPreference(key) {
    return this.preferences[key] !== undefined 
      ? this.preferences[key] 
      : this.defaults[key];
  }

  setPreference(key, value) {
    if (this.defaults[key] !== undefined) {
      this.preferences[key] = value;
      return this.savePreferences();
    }
    return false;
  }

  resetPreference(key) {
    if (this.defaults[key] !== undefined) {
      delete this.preferences[key];
      return this.savePreferences();
    }
    return false;
  }

  getAllPreferences() {
    return {
      ...this.defaults,
      ...this.preferences
    };
  }

  clearAllPreferences() {
    this.preferences = {};
    return this.savePreferences();
  }
}

export default UserPreferencesManager;const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true,
        sidebarCollapsed: false
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    };

    const savePreferences = (preferences) => {
        try {
            const validated = validatePreferences(preferences);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const validatePreferences = (preferences) => {
        const valid = {};
        
        if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
            valid.theme = preferences.theme;
        }
        
        if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
            valid.fontSize = preferences.fontSize;
        }
        
        if (typeof preferences.notifications === 'boolean') {
            valid.notifications = preferences.notifications;
        }
        
        if (preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)) {
            valid.language = preferences.language;
        }
        
        if (typeof preferences.autoSave === 'boolean') {
            valid.autoSave = preferences.autoSave;
        }
        
        if (typeof preferences.sidebarCollapsed === 'boolean') {
            valid.sidebarCollapsed = preferences.sidebarCollapsed;
        }
        
        return valid;
    };

    const resetToDefaults = () => {
        localStorage.removeItem(STORAGE_KEY);
        return { ...defaultPreferences };
    };

    const getPreference = (key) => {
        const prefs = loadPreferences();
        return prefs[key];
    };

    const setPreference = (key, value) => {
        const prefs = loadPreferences();
        prefs[key] = value;
        return savePreferences(prefs);
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    const updateMultiplePreferences = (updates) => {
        const prefs = loadPreferences();
        const updated = { ...prefs, ...updates };
        return savePreferences(updated);
    };

    const exportPreferences = () => {
        const prefs = loadPreferences();
        return JSON.stringify(prefs, null, 2);
    };

    const importPreferences = (jsonString) => {
        try {
            const imported = JSON.parse(jsonString);
            return savePreferences(imported);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    };

    return {
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        updateMultiple: updateMultiplePreferences,
        reset: resetToDefaults,
        export: exportPreferences,
        import: importPreferences,
        validate: validatePreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}