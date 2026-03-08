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

export default UserPreferencesManager;