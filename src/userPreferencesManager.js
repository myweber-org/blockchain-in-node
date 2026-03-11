const UserPreferences = {
  preferences: {},

  init() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse stored preferences');
        this.preferences = {};
      }
    }
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    this.save();
  },

  getPreference(key, defaultValue = null) {
    return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    delete this.preferences[key];
    this.save();
  },

  clearAll() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
  },

  save() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  }
};

UserPreferences.init();const userPreferencesManager = (function() {
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
        return getPreferences();
    }

    return {
        get: getPreference,
        set: setPreference,
        remove: removePreference,
        clear: clearPreferences,
        getAll: getAllPreferences
    };
})();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'user_preferences_v1';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    lastUpdated: null
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultPreferences };
      
      const parsed = JSON.parse(stored);
      return { ...defaultPreferences, ...parsed };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = {
        ...current,
        ...updates,
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

  const exportPreferences = () => {
    const prefs = getPreferences();
    const blob = new Blob([JSON.stringify(prefs, null, 2)], { 
      type: 'application/json' 
    });
    return URL.createObjectURL(blob);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      return savePreferences(imported);
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return null;
    }
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (v) => ['light', 'dark', 'auto'].includes(v),
      language: (v) => typeof v === 'string' && v.length === 2,
      notifications: (v) => typeof v === 'boolean',
      fontSize: (v) => Number.isInteger(v) && v >= 12 && v <= 24,
      autoSave: (v) => typeof v === 'boolean'
    };

    return validators[key] ? validators[key](value) : false;
  };

  return {
    get: getPreferences,
    set: savePreferences,
    reset: resetPreferences,
    export: exportPreferences,
    import: importPreferences,
    validate: validatePreference,
    getDefaults: () => ({ ...defaultPreferences })
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
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
      console.warn('Failed to load preferences:', error);
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
      throw new Error(`Invalid preference: ${key}=${value}`);
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
    const storageHandler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(loadPreferences());
      }
    };
    
    window.addEventListener('storage', storageHandler);
    
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  };

  return {
    getPreferences: loadPreferences,
    setPreference: updatePreference,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    subscribe,
    validate: validatePreference
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}class UserPreferencesManager {
  constructor(storageKey = 'userPreferences') {
    this.storageKey = storageKey;
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {};
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

  setPreference(key, value) {
    this.preferences[key] = value;
    return this.savePreferences();
  }

  getPreference(key, defaultValue = null) {
    return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
  }

  removePreference(key) {
    if (this.preferences.hasOwnProperty(key)) {
      delete this.preferences[key];
      return this.savePreferences();
    }
    return false;
  }

  clearAllPreferences() {
    this.preferences = {};
    return this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  hasPreference(key) {
    return this.preferences.hasOwnProperty(key);
  }
}

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (preferences) => {
    try {
      const validated = validatePreferences(preferences);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const validatePreferences = (preferences) => {
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    return {
      theme: validThemes.includes(preferences.theme) ? preferences.theme : defaultPreferences.theme,
      fontSize: Math.max(12, Math.min(24, Number(preferences.fontSize) || defaultPreferences.fontSize)),
      notifications: Boolean(preferences.notifications),
      language: validLanguages.includes(preferences.language) ? preferences.language : defaultPreferences.language,
      autoSave: Boolean(preferences.autoSave),
      sidebarCollapsed: Boolean(preferences.sidebarCollapsed)
    };
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...defaultPreferences };
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    const preferences = loadPreferences();
    preferences[key] = value;
    return savePreferences(preferences);
  };

  const subscribe = (callback) => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(loadPreferences());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetToDefaults,
    get: getPreference,
    set: setPreference,
    subscribe,
    defaults: { ...defaultPreferences }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      notifications: (val) => typeof val === 'boolean',
      language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
      autoSave: (val) => typeof val === 'boolean',
      sidebarCollapsed: (val) => typeof val === 'boolean'
    };
    
    return validators[key] ? validators[key](value) : false;
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultPreferences };
      
      const parsed = JSON.parse(stored);
      const preferences = { ...defaultPreferences };
      
      Object.keys(parsed).forEach(key => {
        if (defaultPreferences.hasOwnProperty(key) && validatePreference(key, parsed[key])) {
          preferences[key] = parsed[key];
        }
      });
      
      return preferences;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const validated = {};
      Object.keys(preferences).forEach(key => {
        if (defaultPreferences.hasOwnProperty(key) && validatePreference(key, preferences[key])) {
          validated[key] = preferences[key];
        }
      });
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    if (!defaultPreferences.hasOwnProperty(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
    
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid value for preference ${key}: ${value}`);
    }
    
    const preferences = loadPreferences();
    preferences[key] = value;
    return savePreferences(preferences);
  };

  const setMultiplePreferences = (updates) => {
    const preferences = loadPreferences();
    Object.keys(updates).forEach(key => {
      if (defaultPreferences.hasOwnProperty(key) && validatePreference(key, updates[key])) {
        preferences[key] = updates[key];
      }
    });
    return savePreferences(preferences);
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const exportPreferences = () => {
    const preferences = loadPreferences();
    return JSON.stringify(preferences, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      return setMultiplePreferences(imported);
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  };

  const subscribe = (callback) => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getAllPreferences());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  };

  return {
    get: getPreference,
    set: setPreference,
    setMultiple: setMultiplePreferences,
    getAll: getAllPreferences,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    subscribe
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en'
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
        return { ...DEFAULT_PREFERENCES };
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
        return savePreferences(DEFAULT_PREFERENCES);
    };

    const getPreference = (key) => {
        const preferences = loadPreferences();
        return preferences[key];
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    return {
        updatePreference,
        getPreference,
        getAllPreferences,
        resetPreferences
    };
})();

export default UserPreferencesManager;const USER_PREFERENCES_KEY = 'app_preferences';

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
            fontSize: 16,
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

export default UserPreferencesManager;const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 'medium',
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
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return { ...defaultPreferences };
        }
    }

    function savePreferences(preferences) {
        try {
            const validPreferences = validatePreferences(preferences);
            validPreferences.lastUpdated = new Date().toISOString();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validPreferences));
            return { success: true, preferences: validPreferences };
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return { success: false, error: error.message };
        }
    }

    function validatePreferences(preferences) {
        const validated = { ...defaultPreferences };
        
        if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
            validated.theme = preferences.theme;
        }
        
        if (preferences.language && typeof preferences.language === 'string') {
            validated.language = preferences.language;
        }
        
        if (typeof preferences.notifications === 'boolean') {
            validated.notifications = preferences.notifications;
        }
        
        if (preferences.fontSize && ['small', 'medium', 'large'].includes(preferences.fontSize)) {
            validated.fontSize = preferences.fontSize;
        }
        
        if (typeof preferences.autoSave === 'boolean') {
            validated.autoSave = preferences.autoSave;
        }
        
        return validated;
    }

    function resetToDefaults() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { success: true, preferences: { ...defaultPreferences } };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return { success: false, error: error.message };
        }
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const storageHandler = (event) => {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        };

        window.addEventListener('storage', storageHandler);
        
        return () => {
            window.removeEventListener('storage', storageHandler);
        };
    }

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetToDefaults,
        subscribe: subscribe,
        constants: {
            THEMES: ['light', 'dark', 'auto'],
            FONT_SIZES: ['small', 'medium', 'large']
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}