const userPreferencesManager = (function() {
    const STORAGE_KEY = 'app_preferences';
    
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
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Error reading preferences:', error);
            return { ...defaultPreferences };
        }
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Error resetting preferences:', error);
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
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe
    };
})();const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true,
        sidebarCollapsed: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Failed to parse stored preferences:', error);
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

    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
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
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe
    };
})();const userPreferencesManager = (() => {
  const STORAGE_KEY = 'user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 'medium'
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
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
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    getPreference,
    setPreference
  };
})();const UserPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(DEFAULT_PREFERENCES));
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function hasCustomPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        return stored !== null;
    }

    function exportPreferences() {
        const preferences = getPreferences();
        const dataStr = JSON.stringify(preferences, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        return dataUri;
    }

    function importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            const validKeys = Object.keys(DEFAULT_PREFERENCES);
            const filtered = {};
            
            validKeys.forEach(key => {
                if (imported[key] !== undefined) {
                    filtered[key] = imported[key];
                }
            });
            
            return savePreferences(filtered);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return null;
        }
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        hasCustom: hasCustomPreferences,
        export: exportPreferences,
        import: importPreferences,
        defaults: DEFAULT_PREFERENCES
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferences = {
    storageKey: 'app_preferences',

    defaults: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    },

    init() {
        if (!this.load()) {
            this.save(this.defaults);
        }
        return this.load();
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
            const current = this.load() || {};
            const merged = { ...this.defaults, ...current, ...preferences };
            localStorage.setItem(this.storageKey, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    },

    update(key, value) {
        const current = this.load() || {};
        return this.save({ ...current, [key]: value });
    },

    reset() {
        return this.save(this.defaults);
    },

    getAll() {
        return this.load() || this.defaults;
    },

    get(key) {
        const prefs = this.load();
        return prefs ? prefs[key] : this.defaults[key];
    }
};

export default UserPreferences;const UserPreferencesManager = {
  storageKey: 'app_user_preferences',

  defaults: {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false,
    sidebarCollapsed: false
  },

  initialize() {
    const stored = this.load();
    if (!stored) {
      this.save(this.defaults);
    }
    return this.load();
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
      const current = this.load() || {};
      const merged = { ...this.defaults, ...current, ...preferences };
      localStorage.setItem(this.storageKey, JSON.stringify(merged));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  update(key, value) {
    const current = this.load() || {};
    current[key] = value;
    return this.save(current);
  },

  reset() {
    return this.save(this.defaults);
  },

  getAll() {
    return this.load() || this.defaults;
  },

  get(key) {
    const prefs = this.load();
    return prefs ? prefs[key] : this.defaults[key];
  },

  clear() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  }
};

export default UserPreferencesManager;class UserPreferencesManager {
  constructor(defaults = {}) {
    this.defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16,
      ...defaults
    };
    this.storageKey = 'user_preferences';
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? { ...this.defaults, ...JSON.parse(stored) } : { ...this.defaults };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...this.defaults };
    }
  }

  savePreferences() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  get(key) {
    return this.preferences[key] !== undefined ? this.preferences[key] : this.defaults[key];
  }

  set(key, value) {
    if (key in this.defaults) {
      this.preferences[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  reset() {
    this.preferences = { ...this.defaults };
    this.savePreferences();
  }

  getAll() {
    return { ...this.preferences };
  }

  updateMultiple(updates) {
    let changed = false;
    for (const [key, value] of Object.entries(updates)) {
      if (key in this.defaults && this.preferences[key] !== value) {
        this.preferences[key] = value;
        changed = true;
      }
    }
    if (changed) {
      this.savePreferences();
    }
    return changed;
  }
}

export default UserPreferencesManager;const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        sidebarCollapsed: false
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

    const resetToDefaults = () => {
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
        reset: resetToDefaults,
        subscribe,
        DEFAULT_PREFERENCES
    };
})();

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
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {...defaultPreferences};
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
        dispatchChangeEvent(defaultPreferences);
        return {...defaultPreferences};
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function dispatchChangeEvent(preferences) {
        if (typeof window !== 'undefined' && window.dispatchEvent) {
            window.dispatchEvent(new CustomEvent('preferencesChanged', {
                detail: { preferences }
            }));
        }
    }

    function subscribe(callback) {
        if (typeof window !== 'undefined') {
            window.addEventListener('preferencesChanged', (event) => {
                callback(event.detail.preferences);
            });
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('preferencesChanged', callback);
            }
        };
    }

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        getPreference,
        subscribe,
        defaultPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
    const PREFERENCE_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    const getPreferences = () => {
        const stored = localStorage.getItem(PREFERENCE_KEY);
        if (stored) {
            try {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse preferences:', error);
                return defaultPreferences;
            }
        }
        return defaultPreferences;
    };

    const savePreferences = (preferences) => {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCE_KEY, JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetPreferences = () => {
        localStorage.removeItem(PREFERENCE_KEY);
        return defaultPreferences;
    };

    const exportPreferences = () => {
        const prefs = getPreferences();
        return JSON.stringify(prefs, null, 2);
    };

    const importPreferences = (jsonString) => {
        try {
            const imported = JSON.parse(jsonString);
            return savePreferences(imported);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    };

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        export: exportPreferences,
        import: importPreferences
    };
})();const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return defaultPreferences;
        }
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
        const updated = { ...current, [key]: value };
        return savePreferences(updated);
    };

    const resetPreferences = () => {
        return savePreferences(defaultPreferences);
    };

    const getPreference = (key) => {
        const prefs = loadPreferences();
        return prefs[key];
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY) {
                callback(getAllPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    return {
        get: getPreference,
        getAll: getAllPreferences,
        set: updatePreference,
        reset: resetPreferences,
        subscribe
    };
})();class UserPreferencesManager {
    constructor() {
        this.prefs = this.loadPreferences();
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem('userPreferences');
            return stored ? JSON.parse(stored) : this.getDefaultPreferences();
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return this.getDefaultPreferences();
        }
    }

    getDefaultPreferences() {
        return {
            theme: 'light',
            notifications: true,
            language: 'en',
            fontSize: 14,
            autoSave: true,
            showTutorial: false
        };
    }

    updatePreference(key, value) {
        if (this.prefs.hasOwnProperty(key)) {
            this.prefs[key] = value;
            this.savePreferences();
            return true;
        }
        return false;
    }

    savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    getPreference(key) {
        return this.prefs[key];
    }

    getAllPreferences() {
        return { ...this.prefs };
    }

    resetToDefaults() {
        this.prefs = this.getDefaultPreferences();
        this.savePreferences();
    }

    exportPreferences() {
        return JSON.stringify(this.prefs, null, 2);
    }

    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.prefs = { ...this.getDefaultPreferences(), ...imported };
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }
}

