const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return { ...DEFAULT_PREFERENCES };
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
    if (key in DEFAULT_PREFERENCES) {
      const updated = { ...current, [key]: value };
      savePreferences(updated);
      return updated;
    }
    return current;
  };

  const resetToDefaults = () => {
    savePreferences(DEFAULT_PREFERENCES);
    return { ...DEFAULT_PREFERENCES };
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    update: updatePreference,
    reset: resetToDefaults,
    get: getPreference,
    defaults: DEFAULT_PREFERENCES
  };
})();