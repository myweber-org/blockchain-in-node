const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  };

  function getPreferences() {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Error reading preferences:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  }

  function savePreferences(preferences) {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return null;
    }
  }

  function resetPreferences() {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(DEFAULT_PREFERENCES));
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Error resetting preferences:', error);
      return null;
    }
  }

  function getPreference(key) {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
  }

  function setPreference(key, value) {
    return savePreferences({ [key]: value });
  }

  function subscribe(callback) {
    window.addEventListener('storage', (event) => {
      if (event.key === PREFERENCES_KEY) {
        callback(getPreferences());
      }
    });
  }

  return {
    get: getPreference,
    set: setPreference,
    getAll: getPreferences,
    save: savePreferences,
    reset: resetPreferences,
    subscribe: subscribe,
    defaults: DEFAULT_PREFERENCES
  };
})();