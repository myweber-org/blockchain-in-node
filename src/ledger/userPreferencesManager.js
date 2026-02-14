const UserPreferences = {
  storageKey: 'app_user_preferences',

  defaults: {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true
  },

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : { ...this.defaults };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...this.defaults };
    }
  },

  save(preferences) {
    try {
      const merged = { ...this.defaults, ...preferences };
      localStorage.setItem(this.storageKey, JSON.stringify(merged));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  update(key, value) {
    const current = this.load();
    current[key] = value;
    return this.save(current);
  },

  reset() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return false;
    }
  },

  getAll() {
    return this.load();
  },

  get(key) {
    const prefs = this.load();
    return prefs[key] !== undefined ? prefs[key] : this.defaults[key];
  }
};

export default UserPreferences;const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'user_preferences_v1';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        timezone: 'UTC'
    };

    const validatePreference = (key, value) => {
        const validators = {
            theme: (val) => ['light', 'dark', 'auto'].includes(val),
            language: (val) => /^[a-z]{2}(-[A-Z]{2})?$/.test(val),
            notifications: (val) => typeof val === 'boolean',
            fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
            autoSave: (val) => typeof val === 'boolean',
            timezone: (val) => Intl.supportedValuesOf('timeZone').includes(val)
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
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
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

    const getPreference = (key) => {
        const preferences = loadPreferences();
        return preferences[key] || defaultPreferences[key];
    };

    const setPreference = (key, value) => {
        if (!validatePreference(key, value)) {
            throw new Error(`Invalid value for preference "${key}"`);
        }
        
        const preferences = loadPreferences();
        preferences[key] = value;
        savePreferences(preferences);
        return preferences;
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    const setMultiplePreferences = (updates) => {
        const preferences = loadPreferences();
        Object.keys(updates).forEach(key => {
            if (validatePreference(key, updates[key])) {
                preferences[key] = updates[key];
            }
        });
        savePreferences(preferences);
        return preferences;
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
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        setMultiple: setMultiplePreferences,
        reset: resetPreferences,
        subscribe,
        validate: validatePreference
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}