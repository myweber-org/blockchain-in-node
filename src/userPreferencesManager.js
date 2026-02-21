const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  let preferences = { ...DEFAULT_PREFERENCES };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        preferences = { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
  };

  const savePreferences = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.warn('Failed to save preferences:', error);
    }
  };

  const getPreference = (key) => {
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const setPreference = (key, value) => {
    if (preferences[key] !== undefined) {
      preferences[key] = value;
      savePreferences();
      return true;
    }
    return false;
  };

  const resetPreferences = () => {
    preferences = { ...DEFAULT_PREFERENCES };
    localStorage.removeItem(STORAGE_KEY);
  };

  const getAllPreferences = () => {
    return { ...preferences };
  };

  loadPreferences();

  return {
    get: getPreference,
    set: setPreference,
    reset: resetPreferences,
    getAll: getAllPreferences
  };
})();const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
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
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                return DEFAULT_PREFERENCES;
            }
        }
        return DEFAULT_PREFERENCES;
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (e) {
            console.error('Failed to save preferences:', e);
            return null;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return DEFAULT_PREFERENCES;
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key];
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
})();const UserPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_user_preferences';

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

    function clearPreferences() {
        localStorage.removeItem(PREFERENCES_KEY);
        return {};
    }

    function getAllPreferences() {
        return getPreferences();
    }

    return {
        get: getPreferences,
        set: setPreference,
        remove: removePreference,
        clear: clearPreferences,
        getAll: getAllPreferences
    };
})();const UserPreferencesManager = (function() {
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

    function updatePreferences(updates) {
        const current = getPreferences();
        const updated = { ...current, ...updates };
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (e) {
            console.error('Failed to save preferences:', e);
            return current;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return defaultPreferences;
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        get: getPreferences,
        update: updatePreferences,
        reset: resetPreferences,
        subscribe: subscribe
    };
})();const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true,
        sidebarCollapsed: false
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...defaultPreferences };
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
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const getPreference = (key) => {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
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
    module.exports = UserPreferencesManager;
}