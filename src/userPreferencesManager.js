const userPreferencesManager = (() => {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
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
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return false;
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}const UserPreferencesManager = (function() {
  const STORAGE_KEY = 'user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  function getPreferences() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
    }
    return { ...DEFAULT_PREFERENCES };
  }

  function updatePreferences(updates) {
    const current = getPreferences();
    const merged = { ...current, ...updates };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return current;
    }
  }

  function resetToDefaults() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return getPreferences();
    }
  }

  function getPreference(key) {
    const prefs = getPreferences();
    return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
  }

  function subscribe(callback) {
    const handler = function(event) {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', handler);
    
    return function unsubscribe() {
      window.removeEventListener('storage', handler);
    };
  }

  return {
    get: getPreference,
    getAll: getPreferences,
    update: updatePreferences,
    reset: resetToDefaults,
    subscribe: subscribe,
    constants: {
      THEMES: ['light', 'dark', 'auto'],
      LANGUAGES: ['en', 'es', 'fr', 'de'],
      FONT_SIZES: [12, 14, 16, 18, 20]
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
    const PREFIX = 'user_pref_';
    const DEFAULTS = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const validateKey = (key) => {
        if (!Object.keys(DEFAULTS).includes(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
    };

    const get = (key) => {
        validateKey(key);
        const stored = localStorage.getItem(PREFIX + key);
        
        if (stored === null) {
            return DEFAULTS[key];
        }

        try {
            const parsed = JSON.parse(stored);
            return typeof DEFAULTS[key] === typeof parsed ? parsed : DEFAULTS[key];
        } catch {
            return DEFAULTS[key];
        }
    };

    const set = (key, value) => {
        validateKey(key);
        
        if (typeof value !== typeof DEFAULTS[key]) {
            throw new Error(`Type mismatch for ${key}. Expected ${typeof DEFAULTS[key]}`);
        }

        localStorage.setItem(PREFIX + key, JSON.stringify(value));
        dispatchEvent(new CustomEvent('preferencesChanged', { 
            detail: { key, value } 
        }));
    };

    const reset = (key = null) => {
        if (key) {
            validateKey(key);
            localStorage.removeItem(PREFIX + key);
            dispatchEvent(new CustomEvent('preferencesChanged', { 
                detail: { key, value: DEFAULTS[key] } 
            }));
        } else {
            Object.keys(DEFAULTS).forEach(k => {
                localStorage.removeItem(PREFIX + k);
            });
            dispatchEvent(new CustomEvent('preferencesReset'));
        }
    };

    const getAll = () => {
        return Object.keys(DEFAULTS).reduce((prefs, key) => {
            prefs[key] = get(key);
            return prefs;
        }, {});
    };

    const exportPrefs = () => {
        return JSON.stringify(getAll(), null, 2);
    };

    const importPrefs = (jsonString) => {
        try {
            const imported = JSON.parse(jsonString);
            Object.keys(imported).forEach(key => {
                if (Object.keys(DEFAULTS).includes(key)) {
                    set(key, imported[key]);
                }
            });
            return true;
        } catch {
            return false;
        }
    };

    return {
        get,
        set,
        reset,
        getAll,
        exportPrefs,
        importPrefs,
        DEFAULTS
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}