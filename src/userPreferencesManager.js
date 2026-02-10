const UserPreferences = {
  storageKey: 'app_preferences',

  getPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : {};
  },

  setPreference(key, value) {
    const preferences = this.getPreferences();
    preferences[key] = value;
    localStorage.setItem(this.storageKey, JSON.stringify(preferences));
    return true;
  },

  removePreference(key) {
    const preferences = this.getPreferences();
    if (preferences.hasOwnProperty(key)) {
      delete preferences[key];
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    }
    return false;
  },

  clearAll() {
    localStorage.removeItem(this.storageKey);
    return true;
  },

  getAll() {
    return this.getPreferences();
  }
};

export default UserPreferences;const userPreferencesManager = (() => {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        notifications: true,
        fontSize: 16,
        language: 'en',
        autoSave: false
    };

    let preferences = { ...DEFAULT_PREFERENCES };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                preferences = { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return preferences;
    };

    const savePreferences = (newPreferences) => {
        try {
            preferences = { ...preferences, ...newPreferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetPreferences = () => {
        preferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        return preferences;
    };

    const getPreference = (key) => {
        return preferences[key] !== undefined ? preferences[key] : null;
    };

    const getAllPreferences = () => {
        return { ...preferences };
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY) {
                loadPreferences();
                callback(getAllPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    loadPreferences();

    return {
        save: savePreferences,
        load: loadPreferences,
        reset: resetPreferences,
        get: getPreference,
        getAll: getAllPreferences,
        subscribe,
        DEFAULT_PREFERENCES
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}const UserPreferences = {
    storageKey: 'app_user_preferences',

    defaults: {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false,
        sidebarCollapsed: false
    },

    init() {
        if (!this.load()) {
            this.save(this.defaults);
        }
        return this.load();
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

Object.freeze(UserPreferences);
UserPreferences.init();const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true,
        sidebarCollapsed: false
    };

    let currentPreferences = { ...defaultPreferences };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                currentPreferences = { ...defaultPreferences, ...parsed };
            }
            return currentPreferences;
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return defaultPreferences;
        }
    };

    const savePreferences = (updates) => {
        try {
            currentPreferences = { ...currentPreferences, ...updates };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
            return currentPreferences;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    };

    const resetToDefaults = () => {
        currentPreferences = { ...defaultPreferences };
        localStorage.removeItem(STORAGE_KEY);
        return currentPreferences;
    };

    const getPreference = (key) => {
        return currentPreferences[key] !== undefined 
            ? currentPreferences[key] 
            : defaultPreferences[key];
    };

    const getAllPreferences = () => {
        return { ...currentPreferences };
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY) {
                loadPreferences();
                callback(getAllPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    loadPreferences();

    return {
        get: getPreference,
        getAll: getAllPreferences,
        set: savePreferences,
        reset: resetToDefaults,
        subscribe,
        defaults: { ...defaultPreferences }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    this.setupListeners();
  },

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse stored preferences:', e);
        this.preferences = this.getDefaultPreferences();
      }
    } else {
      this.preferences = this.getDefaultPreferences();
    }
  },

  getDefaultPreferences() {
    return {
      theme: 'light',
      fontSize: 'medium',
      notifications: true,
      language: 'en',
      autoSave: true,
      sidebarCollapsed: false
    };
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      this.dispatchEvent('preferencesUpdated', this.preferences);
      return true;
    } catch (e) {
      console.error('Failed to save preferences:', e);
      return false;
    }
  },

  getPreference(key) {
    return this.preferences[key] !== undefined ? this.preferences[key] : null;
  },

  setPreference(key, value) {
    if (key in this.preferences) {
      this.preferences[key] = value;
      return this.savePreferences();
    }
    return false;
  },

  setMultiplePreferences(updates) {
    let changed = false;
    for (const [key, value] of Object.entries(updates)) {
      if (key in this.preferences && this.preferences[key] !== value) {
        this.preferences[key] = value;
        changed = true;
      }
    }
    if (changed) {
      return this.savePreferences();
    }
    return true;
  },

  resetToDefaults() {
    this.preferences = this.getDefaultPreferences();
    return this.savePreferences();
  },

  getAllPreferences() {
    return { ...this.preferences };
  },

  setupListeners() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'userPreferences') {
        this.loadPreferences();
        this.dispatchEvent('preferencesChangedExternally', this.preferences);
      }
    });
  },

  dispatchEvent(eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }
};

