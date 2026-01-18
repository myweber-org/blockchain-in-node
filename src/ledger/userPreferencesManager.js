const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    notifications: true,
    fontSize: 16,
    language: 'en',
    autoSave: false
  };

  let currentPreferences = { ...DEFAULT_PREFERENCES };

  const saveToLocalStorage = (preferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.warn('LocalStorage save failed:', error);
      return false;
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('LocalStorage load failed:', error);
      return null;
    }
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (v) => ['light', 'dark', 'auto'].includes(v),
      notifications: (v) => typeof v === 'boolean',
      fontSize: (v) => Number.isInteger(v) && v >= 12 && v <= 24,
      language: (v) => /^[a-z]{2}(-[A-Z]{2})?$/.test(v),
      autoSave: (v) => typeof v === 'boolean'
    };
    return validators[key] ? validators[key](value) : false;
  };

  const updatePreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid preference value for ${key}: ${value}`);
    }
    
    const oldValue = currentPreferences[key];
    currentPreferences[key] = value;
    
    if (!saveToLocalStorage(currentPreferences)) {
      currentPreferences[key] = oldValue;
      throw new Error('Failed to persist preference change');
    }
    
    return { key, oldValue, newValue: value };
  };

  const resetToDefaults = () => {
    currentPreferences = { ...DEFAULT_PREFERENCES };
    saveToLocalStorage(currentPreferences);
    return currentPreferences;
  };

  const initialize = () => {
    const stored = loadFromLocalStorage();
    if (stored) {
      Object.keys(DEFAULT_PREFERENCES).forEach(key => {
        if (validatePreference(key, stored[key])) {
          currentPreferences[key] = stored[key];
        }
      });
      saveToLocalStorage(currentPreferences);
    }
    return currentPreferences;
  };

  return {
    initialize,
    getPreferences: () => ({ ...currentPreferences }),
    getPreference: (key) => currentPreferences[key],
    updatePreference,
    resetToDefaults,
    subscribe: (callback) => {
      const handler = (event) => {
        if (event.key === STORAGE_KEY) {
          const stored = loadFromLocalStorage();
          if (stored) {
            currentPreferences = stored;
            callback(currentPreferences);
          }
        }
      };
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    }
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true,
    sidebarCollapsed: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
      return defaultPreferences;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return defaultPreferences;
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
      return defaultPreferences;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', handler);
    
    return () => {
      window.removeEventListener('storage', handler);
    };
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}