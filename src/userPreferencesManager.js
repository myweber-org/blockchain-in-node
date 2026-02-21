const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notificationsEnabled: true,
    language: 'en'
  };

  const getStorage = () => {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage;
      }
    } catch (e) {
      console.warn('localStorage unavailable, falling back to sessionStorage');
    }
    return sessionStorage;
  };

  const loadPreferences = () => {
    const storage = getStorage();
    const stored = storage.getItem(STORAGE_KEY);
    
    if (!stored) {
      return { ...DEFAULT_PREFERENCES };
    }

    try {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_PREFERENCES, ...parsed };
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  };

  const savePreferences = (preferences) => {
    const storage = getStorage();
    const current = loadPreferences();
    const merged = { ...current, ...preferences };
    
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetPreferences = () => {
    const storage = getStorage();
    storage.removeItem(STORAGE_KEY);
    return { ...DEFAULT_PREFERENCES };
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        callback(loadPreferences());
      }
    };
    window.addEventListener('storage', handler);
    
    return () => {
      window.removeEventListener('storage', handler);
    };
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetPreferences,
    get: getPreference,
    set: setPreference,
    subscribe,
    DEFAULT_PREFERENCES
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}