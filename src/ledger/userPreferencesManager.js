const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    let currentPreferences = { ...DEFAULT_PREFERENCES };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                currentPreferences = { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
        return currentPreferences;
    }

    function savePreferences() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function updatePreferences(newPreferences) {
        currentPreferences = { ...currentPreferences, ...newPreferences };
        const success = savePreferences();
        if (success) {
            dispatchPreferenceChangeEvent();
        }
        return success;
    }

    function resetPreferences() {
        currentPreferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        dispatchPreferenceChangeEvent();
    }

    function dispatchPreferenceChangeEvent() {
        const event = new CustomEvent('preferencesChanged', {
            detail: { preferences: currentPreferences }
        });
        window.dispatchEvent(event);
    }

    function getPreference(key) {
        return currentPreferences[key];
    }

    function getAllPreferences() {
        return { ...currentPreferences };
    }

    loadPreferences();

    return {
        update: updatePreferences,
        reset: resetPreferences,
        get: getPreference,
        getAll: getAllPreferences,
        load: loadPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULTS = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const validateKey = (key) => {
    if (!Object.keys(DEFAULTS).includes(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
  };

  const get = (key) => {
    validateKey(key);
    const stored = localStorage.getItem(PREFIX + key);
    if (stored === null) return DEFAULTS[key];
    
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(PREFIX + key);
      return DEFAULTS[key];
    }
  };

  const set = (key, value) => {
    validateKey(key);
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    dispatchEvent(new CustomEvent('preferencesChanged', { 
      detail: { key, value } 
    }));
  };

  const reset = (key) => {
    if (key) {
      validateKey(key);
      localStorage.removeItem(PREFIX + key);
      dispatchEvent(new CustomEvent('preferencesChanged', { 
        detail: { key, value: DEFAULTS[key] } 
      }));
    } else {
      Object.keys(DEFAULTS).forEach(k => {
        localStorage.removeItem(PREFIX + k);
      });
      dispatchEvent(new CustomEvent('preferencesReset'));
    }
  };

  const getAll = () => {
    return Object.keys(DEFAULTS).reduce((prefs, key) => {
      prefs[key] = get(key);
      return prefs;
    }, {});
  };

  const subscribe = (callback) => {
    const handler = (e) => callback(e.detail);
    addEventListener('preferencesChanged', handler);
    return () => removeEventListener('preferencesChanged', handler);
  };

  return {
    get,
    set,
    reset,
    getAll,
    subscribe,
    defaults: { ...DEFAULTS }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}