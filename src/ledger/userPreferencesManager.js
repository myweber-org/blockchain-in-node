const UserPreferences = {
  storageKey: 'app_preferences',

  defaults: {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  },

  init() {
    if (!this.load()) {
      this.save(this.defaults);
    }
  },

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return null;
    }
  },

  save(preferences) {
    try {
      const merged = { ...this.defaults, ...preferences };
      localStorage.setItem(this.storageKey, JSON.stringify(merged));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  get(key) {
    const prefs = this.load();
    return prefs ? prefs[key] : this.defaults[key];
  },

  set(key, value) {
    const prefs = this.load() || this.defaults;
    prefs[key] = value;
    return this.save(prefs);
  },

  reset() {
    return this.save(this.defaults);
  },

  getAll() {
    return this.load() || this.defaults;
  }
};

UserPreferences.init();const userPreferencesManager = (() => {
  const PREF_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREF_KEY);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
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
      localStorage.removeItem(PREF_KEY);
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const prefs = getPreferences();
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
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

export default userPreferencesManager;const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  
  const getKey = (key) => `${PREFIX}${key}`;
  
  const setPreference = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(getKey(key), serializedValue);
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  };
  
  const getPreference = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(getKey(key));
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to retrieve preference:', error);
      return defaultValue;
    }
  };
  
  const removePreference = (key) => {
    localStorage.removeItem(getKey(key));
  };
  
  const clearAllPreferences = () => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => localStorage.removeItem(key));
  };
  
  const getAllPreferences = () => {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .reduce((prefs, key) => {
        const originalKey = key.replace(PREFIX, '');
        prefs[originalKey] = getPreference(originalKey);
        return prefs;
      }, {});
  };
  
  return {
    set: setPreference,
    get: getPreference,
    remove: removePreference,
    clear: clearAllPreferences,
    getAll: getAllPreferences
  };
})();const userPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        showTutorial: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Error loading preferences:', error);
            return { ...defaultPreferences };
        }
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Error resetting preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference,
        subscribe
    };
})();const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        fontSize: 'medium',
        notifications: true
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
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
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        savePreferences({ theme });
    }

    function applyLanguage(lang) {
        document.documentElement.lang = lang;
        savePreferences({ language: lang });
    }

    function initialize() {
        const prefs = getPreferences();
        applyTheme(prefs.theme);
        applyLanguage(prefs.language);
        return prefs;
    }

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        applyTheme,
        applyLanguage,
        initialize
    };
})();

export default UserPreferencesManager;const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    this.setupListeners();
  },

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored preferences:', e);
        this.preferences = {};
      }
    }
    this.applyPreferences();
  },

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    this.dispatchChangeEvent();
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    this.savePreferences();
  },

  getPreference(key) {
    return this.preferences[key];
  },

  removePreference(key) {
    delete this.preferences[key];
    this.savePreferences();
  },

  applyPreferences() {
    if (this.preferences.theme) {
      document.documentElement.setAttribute('data-theme', this.preferences.theme);
    }
    if (this.preferences.fontSize) {
      document.documentElement.style.fontSize = this.preferences.fontSize;
    }
  },

  setupListeners() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'userPreferences') {
        this.loadPreferences();
      }
    });

    document.addEventListener('preferenceChange', (event) => {
      if (event.detail && event.detail.key) {
        this.setPreference(event.detail.key, event.detail.value);
      }
    });
  },

  dispatchChangeEvent() {
    const event = new CustomEvent('preferencesUpdated', {
      detail: { preferences: this.preferences }
    });
    window.dispatchEvent(event);
  }
};

UserPreferences.init();