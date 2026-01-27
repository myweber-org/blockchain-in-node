const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    sidebarCollapsed: false
  };

  let currentPreferences = { ...DEFAULT_PREFERENCES };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        currentPreferences = { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return currentPreferences;
  };

  const savePreferences = (updates) => {
    try {
      currentPreferences = { ...currentPreferences, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetToDefaults = () => {
    currentPreferences = { ...DEFAULT_PREFERENCES };
    localStorage.removeItem(STORAGE_KEY);
    return currentPreferences;
  };

  const getPreference = (key) => {
    return currentPreferences[key] !== undefined 
      ? currentPreferences[key] 
      : DEFAULT_PREFERENCES[key];
  };

  const getAllPreferences = () => {
    return { ...currentPreferences };
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

  loadPreferences();

  return {
    get: getPreference,
    getAll: getAllPreferences,
    set: savePreferences,
    reset: resetToDefaults,
    subscribe,
    constants: {
      THEMES: ['light', 'dark', 'auto'],
      LANGUAGES: ['en', 'es', 'fr', 'de']
    }
  };
})();

export default UserPreferencesManager;