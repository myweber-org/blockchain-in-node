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
      return stored ? JSON.parse(stored) : { ...this.defaults };
    } catch (error) {
      console.warn('Failed to load preferences:', error);
      return { ...this.defaults };
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
    const current = this.load();
    current[key] = value;
    return this.save(current);
  },

  reset() {
    return this.save(this.defaults);
  },

  getAll() {
    return this.load();
  },

  get(key) {
    const prefs = this.load();
    return prefs[key] !== undefined ? prefs[key] : this.defaults[key];
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