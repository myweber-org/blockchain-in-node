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

    const validatePreference = (key, value) => {
        const validators = {
            theme: (val) => ['light', 'dark', 'auto'].includes(val),
            language: (val) => /^[a-z]{2}$/.test(val),
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

    const resetToDefaults = () => {
        localStorage.removeItem(STORAGE_KEY);
        return { ...defaultPreferences };
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
            const current = loadPreferences();
            const merged = { ...current, ...imported };
            
            if (savePreferences(merged)) {
                return { success: true, preferences: merged };
            }
            return { success: false, error: 'Save failed' };
        } catch (error) {
            return { success: false, error: 'Invalid JSON format' };
        }
    };

    return {
        get: (key) => {
            const prefs = loadPreferences();
            return key ? prefs[key] : { ...prefs };
        },
        
        set: (key, value) => {
            if (!validatePreference(key, value)) {
                throw new Error(`Invalid value for preference "${key}"`);
            }
            
            const current = loadPreferences();
            const updated = { ...current, [key]: value };
            
            return savePreferences(updated);
        },
        
        update: (updates) => {
            const current = loadPreferences();
            const updated = { ...current };
            
            Object.keys(updates).forEach(key => {
                if (validatePreference(key, updates[key])) {
                    updated[key] = updates[key];
                }
            });
            
            return savePreferences(updated);
        },
        
        reset: resetToDefaults,
        export: exportPreferences,
        import: importPreferences,
        
        subscribe: (callback) => {
            const handler = (event) => {
                if (event.key === STORAGE_KEY) {
                    callback(loadPreferences());
                }
            };
            
            window.addEventListener('storage', handler);
            
            return () => window.removeEventListener('storage', handler);
        }
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
    save: savePreferences,
    reset: resetPreferences,
    subscribe,
    getDefault: () => ({ ...defaultPreferences })
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}