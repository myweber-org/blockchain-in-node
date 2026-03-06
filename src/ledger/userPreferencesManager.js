const UserPreferencesManager = {
    storageKey: 'app_user_preferences',

    defaults: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    },

    getPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? { ...this.defaults, ...JSON.parse(stored) } : { ...this.defaults };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
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
            localStorage.removeItem(this.storageKey);
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

    getAllPreferences() {
        return this.getPreferences();
    },

    hasSavedPreferences() {
        return localStorage.getItem(this.storageKey) !== null;
    }
};

export default UserPreferencesManager;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        showTutorial: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...DEFAULT_PREFERENCES };
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

    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === STORAGE_KEY) {
                callback(getPreferences());
            }
        };
        return function unsubscribe() {
            localStorage.setItem = originalSetItem;
        };
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe,
        defaults: DEFAULT_PREFERENCES
    };
})();const userPreferencesManager = {
    preferences: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 'medium'
    },

    init: function() {
        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
            this.preferences = JSON.parse(savedPreferences);
        }
        return this.preferences;
    },

    updatePreference: function(key, value) {
        if (this.preferences.hasOwnProperty(key)) {
            this.preferences[key] = value;
            this.savePreferences();
            return true;
        }
        return false;
    },

    getPreference: function(key) {
        return this.preferences[key] || null;
    },

    getAllPreferences: function() {
        return {...this.preferences};
    },

    resetPreferences: function() {
        this.preferences = {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 'medium'
        };
        this.savePreferences();
    },

    savePreferences: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    },

    exportPreferences: function() {
        return JSON.stringify(this.preferences, null, 2);
    },

    importPreferences: function(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.preferences = {...this.preferences, ...imported};
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Invalid preferences format:', error);
            return false;
        }
    }
};

export default userPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true,
    sidebarCollapsed: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (preferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    const current = loadPreferences();
    if (current.hasOwnProperty(key)) {
      const updated = { ...current, [key]: value };
      savePreferences(updated);
      return updated;
    }
    return current;
  };

  const resetToDefaults = () => {
    savePreferences(defaultPreferences);
    return { ...defaultPreferences };
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key];
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(loadPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    get: getPreference,
    set: updatePreference,
    getAll: loadPreferences,
    reset: resetToDefaults,
    subscribe
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
  },

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored preferences:', e);
        this.preferences = {};
      }
    }
  },

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    this.savePreferences();
  },

  getPreference(key, defaultValue = null) {
    return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    delete this.preferences[key];
    this.savePreferences();
  },

  clearAllPreferences() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
  },

  getAllPreferences() {
    return { ...this.preferences };
  }
};

UserPreferences.init();const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    return this;
  },

  loadPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences');
      this.preferences = stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      this.preferences = {};
    }
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    return this.savePreferences();
  },

  getPreference(key, defaultValue = null) {
    return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    delete this.preferences[key];
    return this.savePreferences();
  },

  clearAllPreferences() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
  },

  getAllPreferences() {
    return { ...this.preferences };
  }
};

export default UserPreferences.init();const USER_PREFERENCES_KEY = 'app_preferences';

class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(USER_PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : this.getDefaultPreferences();
    } catch (error) {
      console.warn('Failed to load preferences:', error);
      return this.getDefaultPreferences();
    }
  }

  getDefaultPreferences() {
    return {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16,
      autoSave: true
    };
  }

  updatePreference(key, value) {
    if (key in this.preferences) {
      this.preferences[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  savePreferences() {
    try {
      localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  getPreference(key) {
    return this.preferences[key];
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  resetToDefaults() {
    this.preferences = this.getDefaultPreferences();
    this.savePreferences();
  }
}

export default UserPreferencesManager;