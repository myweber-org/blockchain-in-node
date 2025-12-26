const UserPreferences = {
  storageKey: 'app_preferences',

  defaults: {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  },

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return { ...this.defaults, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return { ...this.defaults };
  },

  save(preferences) {
    try {
      const validPrefs = this.validate(preferences);
      localStorage.setItem(this.storageKey, JSON.stringify(validPrefs));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  validate(preferences) {
    const validated = { ...this.defaults };
    
    if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
      validated.theme = preferences.theme;
    }
    
    if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
      validated.fontSize = preferences.fontSize;
    }
    
    if (typeof preferences.notifications === 'boolean') {
      validated.notifications = preferences.notifications;
    }
    
    if (preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)) {
      validated.language = preferences.language;
    }
    
    return validated;
  },

  reset() {
    localStorage.removeItem(this.storageKey);
    return { ...this.defaults };
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

export default UserPreferences;const UserPreferencesManager = (() => {
    const PREFIX = 'app_pref_';
    const DEFAULTS = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    const validateKey = (key) => {
        if (!key || typeof key !== 'string') {
            throw new Error('Invalid preference key');
        }
        return true;
    };

    const getFullKey = (key) => `${PREFIX}${key}`;

    const getAll = () => {
        const preferences = { ...DEFAULTS };
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(PREFIX)) {
                const prefKey = key.replace(PREFIX, '');
                try {
                    preferences[prefKey] = JSON.parse(localStorage.getItem(key));
                } catch {
                    preferences[prefKey] = localStorage.getItem(key);
                }
            }
        });
        return preferences;
    };

    const get = (key) => {
        validateKey(key);
        const stored = localStorage.getItem(getFullKey(key));
        if (stored === null) {
            return DEFAULTS[key] !== undefined ? DEFAULTS[key] : null;
        }
        try {
            return JSON.parse(stored);
        } catch {
            return stored;
        }
    };

    const set = (key, value) => {
        validateKey(key);
        const storageValue = typeof value === 'object' ? JSON.stringify(value) : value;
        localStorage.setItem(getFullKey(key), storageValue);
        return true;
    };

    const remove = (key) => {
        validateKey(key);
        localStorage.removeItem(getFullKey(key));
        return true;
    };

    const reset = () => {
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(PREFIX)) {
                localStorage.removeItem(key);
            }
        });
        return true;
    };

    const exportPrefs = () => {
        return JSON.stringify(getAll());
    };

    const importPrefs = (jsonString) => {
        try {
            const prefs = JSON.parse(jsonString);
            Object.keys(prefs).forEach((key) => {
                set(key, prefs[key]);
            });
            return true;
        } catch {
            return false;
        }
    };

    return {
        getAll,
        get,
        set,
        remove,
        reset,
        exportPrefs,
        importPrefs,
        defaults: DEFAULTS
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}class UserPreferencesManager {
  constructor() {
    this.prefs = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse stored preferences:', e);
      }
    }
    return this.getDefaultPreferences();
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

  getPreference(key) {
    return this.prefs[key] !== undefined ? this.prefs[key] : null;
  }

  setPreference(key, value) {
    if (key in this.prefs) {
      this.prefs[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  setMultiplePreferences(preferences) {
    let updated = false;
    for (const [key, value] of Object.entries(preferences)) {
      if (key in this.prefs) {
        this.prefs[key] = value;
        updated = true;
      }
    }
    if (updated) {
      this.savePreferences();
    }
    return updated;
  }

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
      return true;
    } catch (e) {
      console.error('Failed to save preferences:', e);
      return false;
    }
  }

  resetToDefaults() {
    this.prefs = this.getDefaultPreferences();
    this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.prefs };
  }

  exportPreferences() {
    return JSON.stringify(this.prefs, null, 2);
  }

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      const validKeys = Object.keys(this.getDefaultPreferences());
      
      for (const key of validKeys) {
        if (key in imported) {
          this.prefs[key] = imported[key];
        }
      }
      
      this.savePreferences();
      return true;
    } catch (e) {
      console.error('Failed to import preferences:', e);
      return false;
    }
  }
}

export default UserPreferencesManager;