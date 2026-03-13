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
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
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
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return current;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return defaultPreferences;
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key];
    }

    function setPreference(key, value) {
        return updatePreferences({ [key]: value });
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
        update: updatePreferences,
        reset: resetPreferences,
        subscribe: subscribe
    };
})();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    lastUpdated: null
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

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences, lastUpdated: new Date().toISOString() };
      
      for (const [key, value] of Object.entries(updated)) {
        if (!validatePreference(key, value)) {
          throw new Error(`Invalid value for ${key}: ${value}`);
        }
      }
      
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
    set: savePreferences,
    reset: resetPreferences,
    export: exportPreferences,
    import: importPreferences,
    subscribe,
    validate: validatePreference
  };
})();