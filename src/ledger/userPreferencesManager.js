const UserPreferencesManager = (function() {
    const PREF_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(PREF_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const prefs = getPreferences();
        prefs[key] = value;
        localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
        return prefs;
    }
    
    function removePreference(key) {
        const prefs = getPreferences();
        delete prefs[key];
        localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
        return prefs;
    }
    
    function clearPreferences() {
        localStorage.removeItem(PREF_KEY);
        return {};
    }
    
    function hasPreference(key) {
        const prefs = getPreferences();
        return key in prefs;
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        get: getPreferences,
        set: setPreference,
        remove: removePreference,
        clear: clearPreferences,
        has: hasPreference,
        all: getAllPreferences
    };
})();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true,
    sidebarCollapsed: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (preferences) => {
    try {
      const validated = validatePreferences(preferences);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const validatePreferences = (preferences) => {
    const valid = { ...defaultPreferences };
    
    if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
      valid.theme = preferences.theme;
    }
    
    if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
      valid.fontSize = preferences.fontSize;
    }
    
    if (typeof preferences.notifications === 'boolean') {
      valid.notifications = preferences.notifications;
    }
    
    if (preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)) {
      valid.language = preferences.language;
    }
    
    if (typeof preferences.autoSave === 'boolean') {
      valid.autoSave = preferences.autoSave;
    }
    
    if (typeof preferences.sidebarCollapsed === 'boolean') {
      valid.sidebarCollapsed = preferences.sidebarCollapsed;
    }
    
    return valid;
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...defaultPreferences };
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
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
    reset: resetToDefaults,
    get: getPreference,
    set: setPreference,
    subscribe: subscribe,
    defaults: { ...defaultPreferences }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}