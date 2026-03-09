const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const UserPreferencesManager = {
  STORAGE_KEY: 'user_preferences',

  load: function() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        Object.assign(userPreferences, JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved preferences:', e);
      }
    }
    return { ...userPreferences };
  },

  save: function() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userPreferences));
      return true;
    } catch (e) {
      console.error('Failed to save preferences:', e);
      return false;
    }
  },

  update: function(key, value) {
    if (userPreferences.hasOwnProperty(key)) {
      userPreferences[key] = value;
      this.save();
      return true;
    }
    return false;
  },

  reset: function() {
    const defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    Object.assign(userPreferences, defaults);
    this.save();
    return { ...userPreferences };
  },

  getAll: function() {
    return { ...userPreferences };
  }
};

export default UserPreferencesManager;