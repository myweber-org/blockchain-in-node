const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (preferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    const current = loadPreferences();
    if (current.hasOwnProperty(key)) {
      current[key] = value;
      return savePreferences(current);
    }
    return false;
  };

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getAllPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    get: getAllPreferences,
    set: updatePreference,
    reset: resetToDefaults,
    subscribe
  };
})();const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'app_user_preferences';

    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        sidebarCollapsed: false
    };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    }

    function savePreferences(preferences) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function updatePreference(key, value) {
        const current = loadPreferences();
        const updated = { ...current, [key]: value };
        return savePreferences(updated);
    }

    function resetToDefaults() {
        return savePreferences(defaultPreferences);
    }

    function getPreference(key) {
        const prefs = loadPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function getAllPreferences() {
        return loadPreferences();
    }

    function subscribeToChanges(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === STORAGE_KEY) {
                callback(loadPreferences());
            }
        });
    }

    return {
        get: getPreference,
        getAll: getAllPreferences,
        set: updatePreference,
        reset: resetToDefaults,
        subscribe: subscribeToChanges
    };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  
  const getKey = (key) => `${PREFIX}${key}`;
  
  const setPreference = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(getKey(key), serializedValue);
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  };
  
  const getPreference = (key, defaultValue = null) => {
    try {
      const storedValue = localStorage.getItem(getKey(key));
      if (storedValue === null) return defaultValue;
      return JSON.parse(storedValue);
    } catch (error) {
      console.error('Failed to retrieve preference:', error);
      return defaultValue;
    }
  };
  
  const removePreference = (key) => {
    localStorage.removeItem(getKey(key));
  };
  
  const clearAllPreferences = () => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => localStorage.removeItem(key));
  };
  
  const getAllPreferences = () => {
    const preferences = {};
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(PREFIX)) {
        const prefKey = key.replace(PREFIX, '');
        preferences[prefKey] = getPreference(prefKey);
      }
    });
    return preferences;
  };
  
  return {
    set: setPreference,
    get: getPreference,
    remove: removePreference,
    clear: clearAllPreferences,
    getAll: getAllPreferences
  };
})();const userPreferencesManager = (() => {
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
      autoSave: (val) => typeof val === 'boolean',
      lastUpdated: (val) => val === null || val instanceof Date
    };

    return validators[key] ? validators[key](value) : false;
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultPreferences };

      const parsed = JSON.parse(stored);
      const preferences = { ...defaultPreferences };

      Object.keys(parsed).forEach(key => {
        if (validatePreference(key, parsed[key])) {
          preferences[key] = parsed[key];
        }
      });

      return preferences;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const validPreferences = {};
      
      Object.keys(preferences).forEach(key => {
        if (validatePreference(key, preferences[key])) {
          validPreferences[key] = preferences[key];
        }
      });

      validPreferences.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validPreferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid preference: ${key}=${value}`);
    }

    const current = loadPreferences();
    current[key] = value;
    return savePreferences(current);
  };

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const exportPreferences = () => {
    const prefs = loadPreferences();
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

  return {
    get: loadPreferences,
    set: savePreferences,
    update: updatePreference,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    validate: validatePreference,
    defaults: { ...defaultPreferences }
  };
})();