const UserPreferencesManager = (() => {
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

  const loadPreferences = () => {
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
      const updated = {
        ...preferences,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : null;
  };

  const setPreference = (key, value) => {
    if (!validatePreference(key, value)) {
      console.warn(`Invalid value for preference "${key}":`, value);
      return false;
    }

    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const setMultiplePreferences = (updates) => {
    const current = loadPreferences();
    const updated = { ...current };

    for (const [key, value] of Object.entries(updates)) {
      if (validatePreference(key, value)) {
        updated[key] = value;
      } else {
        console.warn(`Skipping invalid preference "${key}":`, value);
      }
    }

    return savePreferences(updated);
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const exportPreferences = () => {
    const prefs = loadPreferences();
    return JSON.stringify(prefs, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      const current = loadPreferences();
      const merged = { ...current, ...imported };
      return savePreferences(merged);
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  };

  return {
    get: getPreference,
    set: setPreference,
    setMultiple: setMultiplePreferences,
    getAll: getAllPreferences,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}