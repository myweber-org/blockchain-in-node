const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function savePreferences(preferences) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        savePreferences(preferences);
        return preferences;
    }
    
    function getPreference(key, defaultValue = null) {
        const preferences = getPreferences();
        return preferences.hasOwnProperty(key) ? preferences[key] : defaultValue;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        if (preferences.hasOwnProperty(key)) {
            delete preferences[key];
            savePreferences(preferences);
        }
        return preferences;
    }
    
    function clearAllPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return {};
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        set: setPreference,
        get: getPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        getAll: getAllPreferences
    };
})();

// Example usage
// UserPreferencesManager.set('theme', 'dark');
// UserPreferencesManager.set('language', 'en');
// console.log(UserPreferencesManager.get('theme')); // 'dark'
// console.log(UserPreferencesManager.getAll()); // {theme: 'dark', language: 'en'}class UserPreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
    }

    loadPreferences() {
        const stored = localStorage.getItem('userPreferences');
        return stored ? JSON.parse(stored) : {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16
        };
    }

    savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    }

    setPreference(key, value) {
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
        this.preferences = {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16
        };
        this.savePreferences();
    }
}

const userPrefs = new UserPreferencesManager();const UserPreferencesManager = {
    storageKey: 'app_user_preferences',

    defaults: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    },

    initialize() {
        if (!this.getPreferences()) {
            this.savePreferences(this.defaults);
        }
    },

    getPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return null;
        }
    },

    savePreferences(preferences) {
        try {
            const current = this.getPreferences() || this.defaults;
            const merged = { ...current, ...preferences };
            localStorage.setItem(this.storageKey, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    },

    updatePreference(key, value) {
        const current = this.getPreferences();
        if (current && key in this.defaults) {
            return this.savePreferences({ [key]: value });
        }
        return false;
    },

    resetToDefaults() {
        return this.savePreferences(this.defaults);
    },

    clearPreferences() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    }
};

UserPreferencesManager.initialize();const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
  },

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse preferences:', e);
        this.preferences = {};
      }
    }
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      return true;
    } catch (e) {
      console.error('Failed to save preferences:', e);
      return false;
    }
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    return this.savePreferences();
  },

  getPreference(key, defaultValue = null) {
    return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    if (this.preferences.hasOwnProperty(key)) {
      delete this.preferences[key];
      return this.savePreferences();
    }
    return false;
  },

  clearAllPreferences() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
  }
};

UserPreferences.init();const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to parse stored preferences:', error);
    }
    return { ...DEFAULT_PREFERENCES };
  };

  const updatePreferences = (updates) => {
    if (!updates || typeof updates !== 'object') {
      throw new Error('Updates must be a valid object');
    }

    const current = getPreferences();
    const merged = { ...current, ...updates };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      throw new Error('Storage quota exceeded or storage disabled');
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...DEFAULT_PREFERENCES };
  };

  const subscribe = (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };

    window.addEventListener('storage', handler);
    
    return () => {
      window.removeEventListener('storage', handler);
    };
  };

  return {
    getPreferences,
    updatePreferences,
    resetToDefaults,
    subscribe
  };
})();

export default userPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true,
    sidebarCollapsed: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
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
      localStorage.removeItem(STORAGE_KEY);
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
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
      if (event.key === STORAGE_KEY) {
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
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}