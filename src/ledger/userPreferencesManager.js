class UserPreferencesManager {
    constructor() {
        this.prefs = this.loadPreferences();
    }

    setPreference(key, value) {
        this.prefs[key] = value;
        this.savePreferences();
        return this;
    }

    getPreference(key, defaultValue = null) {
        return this.prefs[key] !== undefined ? this.prefs[key] : defaultValue;
    }

    removePreference(key) {
        delete this.prefs[key];
        this.savePreferences();
        return this;
    }

    clearAllPreferences() {
        this.prefs = {};
        this.savePreferences();
        return this;
    }

    getAllPreferences() {
        return { ...this.prefs };
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem('userPreferences');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.warn('Failed to load preferences:', error);
            return {};
        }
    }

    savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
        } catch (error) {
            console.warn('Failed to save preferences:', error);
        }
    }
}

const preferences = new UserPreferencesManager();const UserPreferences = {
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
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
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

UserPreferences.init();