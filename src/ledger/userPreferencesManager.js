const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false,
    lastUpdated: null
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = {
        ...current,
        ...preferences,
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

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
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
    getPreferences,
    savePreferences,
    resetPreferences,
    getPreference,
    setPreference,
    subscribe
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
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
      language: (val) => /^[a-z]{2}(-[A-Z]{2})?$/.test(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean',
      lastUpdated: (val) => val === null || val instanceof Date
    };
    
    return validators[key] ? validators[key](value) : false;
  };

  const loadPreferences = () => {
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

  const savePreferences = (preferences) => {
    try {
      const validated = {};
      Object.keys(preferences).forEach(key => {
        if (validatePreference(key, preferences[key])) {
          validated[key] = preferences[key];
        }
      });
      
      validated.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid preference value for key: ${key}`);
    }
    
    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const exportPreferences = () => {
    const prefs = loadPreferences();
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
    getPreferences: loadPreferences,
    setPreference: updatePreference,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    subscribe,
    getDefaultPreferences: () => ({ ...defaultPreferences })
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const USER_PREFERENCES_KEY = 'app_preferences';

class UserPreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem(USER_PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : this.getDefaultPreferences();
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return this.getDefaultPreferences();
        }
    }

    getDefaultPreferences() {
        return {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 14,
            autoSave: false,
            lastUpdated: new Date().toISOString()
        };
    }

    updatePreference(key, value) {
        if (key in this.preferences) {
            this.preferences[key] = value;
            this.preferences.lastUpdated = new Date().toISOString();
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

    resetToDefaults() {
        this.preferences = this.getDefaultPreferences();
        this.savePreferences();
    }

    getAllPreferences() {
        return { ...this.preferences };
    }

    exportPreferences() {
        return JSON.stringify(this.preferences, null, 2);
    }

    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.preferences = { ...this.getDefaultPreferences(), ...imported };
            this.preferences.lastUpdated = new Date().toISOString();
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }
}

const preferencesManager = new UserPreferencesManager();const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const validateKey = (key) => {
    if (!key || typeof key !== 'string') {
      throw new Error('Invalid preference key');
    }
    return true;
  };

  const validateValue = (value) => {
    if (value === undefined || value === null) {
      throw new Error('Invalid preference value');
    }
    return true;
  };

  const getStorageKey = (key) => `${PREFIX}${key}`;

  const getAll = () => {
    const preferences = { ...DEFAULT_PREFERENCES };
    
    Object.keys(DEFAULT_PREFERENCES).forEach(key => {
      const storedValue = localStorage.getItem(getStorageKey(key));
      if (storedValue !== null) {
        try {
          preferences[key] = JSON.parse(storedValue);
        } catch {
          preferences[key] = storedValue;
        }
      }
    });
    
    return preferences;
  };

  const get = (key) => {
    validateKey(key);
    
    if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
      throw new Error(`Unknown preference: ${key}`);
    }
    
    const storedValue = localStorage.getItem(getStorageKey(key));
    if (storedValue === null) {
      return DEFAULT_PREFERENCES[key];
    }
    
    try {
      return JSON.parse(storedValue);
    } catch {
      return storedValue;
    }
  };

  const set = (key, value) => {
    validateKey(key);
    validateValue(value);
    
    if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
      throw new Error(`Cannot set unknown preference: ${key}`);
    }
    
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(getStorageKey(key), stringValue);
    
    return value;
  };

  const reset = (key = null) => {
    if (key) {
      validateKey(key);
      if (DEFAULT_PREFERENCES.hasOwnProperty(key)) {
        localStorage.removeItem(getStorageKey(key));
        return DEFAULT_PREFERENCES[key];
      }
      throw new Error(`Cannot reset unknown preference: ${key}`);
    } else {
      Object.keys(DEFAULT_PREFERENCES).forEach(resetKey => {
        localStorage.removeItem(getStorageKey(resetKey));
      });
      return { ...DEFAULT_PREFERENCES };
    }
  };

  const subscribe = (key, callback) => {
    validateKey(key);
    
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    
    const storageHandler = (event) => {
      if (event.key === getStorageKey(key)) {
        try {
          const newValue = event.newValue ? JSON.parse(event.newValue) : DEFAULT_PREFERENCES[key];
          const oldValue = event.oldValue ? JSON.parse(event.oldValue) : DEFAULT_PREFERENCES[key];
          callback(newValue, oldValue);
        } catch {
          const newValue = event.newValue || DEFAULT_PREFERENCES[key];
          const oldValue = event.oldValue || DEFAULT_PREFERENCES[key];
          callback(newValue, oldValue);
        }
      }
    };
    
    window.addEventListener('storage', storageHandler);
    
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  };

  const exportPreferences = () => {
    const preferences = getAll();
    return JSON.stringify(preferences, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      Object.keys(imported).forEach(key => {
        if (DEFAULT_PREFERENCES.hasOwnProperty(key)) {
          set(key, imported[key]);
        }
      });
      return getAll();
    } catch (error) {
      throw new Error('Invalid preferences JSON');
    }
  };

  return {
    getAll,
    get,
    set,
    reset,
    subscribe,
    export: exportPreferences,
    import: importPreferences,
    defaults: { ...DEFAULT_PREFERENCES }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_preferences';
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...defaultPreferences };
        }
    };

    const savePreferences = (preferences) => {
        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const validatePreference = (key, value) => {
        const validators = {
            theme: (v) => ['light', 'dark', 'auto'].includes(v),
            language: (v) => ['en', 'es', 'fr', 'de'].includes(v),
            notifications: (v) => typeof v === 'boolean',
            fontSize: (v) => Number.isInteger(v) && v >= 12 && v <= 24,
            autoSave: (v) => typeof v === 'boolean'
        };
        return validators[key] ? validators[key](value) : false;
    };

    return {
        getPreferences: () => loadPreferences(),

        getPreference: (key) => {
            const prefs = loadPreferences();
            return prefs[key] !== undefined ? prefs[key] : null;
        },

        setPreference: (key, value) => {
            if (!validatePreference(key, value)) {
                throw new Error(`Invalid value for preference "${key}"`);
            }
            const prefs = loadPreferences();
            prefs[key] = value;
            return savePreferences(prefs);
        },

        setMultiplePreferences: (updates) => {
            const prefs = loadPreferences();
            for (const [key, value] of Object.entries(updates)) {
                if (validatePreference(key, value)) {
                    prefs[key] = value;
                }
            }
            return savePreferences(prefs);
        },

        resetToDefault: () => {
            return savePreferences({ ...defaultPreferences });
        },

        clearPreferences: () => {
            try {
                localStorage.removeItem(PREFERENCES_KEY);
                return true;
            } catch (error) {
                console.error('Failed to clear preferences:', error);
                return false;
            }
        },

        subscribe: (callback) => {
            const storageHandler = (event) => {
                if (event.key === PREFERENCES_KEY) {
                    callback(loadPreferences());
                }
            };
            window.addEventListener('storage', storageHandler);
            return () => window.removeEventListener('storage', storageHandler);
        }
    };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
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
        subscribe
    };
})();

export default UserPreferencesManager;const UserPreferences = {
    _prefs: {},
    _defaults: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    },

    init() {
        const stored = localStorage.getItem('userPreferences');
        this._prefs = stored ? JSON.parse(stored) : { ...this._defaults };
        this._applyPreferences();
        return this;
    },

    get(key) {
        return this._prefs[key] !== undefined ? this._prefs[key] : this._defaults[key];
    },

    set(key, value) {
        if (this._defaults.hasOwnProperty(key)) {
            this._prefs[key] = value;
            this._save();
            this._applyPreferences();
            return true;
        }
        return false;
    },

    reset() {
        this._prefs = { ...this._defaults };
        this._save();
        this._applyPreferences();
    },

    getAll() {
        return { ...this._prefs };
    },

    _save() {
        localStorage.setItem('userPreferences', JSON.stringify(this._prefs));
    },

    _applyPreferences() {
        document.documentElement.setAttribute('data-theme', this.get('theme'));
        document.documentElement.style.fontSize = `${this.get('fontSize')}px`;
        
        if (!this.get('notifications')) {
            document.body.classList.add('notifications-disabled');
        } else {
            document.body.classList.remove('notifications-disabled');
        }
    }
};

Object.freeze(UserPreferences);
export default UserPreferences.init();const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const merged = { ...defaultPreferences, ...preferences };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(merged));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetPreferences = () => {
    localStorage.removeItem(PREFERENCES_KEY);
    return { ...defaultPreferences };
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    const prefs = loadPreferences();
    prefs[key] = value;
    return savePreferences(prefs);
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      notifications: (val) => typeof val === 'boolean',
      language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
      autoSave: (val) => typeof val === 'boolean'
    };
    
    return validators[key] ? validators[key](value) : false;
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetPreferences,
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    validate: validatePreference,
    defaults: { ...defaultPreferences }
  };
})();