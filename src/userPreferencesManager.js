const UserPreferences = {
  storageKey: 'app_user_preferences',

  defaults: {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false
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
      this.dispatchChangeEvent(validPrefs);
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  update(updates) {
    const current = this.load();
    const merged = { ...current, ...updates };
    return this.save(merged);
  },

  reset() {
    localStorage.removeItem(this.storageKey);
    this.dispatchChangeEvent(this.defaults);
    return { ...this.defaults };
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
    
    if (typeof preferences.autoSave === 'boolean') {
      validated.autoSave = preferences.autoSave;
    }
    
    return validated;
  },

  dispatchChangeEvent(preferences) {
    window.dispatchEvent(new CustomEvent('preferencesChanged', {
      detail: preferences
    }));
  },

  subscribe(callback) {
    const handler = (event) => callback(event.detail);
    window.addEventListener('preferencesChanged', handler);
    return () => window.removeEventListener('preferencesChanged', handler);
  }
};

export default UserPreferences;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    lastUpdated: null
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = {
        ...current,
        ...updates,
        lastUpdated: new Date().toISOString()
      };
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

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          callback(JSON.parse(event.newValue));
        } catch (error) {
          console.error('Failed to parse updated preferences:', error);
        }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    get: getPreferences,
    save: savePreferences,
    reset: resetPreferences,
    subscribe,
    getDefault: () => ({ ...defaultPreferences })
  };
})();

export default UserPreferencesManager;const userPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
        return true;
    }
    
    function getPreference(key, defaultValue = null) {
        const preferences = getPreferences();
        return preferences.hasOwnProperty(key) ? preferences[key] : defaultValue;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        if (preferences.hasOwnProperty(key)) {
            delete preferences[key];
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
            return true;
        }
        return false;
    }
    
    function clearPreferences() {
        localStorage.removeItem(PREFERENCES_KEY);
        return true;
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        get: getPreference,
        set: setPreference,
        remove: removePreference,
        clear: clearPreferences,
        getAll: getAllPreferences
    };
})();