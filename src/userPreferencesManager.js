const UserPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_preferences';
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    let currentPreferences = { ...defaultPreferences };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            if (stored) {
                currentPreferences = { ...defaultPreferences, ...JSON.parse(stored) };
            }
            return currentPreferences;
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return currentPreferences;
        }
    };

    const savePreferences = (updates) => {
        try {
            currentPreferences = { ...currentPreferences, ...updates };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(currentPreferences));
            return currentPreferences;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return currentPreferences;
        }
    };

    const resetPreferences = () => {
        currentPreferences = { ...defaultPreferences };
        localStorage.removeItem(PREFERENCES_KEY);
        return currentPreferences;
    };

    const getPreference = (key) => {
        return currentPreferences[key] !== undefined ? currentPreferences[key] : defaultPreferences[key];
    };

    const getAllPreferences = () => {
        return { ...currentPreferences };
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === PREFERENCES_KEY) {
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
        defaults: { ...defaultPreferences }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  
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
      const validated = {};

      Object.keys(defaultPreferences).forEach(key => {
        if (validatePreference(key, parsed[key])) {
          validated[key] = parsed[key];
        } else {
          validated[key] = defaultPreferences[key];
        }
      });

      return validated;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const updated = {
        ...preferences,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetPreferences = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...defaultPreferences };
  };

  const updatePreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid value for preference: ${key}`);
    }

    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    
    if (savePreferences(updated)) {
      return updated;
    }
    
    return current;
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const exportPreferences = () => {
    const prefs = loadPreferences();
    return JSON.stringify(prefs, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      const validated = {};

      Object.keys(defaultPreferences).forEach(key => {
        if (validatePreference(key, imported[key])) {
          validated[key] = imported[key];
        }
      });

      if (Object.keys(validated).length > 0) {
        return savePreferences(validated);
      }
      
      return false;
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetPreferences,
    update: updatePreference,
    get: getPreference,
    export: exportPreferences,
    import: importPreferences,
    getDefaults: () => ({ ...defaultPreferences })
  };
})();const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    };

    const savePreferences = (preferences) => {
        try {
            const current = loadPreferences();
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
        const preferences = loadPreferences();
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    };

    const setPreference = (key, value) => {
        return savePreferences({ [key]: value });
    };

    const getAllPreferences = () => {
        return loadPreferences();
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
        load: loadPreferences,
        save: savePreferences,
        reset: resetPreferences,
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferences = {
    storageKey: 'app_user_preferences',

    getPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return {};
        }
    },

    setPreference(key, value) {
        const preferences = this.getPreferences();
        preferences[key] = value;
        
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preference:', error);
            return false;
        }
    },

    removePreference(key) {
        const preferences = this.getPreferences();
        delete preferences[key];
        
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to remove preference:', error);
            return false;
        }
    },

    clearAllPreferences() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    },

    hasPreference(key) {
        const preferences = this.getPreferences();
        return key in preferences;
    },

    getAllPreferences() {
        return { ...this.getPreferences() };
    }
};

export default UserPreferences;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        timezone: 'UTC'
    };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...defaultPreferences };
        }
    }

    function savePreferences(preferences) {
        try {
            const validated = validatePreferences(preferences);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function validatePreferences(preferences) {
        const valid = {};
        
        if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
            valid.theme = preferences.theme;
        }
        
        if (preferences.language && typeof preferences.language === 'string') {
            valid.language = preferences.language.substring(0, 5);
        }
        
        if (typeof preferences.notifications === 'boolean') {
            valid.notifications = preferences.notifications;
        }
        
        if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
            valid.fontSize = preferences.fontSize;
        }
        
        if (typeof preferences.autoSave === 'boolean') {
            valid.autoSave = preferences.autoSave;
        }
        
        if (preferences.timezone && typeof preferences.timezone === 'string') {
            valid.timezone = preferences.timezone;
        }
        
        return valid;
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return { ...defaultPreferences };
    }

    function getPreference(key) {
        const preferences = loadPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        const preferences = loadPreferences();
        preferences[key] = value;
        return savePreferences(preferences);
    }

    function getAllPreferences() {
        return loadPreferences();
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }
        
        const handler = function(event) {
            if (event.key === STORAGE_KEY) {
                callback(getAllPreferences());
            }
        };
        
        window.addEventListener('storage', handler);
        
        return function() {
            window.removeEventListener('storage', handler);
        };
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe,
        defaults: { ...defaultPreferences }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const PREFIX = 'user_pref_';
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
    return key;
  };

  const getStorageKey = (key) => `${PREFIX}${key}`;

  const getAllPreferences = () => {
    const preferences = { ...DEFAULT_PREFERENCES };
    Object.keys(localStorage).forEach((storageKey) => {
      if (storageKey.startsWith(PREFIX)) {
        const key = storageKey.replace(PREFIX, '');
        try {
          preferences[key] = JSON.parse(localStorage.getItem(storageKey));
        } catch {
          preferences[key] = localStorage.getItem(storageKey);
        }
      }
    });
    return preferences;
  };

  const setPreference = (key, value) => {
    validateKey(key);
    const storageKey = getStorageKey(key);
    const serializedValue = typeof value === 'object' 
      ? JSON.stringify(value) 
      : value;
    localStorage.setItem(storageKey, serializedValue);
    return value;
  };

  const getPreference = (key) => {
    validateKey(key);
    const storageKey = getStorageKey(key);
    const storedValue = localStorage.getItem(storageKey);
    
    if (storedValue === null) {
      return DEFAULT_PREFERENCES[key];
    }

    try {
      return JSON.parse(storedValue);
    } catch {
      return storedValue;
    }
  };

  const removePreference = (key) => {
    validateKey(key);
    localStorage.removeItem(getStorageKey(key));
  };

  const resetToDefaults = () => {
    Object.keys(localStorage).forEach((storageKey) => {
      if (storageKey.startsWith(PREFIX)) {
        localStorage.removeItem(storageKey);
      }
    });
  };

  const exportPreferences = () => {
    const prefs = getAllPreferences();
    return JSON.stringify(prefs, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const importedPrefs = JSON.parse(jsonString);
      Object.entries(importedPrefs).forEach(([key, value]) => {
        setPreference(key, value);
      });
      return true;
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  };

  return {
    getAll: getAllPreferences,
    get: getPreference,
    set: setPreference,
    remove: removePreference,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    defaults: { ...DEFAULT_PREFERENCES }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true
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
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
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
})();

export default userPreferencesManager;const userPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_preferences';
    
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
            const stored = localStorage.getItem(PREFERENCES_KEY);
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
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const updatePreference = (key, value) => {
        if (!defaultPreferences.hasOwnProperty(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
        
        const current = loadPreferences();
        const updated = { ...current, [key]: value };
        
        if (savePreferences(updated)) {
            dispatchPreferenceChange(key, value);
            return true;
        }
        return false;
    };

    const resetPreferences = () => {
        if (savePreferences(defaultPreferences)) {
            Object.keys(defaultPreferences).forEach(key => {
                dispatchPreferenceChange(key, defaultPreferences[key]);
            });
            return true;
        }
        return false;
    };

    const dispatchPreferenceChange = (key, value) => {
        const event = new CustomEvent('preferencechange', {
            detail: { key, value }
        });
        window.dispatchEvent(event);
    };

    const getPreference = (key) => {
        const preferences = loadPreferences();
        return preferences[key];
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    const subscribe = (callback) => {
        window.addEventListener('preferencechange', (event) => {
            callback(event.detail);
        });
    };

    const unsubscribe = (callback) => {
        window.removeEventListener('preferencechange', callback);
    };

    return {
        get: getPreference,
        getAll: getAllPreferences,
        set: updatePreference,
        reset: resetPreferences,
        subscribe,
        unsubscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
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
            theme: validThemes.includes(preferences.theme) ? preferences.theme : DEFAULT_PREFERENCES.theme,
            language: validLanguages.includes(preferences.language) ? preferences.language : DEFAULT_PREFERENCES.language,
            notifications: typeof preferences.notifications === 'boolean' ? preferences.notifications : DEFAULT_PREFERENCES.notifications,
            fontSize: Number.isInteger(preferences.fontSize) && preferences.fontSize >= 12 && preferences.fontSize <= 24 
                ? preferences.fontSize 
                : DEFAULT_PREFERENCES.fontSize,
            autoSave: typeof preferences.autoSave === 'boolean' ? preferences.autoSave : DEFAULT_PREFERENCES.autoSave
        };
    };

    const resetToDefaults = () => {
        localStorage.removeItem(STORAGE_KEY);
        return { ...DEFAULT_PREFERENCES };
    };

    const getPreference = (key) => {
        const prefs = loadPreferences();
        return prefs[key] !== undefined ? prefs[key] : null;
    };

    const setPreference = (key, value) => {
        const current = loadPreferences();
        const updated = { ...current, [key]: value };
        return savePreferences(updated);
    };

    const getAllPreferences = () => {
        return loadPreferences();
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
        loadPreferences,
        savePreferences,
        resetToDefaults,
        getPreference,
        setPreference,
        getAllPreferences,
        subscribe
    };
})();

export default userPreferencesManager;const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
                return DEFAULT_PREFERENCES;
            }
        }
        return DEFAULT_PREFERENCES;
    }

    function updatePreferences(newPreferences) {
        const current = getPreferences();
        const updated = { ...current, ...newPreferences };
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            dispatchPreferenceChange(updated);
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return current;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        dispatchPreferenceChange(DEFAULT_PREFERENCES);
        return DEFAULT_PREFERENCES;
    }

    function dispatchPreferenceChange(preferences) {
        const event = new CustomEvent('preferencesChanged', {
            detail: preferences
        });
        window.dispatchEvent(event);
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key];
    }

    function setPreference(key, value) {
        return updatePreferences({ [key]: value });
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        update: updatePreferences,
        reset: resetPreferences
    };
})();const UserPreferencesManager = (() => {
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
      language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean'
    };

    return validators[key] ? validators[key](value) : false;
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultPreferences };
      
      const parsed = JSON.parse(stored);
      return { ...defaultPreferences, ...parsed };
    } catch (error) {
      console.warn('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const updated = {
        ...preferences,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid value for preference "${key}"`);
    }

    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    
    if (savePreferences(updated)) {
      window.dispatchEvent(new CustomEvent('preferencesChanged', {
        detail: { key, value, allPreferences: updated }
      }));
      return updated;
    }
    
    return current;
  };

  const resetToDefaults = () => {
    const success = savePreferences(defaultPreferences);
    if (success) {
      window.dispatchEvent(new CustomEvent('preferencesReset', {
        detail: { preferences: defaultPreferences }
      }));
    }
    return success;
  };

  const exportPreferences = () => {
    const prefs = loadPreferences();
    const blob = new Blob([JSON.stringify(prefs, null, 2)], {
      type: 'application/json'
    });
    return URL.createObjectURL(blob);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      const validated = {};
      
      Object.keys(defaultPreferences).forEach(key => {
        if (imported.hasOwnProperty(key) && validatePreference(key, imported[key])) {
          validated[key] = imported[key];
        } else {
          validated[key] = defaultPreferences[key];
        }
      });
      
      return savePreferences(validated);
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  };

  return {
    getPreferences: loadPreferences,
    setPreference: updatePreference,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    validate: validatePreference
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
    autoSave: true,
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
      const validated = { ...defaultPreferences };

      Object.keys(parsed).forEach(key => {
        if (validatePreference(key, parsed[key])) {
          validated[key] = parsed[key];
        }
      });

      return validated;
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
      throw new Error(`Invalid preference value for ${key}`);
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

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  return {
    get: getPreference,
    getAll: getAllPreferences,
    set: updatePreference,
    save: savePreferences,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    validate: validatePreference
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
      } catch (error) {
        console.error('Failed to parse preferences:', error);
        this.preferences = this.getDefaultPreferences();
      }
    } else {
      this.preferences = this.getDefaultPreferences();
    }
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      this.dispatchEvent('preferencesUpdated', this.preferences);
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  getDefaultPreferences() {
    return {
      theme: 'light',
      fontSize: 'medium',
      notifications: true,
      language: 'en',
      autoSave: true
    };
  },

  getPreference(key) {
    return this.preferences[key] || this.getDefaultPreferences()[key];
  },

  setPreference(key, value) {
    if (key in this.getDefaultPreferences()) {
      this.preferences[key] = value;
      return this.savePreferences();
    }
    return false;
  },

  resetPreferences() {
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
        this.dispatchEvent('preferencesSynced', this.preferences);
      }
    });
  },

  dispatchEvent(eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }
};

UserPreferences.init();