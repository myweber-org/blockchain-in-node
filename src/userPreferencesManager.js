const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        return preferences;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        delete preferences[key];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        return preferences;
    }
    
    function clearAllPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return {};
    }
    
    function hasPreference(key) {
        const preferences = getPreferences();
        return key in preferences;
    }
    
    function getAllKeys() {
        const preferences = getPreferences();
        return Object.keys(preferences);
    }
    
    return {
        get: getPreferences,
        set: setPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        has: hasPreference,
        keys: getAllKeys
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const subscribe = (callback) => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  };

  const getPreference = (key) => {
    const prefs = getPreferences();
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    subscribe,
    getPreference,
    setPreference,
    defaultPreferences
  };
})();

export default UserPreferencesManager;