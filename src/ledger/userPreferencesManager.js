const userPreferencesManager = (() => {
  const PREF_KEY = 'app_preferences';
  const DEFAULT_PREFS = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREF_KEY);
      return stored ? JSON.parse(stored) : { ...DEFAULT_PREFS };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...DEFAULT_PREFS };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(PREF_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.setItem(PREF_KEY, JSON.stringify(DEFAULT_PREFS));
      return { ...DEFAULT_PREFS };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const prefs = getPreferences();
    return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFS[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === PREF_KEY) {
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