const userPreferencesManager = (() => {
  const PREF_KEY = 'app_preferences';
  const DEFAULT_PREFS = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREF_KEY);
      return stored ? { ...DEFAULT_PREFS, ...JSON.parse(stored) } : { ...DEFAULT_PREFS };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...DEFAULT_PREFS };
    }
  };

  const updatePreference = (key, value) => {
    if (!DEFAULT_PREFS.hasOwnProperty(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
    
    const currentPrefs = getPreferences();
    const updatedPrefs = { ...currentPrefs, [key]: value };
    
    try {
      localStorage.setItem(PREF_KEY, JSON.stringify(updatedPrefs));
      return updatedPrefs;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return currentPrefs;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(PREF_KEY);
      return { ...DEFAULT_PREFS };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return getPreferences();
    }
  };

  const subscribe = (callback) => {
    const storageHandler = (event) => {
      if (event.key === PREF_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', storageHandler);
    
    return () => window.removeEventListener('storage', storageHandler);
  };

  return {
    getPreferences,
    updatePreference,
    resetPreferences,
    subscribe
  };
})();