UserPreferences.init();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false,
    lastUpdated: null
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      language: (val) => /^[a-z]{2}$/.test(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean',
      lastUpdated: (val) => val === null || val instanceof Date
    };

    return validators[key] ? validators[key](value) : false;
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultPreferences };
      
      const parsed = JSON.parse(stored);
      const merged = { ...defaultPreferences, ...parsed };
      
      Object.keys(merged).forEach(key => {
        if (!validatePreference(key, merged[key])) {
          merged[key] = defaultPreferences[key];
        }
      });
      
      return merged;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const newPreferences = { ...current };
      
      Object.keys(updates).forEach(key => {
        if (key in defaultPreferences && validatePreference(key, updates[key])) {
          newPreferences[key] = updates[key];
        }
      });
      
      newPreferences.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
      
      return { success: true, preferences: newPreferences };
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return { success: false, error: error.message };
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { success: true, preferences: { ...defaultPreferences } };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return { success: false, error: error.message };
    }
  };

  const subscribe = (callback) => {
    const storageHandler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    
    window.addEventListener('storage', storageHandler);
    
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    subscribe,
    getDefaultPreferences: () => ({ ...defaultPreferences })
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  let currentPreferences = { ...DEFAULT_PREFERENCES };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        currentPreferences = { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return currentPreferences;
  };

  const savePreferences = (updates) => {
    try {
      currentPreferences = { ...currentPreferences, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetPreferences = () => {
    currentPreferences = { ...DEFAULT_PREFERENCES };
    localStorage.removeItem(STORAGE_KEY);
    return currentPreferences;
  };

  const getPreference = (key) => {
    return currentPreferences[key] !== undefined 
      ? currentPreferences[key] 
      : DEFAULT_PREFERENCES[key];
  };

  const getAllPreferences = () => {
    return { ...currentPreferences };
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        loadPreferences();
        callback(getAllPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  loadPreferences();

  return {
    get: getPreference,
    getAll: getAllPreferences,
    set: savePreferences,
    reset: resetPreferences,
    subscribe,
    DEFAULT_PREFERENCES
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
    } catch (error) {
      console.error('Error loading preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(PREFERENCES_KEY);
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Error resetting preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const subscribe = (callback) => {
    const handleStorageChange = (event) => {
      if (event.key === PREFERENCES_KEY) {
        callback(getPreferences());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    getPreference,
    setPreference,
    subscribe
  };
})();

export default userPreferencesManager;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        fontSize: 'medium',
        notifications: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {...DEFAULT_PREFERENCES};
    }

    function savePreferences(preferences) {
        const current = getPreferences();
        const updated = {...current, ...preferences};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        dispatchChangeEvent(updated);
        return updated;
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        dispatchChangeEvent({...DEFAULT_PREFERENCES});
        return {...DEFAULT_PREFERENCES};
    }

    function dispatchChangeEvent(preferences) {
        const event = new CustomEvent('preferencesChanged', {
            detail: { preferences }
        });
        window.dispatchEvent(event);
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] || DEFAULT_PREFERENCES[key];
    }

    return {
        get: getPreferences,
        set: savePreferences,
        reset: resetPreferences,
        getValue: getPreference,
        subscribe: function(callback) {
            window.addEventListener('preferencesChanged', (e) => callback(e.detail.preferences));
            return () => window.removeEventListener('preferencesChanged', callback);
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

class PreferencesManager {
  constructor() {
    this.storageKey = 'user_preferences';
    this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        Object.assign(userPreferences, JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load preferences:', error);
      }
    }
  }

  savePreferences() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(userPreferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  updatePreference(key, value) {
    if (userPreferences.hasOwnProperty(key)) {
      userPreferences[key] = value;
      return this.savePreferences();
    }
    return false;
  }

  getPreference(key) {
    return userPreferences[key];
  }

  resetToDefaults() {
    const defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    Object.assign(userPreferences, defaults);
    return this.savePreferences();
  }

  getAllPreferences() {
    return { ...userPreferences };
  }
}

export default PreferencesManager;