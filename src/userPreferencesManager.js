const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notificationsEnabled: true,
    language: 'en'
  };

  const getStorage = () => {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage;
      }
    } catch (e) {
      console.warn('localStorage unavailable, falling back to sessionStorage');
    }
    return sessionStorage;
  };

  const loadPreferences = () => {
    const storage = getStorage();
    const stored = storage.getItem(STORAGE_KEY);
    
    if (!stored) {
      return { ...DEFAULT_PREFERENCES };
    }

    try {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_PREFERENCES, ...parsed };
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  };

  const savePreferences = (preferences) => {
    const storage = getStorage();
    const current = loadPreferences();
    const merged = { ...current, ...preferences };
    
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetPreferences = () => {
    const storage = getStorage();
    storage.removeItem(STORAGE_KEY);
    return { ...DEFAULT_PREFERENCES };
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        callback(loadPreferences());
      }
    };
    window.addEventListener('storage', handler);
    
    return () => {
      window.removeEventListener('storage', handler);
    };
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetPreferences,
    get: getPreference,
    set: setPreference,
    subscribe,
    DEFAULT_PREFERENCES
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
      console.error('Failed to load preferences:', error);
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
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  };

  return {
    get: getPreferences,
    save: savePreferences,
    reset: resetPreferences,
    subscribe,
    default: defaultPreferences
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
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
                return { ...defaultPreferences, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
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
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return defaultPreferences;
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : null;
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
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        getPreference: getPreference,
        setPreference: setPreference,
        subscribe: subscribe
    };
})();