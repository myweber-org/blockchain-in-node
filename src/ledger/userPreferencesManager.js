const userPreferencesManager = (() => {
  const PREF_KEY = 'app_preferences';
  const DEFAULT_PREFS = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREF_KEY);
      return stored ? { ...DEFAULT_PREFS, ...JSON.parse(stored) } : { ...DEFAULT_PREFS };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...DEFAULT_PREFS };
    }
  };

  const updatePreference = (key, value) => {
    if (!DEFAULT_PREFS.hasOwnProperty(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
    
    const currentPrefs = getPreferences();
    const updatedPrefs = { ...currentPrefs, [key]: value };
    
    try {
      localStorage.setItem(PREF_KEY, JSON.stringify(updatedPrefs));
      return updatedPrefs;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return currentPrefs;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(PREF_KEY);
      return { ...DEFAULT_PREFS };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return getPreferences();
    }
  };

  const subscribe = (callback) => {
    const storageHandler = (event) => {
      if (event.key === PREF_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', storageHandler);
    
    return () => window.removeEventListener('storage', storageHandler);
  };

  return {
    getPreferences,
    updatePreference,
    resetPreferences,
    subscribe
  };
})();const userPreferencesManager = (() => {
  const PREF_KEY = 'app_preferences';
  const DEFAULT_PREFS = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREF_KEY);
      return stored ? { ...DEFAULT_PREFS, ...JSON.parse(stored) } : { ...DEFAULT_PREFS };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...DEFAULT_PREFS };
    }
  };

  const savePreference = (key, value) => {
    if (!key || typeof key !== 'string') {
      throw new Error('Preference key must be a non-empty string');
    }

    const currentPrefs = getPreferences();
    const updatedPrefs = { ...currentPrefs, [key]: value };

    try {
      localStorage.setItem(PREF_KEY, JSON.stringify(updatedPrefs));
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(PREF_KEY);
      return true;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return false;
    }
  };

  const subscribe = (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    const storageHandler = (event) => {
      if (event.key === PREF_KEY) {
        callback(getPreferences());
      }
    };

    window.addEventListener('storage', storageHandler);
    
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  };

  return {
    getPreferences,
    savePreference,
    resetPreferences,
    subscribe
  };
})();

export default userPreferencesManager;class UserPreferencesManager {
  constructor() {
    this.prefs = this.loadPreferences();
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
      localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  setPreference(key, value) {
    this.prefs[key] = value;
    return this.savePreferences();
  }

  getPreference(key, defaultValue = null) {
    return this.prefs.hasOwnProperty(key) ? this.prefs[key] : defaultValue;
  }

  removePreference(key) {
    delete this.prefs[key];
    return this.savePreferences();
  }

  clearAllPreferences() {
    this.prefs = {};
    return this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.prefs };
  }
}

const userPrefs = new UserPreferencesManager();const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'user_preferences_v1';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
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
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return currentPreferences;
    };

    const savePreferences = (updates) => {
        currentPreferences = { ...currentPreferences, ...updates };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetToDefaults = () => {
        currentPreferences = { ...defaultPreferences };
        localStorage.removeItem(STORAGE_KEY);
        return currentPreferences;
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
                loadPreferences();
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
    module.exports = UserPreferencesManager;
}