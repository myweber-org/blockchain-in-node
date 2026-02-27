const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true
  };

  const validateKey = (key) => {
    if (!key || typeof key !== 'string') {
      throw new Error('Invalid preference key');
    }
    return true;
  };

  const getFullKey = (key) => `${PREFIX}${key}`;

  const getAll = () => {
    const preferences = { ...DEFAULT_PREFERENCES };
    
    Object.keys(DEFAULT_PREFERENCES).forEach(key => {
      const storedValue = localStorage.getItem(getFullKey(key));
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
    
    const storedValue = localStorage.getItem(getFullKey(key));
    
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
    
    if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
      throw new Error(`Cannot set unknown preference: ${key}`);
    }
    
    const expectedType = typeof DEFAULT_PREFERENCES[key];
    if (typeof value !== expectedType) {
      throw new Error(`Expected ${expectedType} for ${key}, got ${typeof value}`);
    }
    
    localStorage.setItem(getFullKey(key), JSON.stringify(value));
    return true;
  };

  const reset = (key = null) => {
    if (key) {
      validateKey(key);
      localStorage.removeItem(getFullKey(key));
    } else {
      Object.keys(DEFAULT_PREFERENCES).forEach(k => {
        localStorage.removeItem(getFullKey(k));
      });
    }
    return true;
  };

  const subscribe = (key, callback) => {
    validateKey(key);
    
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    
    const storageListener = (event) => {
      if (event.key === getFullKey(key)) {
        callback(get(key));
      }
    };
    
    window.addEventListener('storage', storageListener);
    
    return () => {
      window.removeEventListener('storage', storageListener);
    };
  };

  return {
    getAll,
    get,
    set,
    reset,
    subscribe,
    DEFAULT_PREFERENCES
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        sidebarCollapsed: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : { ...defaultPreferences };
        } catch (error) {
            console.error('Error reading preferences:', error);
            return { ...defaultPreferences };
        }
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return null;
        }
    }

    function resetToDefaults() {
        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(defaultPreferences));
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
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === PREFERENCES_KEY) {
                callback(getPreferences());
            }
        };
        
        return function unsubscribe() {
            localStorage.setItem = originalSetItem;
        };
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