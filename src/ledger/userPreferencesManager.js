const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  
  const setPreference = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(`${PREFIX}${key}`, serializedValue);
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  };

  const getPreference = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(`${PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to retrieve preference:', error);
      return defaultValue;
    }
  };

  const removePreference = (key) => {
    try {
      localStorage.removeItem(`${PREFIX}${key}`);
      return true;
    } catch (error) {
      console.error('Failed to remove preference:', error);
      return false;
    }
  };

  const clearAllPreferences = () => {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(PREFIX))
        .forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  };

  const getAllPreferences = () => {
    const preferences = {};
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(PREFIX)) {
          const preferenceKey = key.replace(PREFIX, '');
          preferences[preferenceKey] = getPreference(preferenceKey);
        }
      });
    } catch (error) {
      console.error('Failed to get all preferences:', error);
    }
    return preferences;
  };

  return {
    set: setPreference,
    get: getPreference,
    remove: removePreference,
    clear: clearAllPreferences,
    getAll: getAllPreferences
  };
})();

export default UserPreferencesManager;