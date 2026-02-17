const UserPreferences = {
  storageKey: 'app_user_preferences',

  defaults: {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true
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
      const validated = this.validate(preferences);
      localStorage.setItem(this.storageKey, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  validate(preferences) {
    const result = { ...this.defaults };
    
    if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
      result.theme = preferences.theme;
    }
    
    if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
      result.fontSize = preferences.fontSize;
    }
    
    if (typeof preferences.notifications === 'boolean') {
      result.notifications = preferences.notifications;
    }
    
    if (preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)) {
      result.language = preferences.language;
    }
    
    if (typeof preferences.autoSave === 'boolean') {
      result.autoSave = preferences.autoSave;
    }
    
    return result;
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

export default UserPreferences;