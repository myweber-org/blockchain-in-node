const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const UserPreferencesManager = {
  storageKey: 'app_user_preferences',

  load: function() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored preferences:', e);
        return this.getDefaults();
      }
    }
    return this.getDefaults();
  },

  save: function(preferences) {
    try {
      const merged = { ...this.getDefaults(), ...preferences };
      localStorage.setItem(this.storageKey, JSON.stringify(merged));
      return true;
    } catch (e) {
      console.error('Failed to save preferences:', e);
      return false;
    }
  },

  getDefaults: function() {
    return { ...userPreferences };
  },

  update: function(key, value) {
    const current = this.load();
    current[key] = value;
    return this.save(current);
  },

  reset: function() {
    localStorage.removeItem(this.storageKey);
    return this.getDefaults();
  },

  getAll: function() {
    return this.load();
  }
};

export default UserPreferencesManager;class UserPreferencesManager {
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
        return this;
    }

    setPreference(key, value) {
        if (this.preferences.hasOwnProperty(key)) {
            this.preferences[key] = value;
            this.savePreferences();
        }
        return this;
    }

    getPreference(key) {
        return this.preferences[key];
    }

    resetPreferences() {
        this.preferences = {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16
        };
        this.savePreferences();
        return this;
    }

    exportPreferences() {
        return JSON.stringify(this.preferences);
    }

    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.preferences = { ...this.preferences, ...imported };
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Invalid preferences format');
            return false;
        }
    }
}

const userPrefs = new UserPreferencesManager();const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';

  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(defaultPreferences));
      return true;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return false;
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
    const storageHandler = (event) => {
      if (event.key === PREFERENCES_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', storageHandler);
    return () => window.removeEventListener('storage', storageHandler);
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    getPreference,
    setPreference,
    subscribe
  };
})();

export default userPreferencesManager;