const UserPreferences = {
  storageKey: 'app_preferences',

  getPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : {};
  },

  setPreference(key, value) {
    const preferences = this.getPreferences();
    preferences[key] = value;
    localStorage.setItem(this.storageKey, JSON.stringify(preferences));
    return true;
  },

  removePreference(key) {
    const preferences = this.getPreferences();
    if (preferences.hasOwnProperty(key)) {
      delete preferences[key];
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    }
    return false;
  },

  clearAll() {
    localStorage.removeItem(this.storageKey);
    return true;
  },

  getAll() {
    return this.getPreferences();
  }
};

export default UserPreferences;const userPreferencesManager = (() => {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        notifications: true,
        fontSize: 16,
        language: 'en',
        autoSave: false
    };

    let preferences = { ...DEFAULT_PREFERENCES };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                preferences = { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return preferences;
    };

    const savePreferences = (newPreferences) => {
        try {
            preferences = { ...preferences, ...newPreferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetPreferences = () => {
        preferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        return preferences;
    };

    const getPreference = (key) => {
        return preferences[key] !== undefined ? preferences[key] : null;
    };

    const getAllPreferences = () => {
        return { ...preferences };
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
        save: savePreferences,
        load: loadPreferences,
        reset: resetPreferences,
        get: getPreference,
        getAll: getAllPreferences,
        subscribe,
        DEFAULT_PREFERENCES
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}const UserPreferences = {
    storageKey: 'app_user_preferences',

    defaults: {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false,
        sidebarCollapsed: false
    },

    init() {
        if (!this.load()) {
            this.save(this.defaults);
        }
        return this.load();
    },

    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return null;
        }
    },

    save(preferences) {
        try {
            const merged = { ...this.defaults, ...preferences };
            localStorage.setItem(this.storageKey, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    },

    get(key) {
        const prefs = this.load();
        return prefs ? prefs[key] : this.defaults[key];
    },

    set(key, value) {
        const prefs = this.load() || this.defaults;
        prefs[key] = value;
        return this.save(prefs);
    },

    reset() {
        return this.save(this.defaults);
    },

    getAll() {
        return this.load() || this.defaults;
    },

    subscribe(callback) {
        const handler = (event) => {
            if (event.key === this.storageKey) {
                callback(this.load());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    }
};

Object.freeze(UserPreferences);
UserPreferences.init();const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    
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
}const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    this.setupListeners();
  },

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse stored preferences:', e);
        this.preferences = this.getDefaultPreferences();
      }
    } else {
      this.preferences = this.getDefaultPreferences();
    }
  },

  getDefaultPreferences() {
    return {
      theme: 'light',
      fontSize: 'medium',
      notifications: true,
      language: 'en',
      autoSave: true,
      sidebarCollapsed: false
    };
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      this.dispatchEvent('preferencesUpdated', this.preferences);
      return true;
    } catch (e) {
      console.error('Failed to save preferences:', e);
      return false;
    }
  },

  getPreference(key) {
    return this.preferences[key] !== undefined ? this.preferences[key] : null;
  },

  setPreference(key, value) {
    if (key in this.preferences) {
      this.preferences[key] = value;
      return this.savePreferences();
    }
    return false;
  },

  setMultiplePreferences(updates) {
    let changed = false;
    for (const [key, value] of Object.entries(updates)) {
      if (key in this.preferences && this.preferences[key] !== value) {
        this.preferences[key] = value;
        changed = true;
      }
    }
    if (changed) {
      return this.savePreferences();
    }
    return true;
  },

  resetToDefaults() {
    this.preferences = this.getDefaultPreferences();
    return this.savePreferences();
  },

  getAllPreferences() {
    return { ...this.preferences };
  },

  setupListeners() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'userPreferences') {
        this.loadPreferences();
        this.dispatchEvent('preferencesChangedExternally', this.preferences);
      }
    });
  },

  dispatchEvent(eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }
};

UserPreferences.init();