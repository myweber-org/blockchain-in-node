const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
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
            dispatchChangeEvent(validated);
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function validatePreferences(preferences) {
        const valid = { ...defaultPreferences };
        
        Object.keys(preferences).forEach(key => {
            if (key in defaultPreferences) {
                const value = preferences[key];
                switch (key) {
                    case 'theme':
                        if (['light', 'dark', 'auto'].includes(value)) {
                            valid[key] = value;
                        }
                        break;
                    case 'language':
                        if (typeof value === 'string' && value.length === 2) {
                            valid[key] = value;
                        }
                        break;
                    case 'notifications':
                    case 'autoSave':
                        if (typeof value === 'boolean') {
                            valid[key] = value;
                        }
                        break;
                    case 'fontSize':
                        const size = Number(value);
                        if (!isNaN(size) && size >= 12 && size <= 24) {
                            valid[key] = size;
                        }
                        break;
                }
            }
        });
        
        return valid;
    }

    function dispatchChangeEvent(preferences) {
        if (typeof window !== 'undefined' && window.dispatchEvent) {
            window.dispatchEvent(new CustomEvent('preferencesChanged', {
                detail: preferences
            }));
        }
    }

    function resetToDefaults() {
        localStorage.removeItem(STORAGE_KEY);
        dispatchChangeEvent({ ...defaultPreferences });
        return { ...defaultPreferences };
    }

    function getPreference(key) {
        const preferences = loadPreferences();
        return key ? preferences[key] : preferences;
    }

    function setPreference(key, value) {
        const preferences = loadPreferences();
        preferences[key] = value;
        return savePreferences(preferences);
    }

    function subscribe(callback) {
        if (typeof window !== 'undefined') {
            window.addEventListener('preferencesChanged', (event) => {
                callback(event.detail);
            });
        }
    }

    return {
        load: loadPreferences,
        save: savePreferences,
        get: getPreference,
        set: setPreference,
        reset: resetToDefaults,
        subscribe: subscribe,
        defaults: { ...defaultPreferences }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  
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
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
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