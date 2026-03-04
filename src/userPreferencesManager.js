const UserPreferencesManager = {
  storageKey: 'app_user_preferences',

  defaults: {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true
  },

  getPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return { ...this.defaults, ...JSON.parse(stored) };
      }
      return { ...this.defaults };
    } catch (error) {
      console.warn('Failed to load preferences:', error);
      return { ...this.defaults };
    }
  },

  savePreferences(preferences) {
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(this.storageKey, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  resetToDefaults() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.defaults));
      return true;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return false;
    }
  },

  getPreference(key) {
    const prefs = this.getPreferences();
    return prefs[key] !== undefined ? prefs[key] : this.defaults[key];
  },

  setPreference(key, value) {
    return this.savePreferences({ [key]: value });
  },

  clearAll() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  }
};

export default UserPreferencesManager;const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    return this;
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    this.savePreferences();
    return this;
  },

  getPreference(key, defaultValue = null) {
    return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    delete this.preferences[key];
    this.savePreferences();
    return this;
  },

  clearAllPreferences() {
    this.preferences = {};
    this.savePreferences();
    return this;
  },

  getAllPreferences() {
    return { ...this.preferences };
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  },

  loadPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences');
      this.preferences = stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      this.preferences = {};
    }
  }
};

const userPrefs = UserPreferences.init();const UserPreferences = {
    storageKey: 'app_preferences',

    defaults: {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en'
    },

    init() {
        if (!this.load()) {
            this.save(this.defaults);
        }
    },

    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
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
    }
};

UserPreferences.init();const UserPreferencesManager = {
  storageKey: 'user_preferences',

  defaults: {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  },

  initialize() {
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

  update(key, value) {
    const current = this.load() || this.defaults;
    return this.save({ ...current, [key]: value });
  },

  reset() {
    return this.save(this.defaults);
  },

  getAll() {
    return this.load() || this.defaults;
  },

  get(key) {
    const prefs = this.load();
    return prefs ? prefs[key] : this.defaults[key];
  }
};

UserPreferencesManager.initialize();const UserPreferencesManager = {
  storageKey: 'user_preferences',

  getPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return {};
    }
  },

  setPreference(key, value) {
    const preferences = this.getPreferences();
    preferences[key] = value;
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  },

  removePreference(key) {
    const preferences = this.getPreferences();
    delete preferences[key];
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to remove preference:', error);
      return false;
    }
  },

  clearAllPreferences() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  },

  hasPreference(key) {
    const preferences = this.getPreferences();
    return key in preferences;
  },

  getAllPreferences() {
    return { ...this.getPreferences() };
  }
};

export default UserPreferencesManager;