const userPrefs = new UserPreferencesManager();const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false,
        lastUpdated: null
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...defaultPreferences, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    }

    function savePreferences(preferences) {
        try {
            const updatedPrefs = {
                ...getPreferences(),
                ...preferences,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrefs));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function resetToDefaults() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return false;
        }
    }

    function watchChanges(callback) {
        if (typeof callback !== 'function') return;
        
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === STORAGE_KEY) {
                try {
                    callback(JSON.parse(value));
                } catch (e) {
                    callback(null);
                }
            }
        };
    }

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetToDefaults,
        watch: watchChanges,
        constants: {
            THEMES: ['light', 'dark', 'auto'],
            LANGUAGES: ['en', 'es', 'fr', 'de']
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}const userPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
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
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        }
        return false;
    }
    
    function clearPreferences() {
        localStorage.removeItem(STORAGE_KEY);
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
})();const userPreferencesManager = (function() {
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
        return { ...getPreferences() };
    }
    
    return {
        get: getPreference,
        set: setPreference,
        remove: removePreference,
        clear: clearPreferences,
        getAll: getAllPreferences
    };
})();const userPreferencesManager = {
    preferences: {},

    init: function() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            this.preferences = JSON.parse(stored);
        } else {
            this.preferences = {
                theme: 'light',
                language: 'en',
                notifications: true,
                fontSize: 16
            };
            this.save();
        }
    },

    get: function(key) {
        return this.preferences[key];
    },

    set: function(key, value) {
        this.preferences[key] = value;
        this.save();
        return true;
    },

    save: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    },

    reset: function() {
        this.preferences = {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16
        };
        this.save();
    },

    getAll: function() {
        return {...this.preferences};
    }
};

userPreferencesManager.init();const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

class PreferencesManager {
  constructor() {
    this.storageKey = 'app_preferences';
    this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      Object.assign(userPreferences, JSON.parse(stored));
    }
  }

  savePreferences() {
    localStorage.setItem(this.storageKey, JSON.stringify(userPreferences));
  }

  updatePreference(key, value) {
    if (userPreferences.hasOwnProperty(key)) {
      userPreferences[key] = value;
      this.savePreferences();
      this.dispatchChangeEvent(key, value);
      return true;
    }
    return false;
  }

  getPreference(key) {
    return userPreferences[key];
  }

  getAllPreferences() {
    return { ...userPreferences };
  }

  resetPreferences() {
    const defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    Object.assign(userPreferences, defaults);
    this.savePreferences();
  }

  dispatchChangeEvent(key, value) {
    const event = new CustomEvent('preferenceChange', {
      detail: { key, value }
    });
    window.dispatchEvent(event);
  }
}

const preferencesManager = new PreferencesManager();

export { preferencesManager, userPreferences };const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
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
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
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
    getDefaults: () => ({ ...defaultPreferences })
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}