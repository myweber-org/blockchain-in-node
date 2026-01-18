const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    sidebarCollapsed: false
  };

  let currentPreferences = { ...defaultPreferences };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        currentPreferences = { ...defaultPreferences, ...parsed };
      }
      return currentPreferences;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return defaultPreferences;
    }
  };

  const savePreferences = (updates) => {
    try {
      currentPreferences = { ...currentPreferences, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
      return currentPreferences;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    return currentPreferences[key] !== undefined 
      ? currentPreferences[key] 
      : defaultPreferences[key];
  };

  const resetToDefaults = () => {
    currentPreferences = { ...defaultPreferences };
    localStorage.removeItem(STORAGE_KEY);
    return currentPreferences;
  };

  const getAllPreferences = () => {
    return { ...currentPreferences };
  };

  const subscribe = (callback) => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        loadPreferences();
        callback(getAllPreferences());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  };

  loadPreferences();

  return {
    get: getPreference,
    set: savePreferences,
    getAll: getAllPreferences,
    reset: resetToDefaults,
    subscribe
  };
})();

export default UserPreferencesManager;