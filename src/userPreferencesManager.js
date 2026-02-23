class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
    this.listeners = new Set();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences');
      return stored ? JSON.parse(stored) : this.getDefaultPreferences();
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return this.getDefaultPreferences();
    }
  }

  getDefaultPreferences() {
    return {
      theme: 'light',
      notifications: true,
      language: 'en',
      fontSize: 16,
      autoSave: true,
      showTutorial: false
    };
  }

  updatePreference(key, value) {
    if (!this.preferences.hasOwnProperty(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    const oldValue = this.preferences[key];
    this.preferences[key] = value;
    
    this.savePreferences();
    this.notifyListeners(key, value, oldValue);
    
    return true;
  }

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
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
    this.notifyListeners('reset', this.preferences, null);
  }

  addListener(callback) {
    this.listeners.add(callback);
  }

  removeListener(callback) {
    this.listeners.delete(callback);
  }

  notifyListeners(key, newValue, oldValue) {
    this.listeners.forEach(callback => {
      try {
        callback(key, newValue, oldValue);
      } catch (error) {
        console.error('Listener error:', error);
      }
    });
  }

  exportPreferences() {
    const dataStr = JSON.stringify(this.preferences, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    return URL.createObjectURL(dataBlob);
  }

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      const validated = this.validatePreferences(imported);
      
      this.preferences = { ...this.preferences, ...validated };
      this.savePreferences();
      this.notifyListeners('import', this.preferences, null);
      
      return true;
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  }

  validatePreferences(prefs) {
    const defaultPrefs = this.getDefaultPreferences();
    const validated = {};
    
    for (const key in defaultPrefs) {
      if (prefs.hasOwnProperty(key) && typeof prefs[key] === typeof defaultPrefs[key]) {
        validated[key] = prefs[key];
      }
    }
    
    return validated;
  }
}

export default UserPreferencesManager;const UserPreferencesManager = {
  storageKey: 'app_user_preferences',

  defaults: {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true,
    sidebarCollapsed: false
  },

  init() {
    if (!this.load()) {
      this.save(this.defaults);
    }
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

  export() {
    return JSON.stringify(this.getAll(), null, 2);
  },

  import(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      return this.save(imported);
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  }
};

UserPreferencesManager.init();const UserPreferencesManager = (function() {
    const PREFERENCE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(PREFERENCE_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        try {
            localStorage.setItem(PREFERENCE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const handler = function(event) {
            if (event.key === PREFERENCE_KEY) {
                callback(getPreferences());
            }
        };

        window.addEventListener('storage', handler);
        
        return function unsubscribe() {
            window.removeEventListener('storage', handler);
        };
    }

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference,
        subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}