const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  
  const setPreference = (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(`${PREFIX}${key}`, serialized);
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  };

  const getPreference = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(`${PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to retrieve preference:', error);
      return defaultValue;
    }
  };

  const removePreference = (key) => {
    localStorage.removeItem(`${PREFIX}${key}`);
  };

  const clearAllPreferences = () => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => localStorage.removeItem(key));
  };

  const getAllPreferences = () => {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .reduce((prefs, key) => {
        const prefKey = key.replace(PREFIX, '');
        prefs[prefKey] = getPreference(prefKey);
        return prefs;
      }, {});
  };

  return {
    set: setPreference,
    get: getPreference,
    remove: removePreference,
    clear: clearAllPreferences,
    getAll: getAllPreferences
  };
})();const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        fontSize: 'medium',
        notifications: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {...DEFAULT_PREFERENCES};
    }

    function updatePreferences(newPreferences) {
        const current = getPreferences();
        const updated = {...current, ...newPreferences};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        dispatchPreferenceChangeEvent(updated);
        return updated;
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        dispatchPreferenceChangeEvent({...DEFAULT_PREFERENCES});
        return {...DEFAULT_PREFERENCES};
    }

    function dispatchPreferenceChangeEvent(preferences) {
        const event = new CustomEvent('preferencesChanged', {
            detail: preferences
        });
        window.dispatchEvent(event);
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    }

    return {
        get: getPreference,
        getAll: getPreferences,
        update: updatePreferences,
        reset: resetPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}