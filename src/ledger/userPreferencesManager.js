const userPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
  language: 'en'
};

class PreferencesManager {
  constructor() {
    this.prefs = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    return stored ? JSON.parse(stored) : { ...userPreferences };
  }

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
    return this.prefs;
  }

  updatePreference(key, value) {
    if (this.prefs.hasOwnProperty(key)) {
      this.prefs[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  resetToDefaults() {
    this.prefs = { ...userPreferences };
    this.savePreferences();
    return this.prefs;
  }

  getAllPreferences() {
    return { ...this.prefs };
  }
}

const preferencesManager = new PreferencesManager();

export { preferencesManager, PreferencesManager };const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        fontSize: 16,
        notifications: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
                return DEFAULT_PREFERENCES;
            }
        }
        return DEFAULT_PREFERENCES;
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return DEFAULT_PREFERENCES;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        savePreferences({ theme });
    }

    function applyLanguage(lang) {
        document.documentElement.lang = lang;
        savePreferences({ language: lang });
    }

    function applyFontSize(size) {
        document.documentElement.style.fontSize = `${size}px`;
        savePreferences({ fontSize: size });
    }

    function initialize() {
        const prefs = getPreferences();
        applyTheme(prefs.theme);
        applyLanguage(prefs.language);
        applyFontSize(prefs.fontSize);
        return prefs;
    }

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        applyTheme,
        applyLanguage,
        applyFontSize,
        initialize
    };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    sidebarCollapsed: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return defaultPreferences;
    }
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
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    return {
      theme: validThemes.includes(preferences.theme) ? preferences.theme : defaultPreferences.theme,
      language: validLanguages.includes(preferences.language) ? preferences.language : defaultPreferences.language,
      notifications: typeof preferences.notifications === 'boolean' ? preferences.notifications : defaultPreferences.notifications,
      fontSize: typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24 ? preferences.fontSize : defaultPreferences.fontSize,
      autoSave: typeof preferences.autoSave === 'boolean' ? preferences.autoSave : defaultPreferences.autoSave,
      sidebarCollapsed: typeof preferences.sidebarCollapsed === 'boolean' ? preferences.sidebarCollapsed : defaultPreferences.sidebarCollapsed
    };
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return defaultPreferences;
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    const preferences = loadPreferences();
    preferences[key] = value;
    return savePreferences(preferences);
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const subscribe = (callback) => {
    const storageHandler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(loadPreferences());
      }
    };
    window.addEventListener('storage', storageHandler);
    
    return () => window.removeEventListener('storage', storageHandler);
  };

  return {
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    save: savePreferences,
    reset: resetToDefaults,
    subscribe: subscribe
  };
})();

export default UserPreferencesManager;