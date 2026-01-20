const UserPreferencesManager = (function() {
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
        if (stored) {
            try {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                return defaultPreferences;
            }
        }
        return defaultPreferences;
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return true;
        } catch (e) {
            console.error('Failed to save preferences:', e);
            return false;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return defaultPreferences;
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(e) {
            if (e.key === STORAGE_KEY) {
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
        return preferences;
    }

    function removePreference(key) {
        const preferences = getPreferences();
        delete preferences[key];
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
        return preferences;
    }

    function clearAllPreferences() {
        localStorage.removeItem(PREFERENCES_KEY);
        return {};
    }

    function hasPreference(key) {
        const preferences = getPreferences();
        return key in preferences;
    }

    function getAllKeys() {
        const preferences = getPreferences();
        return Object.keys(preferences);
    }

    return {
        get: getPreferences,
        set: setPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        has: hasPreference,
        keys: getAllKeys
    };
})();const UserPreferencesManager = (() => {
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
            return currentPreferences;
        } catch (error) {
            console.warn('Failed to load preferences:', error);
            return currentPreferences;
        }
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
        return currentPreferences[key] !== undefined ? currentPreferences[key] : DEFAULT_PREFERENCES[key];
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

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
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
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return currentPreferences;
  };

  const savePreferences = (updates) => {
    currentPreferences = { ...currentPreferences, ...updates };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
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
    const storageHandler = (event) => {
      if (event.key === STORAGE_KEY) {
        loadPreferences();
        callback(currentPreferences);
      }
    };
    
    window.addEventListener('storage', storageHandler);
    
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
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
}