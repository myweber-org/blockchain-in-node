const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';

  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false,
    lastUpdated: null
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.error('Error reading preferences:', error);
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
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(PREFERENCES_KEY);
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Error resetting preferences:', error);
      return null;
    }
  };

  const subscribe = (callback) => {
    const handleStorageChange = (event) => {
      if (event.key === PREFERENCES_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  };

  return {
    get: getPreferences,
    save: savePreferences,
    reset: resetPreferences,
    subscribe
  };
})();const UserPreferencesManager = (function() {
    const PREFERENCE_KEYS = {
        THEME: 'userTheme',
        LANGUAGE: 'userLanguage',
        NOTIFICATIONS: 'notificationsEnabled'
    };

    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true
    };

    function getPreference(key) {
        const stored = localStorage.getItem(key);
        if (stored !== null) {
            try {
                return JSON.parse(stored);
            } catch {
                return DEFAULT_PREFERENCES[key] || null;
            }
        }
        return DEFAULT_PREFERENCES[key] || null;
    }

    function setPreference(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Failed to save preference:', error);
            return false;
        }
    }

    function getAllPreferences() {
        const preferences = {};
        Object.keys(PREFERENCE_KEYS).forEach(key => {
            const prefKey = PREFERENCE_KEYS[key];
            preferences[prefKey] = getPreference(prefKey);
        });
        return preferences;
    }

    function resetPreferences() {
        Object.keys(PREFERENCE_KEYS).forEach(key => {
            localStorage.removeItem(PREFERENCE_KEYS[key]);
        });
        return DEFAULT_PREFERENCES;
    }

    function subscribeToChanges(callback) {
        window.addEventListener('storage', function(event) {
            if (Object.values(PREFERENCE_KEYS).includes(event.key)) {
                callback(event.key, getPreference(event.key));
            }
        });
    }

    return {
        getTheme: () => getPreference(PREFERENCE_KEYS.THEME),
        setTheme: (theme) => setPreference(PREFERENCE_KEYS.THEME, theme),
        getLanguage: () => getPreference(PREFERENCE_KEYS.LANGUAGE),
        setLanguage: (lang) => setPreference(PREFERENCE_KEYS.LANGUAGE, lang),
        getNotifications: () => getPreference(PREFERENCE_KEYS.NOTIFICATIONS),
        setNotifications: (enabled) => setPreference(PREFERENCE_KEYS.NOTIFICATIONS, enabled),
        getAll: getAllPreferences,
        reset: resetPreferences,
        subscribe: subscribeToChanges
    };
})();const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false,
        lastUpdated: null
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
        }
        return { ...DEFAULT_PREFERENCES };
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

    const resetToDefaults = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const migratePreferences = (oldKey, migrationFn) => {
        try {
            const oldData = localStorage.getItem(oldKey);
            if (oldData) {
                const migrated = migrationFn(JSON.parse(oldData));
                savePreferences(migrated);
                localStorage.removeItem(oldKey);
                return true;
            }
        } catch (error) {
            console.error('Migration failed:', error);
        }
        return false;
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
        resetToDefaults,
        migratePreferences,
        subscribe
    };
})();class UserPreferencesManager {
  constructor(storageKey = 'user_preferences') {
    this.storageKey = storageKey;
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {};
    }
  }

  savePreferences() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  setPreference(key, value) {
    this.preferences[key] = value;
    return this.savePreferences();
  }

  getPreference(key, defaultValue = null) {
    return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
  }

  removePreference(key) {
    if (this.preferences.hasOwnProperty(key)) {
      delete this.preferences[key];
      return this.savePreferences();
    }
    return false;
  }

  clearAllPreferences() {
    this.preferences = {};
    return this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  hasPreference(key) {
    return this.preferences.hasOwnProperty(key);
  }
}

export default UserPreferencesManager;