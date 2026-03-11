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

export default UserPreferencesManager;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to parse stored preferences:', error);
        }
        return { ...defaultPreferences };
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }

    function resetToDefaults() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        getPreferences,
        savePreferences,
        resetToDefaults,
        getPreference,
        setPreference,
        subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}