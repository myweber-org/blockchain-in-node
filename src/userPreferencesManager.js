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

export default UserPreferences;