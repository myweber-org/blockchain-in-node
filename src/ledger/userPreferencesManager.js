const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    lastUpdated: null
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = {
        ...current,
        ...updates,
        lastUpdated: new Date().toISOString()
      };
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
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
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
    subscribe
  };
})();const UserPreferencesManager = {
  preferences: {},

  init() {
    this.loadPreferences();
    this.setupEventListeners();
  },

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored preferences:', error);
        this.preferences = this.getDefaultPreferences();
      }
    } else {
      this.preferences = this.getDefaultPreferences();
    }
    this.applyPreferences();
  },

  getDefaultPreferences() {
    return {
      theme: 'light',
      fontSize: 'medium',
      notifications: true,
      language: 'en',
      autoSave: true
    };
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      this.dispatchEvent('preferencesUpdated', this.preferences);
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  updatePreference(key, value) {
    if (this.preferences.hasOwnProperty(key)) {
      this.preferences[key] = value;
      this.applyPreference(key, value);
      this.savePreferences();
      return true;
    }
    return false;
  },

  applyPreferences() {
    Object.entries(this.preferences).forEach(([key, value]) => {
      this.applyPreference(key, value);
    });
  },

  applyPreference(key, value) {
    switch (key) {
      case 'theme':
        document.documentElement.setAttribute('data-theme', value);
        break;
      case 'fontSize':
        document.documentElement.style.fontSize = this.getFontSizeValue(value);
        break;
      case 'notifications':
        this.toggleNotifications(value);
        break;
    }
  },

  getFontSizeValue(size) {
    const sizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px'
    };
    return sizes[size] || sizes.medium;
  },

  toggleNotifications(enabled) {
    if (enabled && 'Notification' in window && Notification.permission === 'granted') {
      console.log('Notifications are enabled');
    }
  },

  resetToDefaults() {
    this.preferences = this.getDefaultPreferences();
    this.applyPreferences();
    this.savePreferences();
  },

  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      const themeSelector = document.getElementById('themeSelector');
      const fontSizeSelector = document.getElementById('fontSizeSelector');
      const resetButton = document.getElementById('resetPreferences');

      if (themeSelector) {
        themeSelector.value = this.preferences.theme;
        themeSelector.addEventListener('change', (e) => {
          this.updatePreference('theme', e.target.value);
        });
      }

      if (fontSizeSelector) {
        fontSizeSelector.value = this.preferences.fontSize;
        fontSizeSelector.addEventListener('change', (e) => {
          this.updatePreference('fontSize', e.target.value);
        });
      }

      if (resetButton) {
        resetButton.addEventListener('click', () => {
          this.resetToDefaults();
        });
      }
    });
  },

  dispatchEvent(eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
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
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    getPreferences,
    savePreferences,
    resetToDefaults,
    subscribe
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const merged = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(PREFERENCES_KEY);
            return true;
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return false;
        }
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function getAllPreferences() {
        return getPreferences();
    }

    function hasCustomPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        return stored !== null;
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        save: savePreferences,
        reset: resetPreferences,
        hasCustom: hasCustomPreferences
    };
})();const UserPreferencesManager = {
  storageKey: 'app_user_preferences',

  defaults: {
    theme: 'light',
    language: 'en',
    fontSize: 16,
    notifications: true,
    autoSave: false,
    sidebarCollapsed: false
  },

  getPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return { ...this.defaults, ...JSON.parse(stored) };
      }
      return { ...this.defaults };
    } catch (error) {
      console.warn('Failed to load preferences:', error);
      return { ...this.defaults };
    }
  },

  savePreferences(preferences) {
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(this.storageKey, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  resetToDefaults() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return false;
    }
  },

  getPreference(key) {
    const prefs = this.getPreferences();
    return prefs[key] !== undefined ? prefs[key] : this.defaults[key];
  },

  setPreference(key, value) {
    return this.savePreferences({ [key]: value });
  },

  getAllPreferences() {
    return this.getPreferences();
  },

  exportPreferences() {
    const prefs = this.getPreferences();
    return JSON.stringify(prefs, null, 2);
  },

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      return this.savePreferences(imported);
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  }
};

export default UserPreferencesManager;const UserPreferencesManager = (() => {
    const PREF_KEY = 'app_user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(PREF_KEY);
            if (stored) {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to parse stored preferences:', error);
        }
        return { ...DEFAULT_PREFERENCES };
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
        localStorage.removeItem(PREF_KEY);
        return { ...DEFAULT_PREFERENCES };
    };

    const setPreference = (key, value) => {
        if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
            console.warn(`Unknown preference key: ${key}`);
            return false;
        }
        const current = getPreferences();
        current[key] = value;
        savePreferences(current);
        return true;
    };

    const getPreference = (key) => {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    };

    const exportPreferences = () => {
        const prefs = getPreferences();
        const blob = new Blob([JSON.stringify(prefs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'user-preferences.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const importPreferences = (jsonString) => {
        try {
            const imported = JSON.parse(jsonString);
            const validKeys = Object.keys(DEFAULT_PREFERENCES);
            const filtered = {};
            
            validKeys.forEach(key => {
                if (imported[key] !== undefined) {
                    filtered[key] = imported[key];
                }
            });
            
            return savePreferences(filtered);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return null;
        }
    };

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        setPreference,
        getPreference,
        exportPreferences,
        importPreferences,
        DEFAULT_PREFERENCES
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    let currentPreferences = { ...DEFAULT_PREFERENCES };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                currentPreferences = { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
            return currentPreferences;
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
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

    const resetPreferences = () => {
        currentPreferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        return currentPreferences;
    };

    const getPreference = (key) => {
        return currentPreferences[key] !== undefined ? currentPreferences[key] : null;
    };

    const getAllPreferences = () => {
        return { ...currentPreferences };
    };

    loadPreferences();

    return {
        save: savePreferences,
        load: loadPreferences,
        reset: resetPreferences,
        get: getPreference,
        getAll: getAllPreferences
    };
})();

export default UserPreferencesManager;class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    return stored ? JSON.parse(stored) : {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16,
      autoSave: false
    };
  }

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    return this;
  }

  updatePreference(key, value) {
    if (this.preferences.hasOwnProperty(key)) {
      this.preferences[key] = value;
      this.savePreferences();
      this.dispatchChangeEvent(key, value);
    }
    return this;
  }

  getPreference(key) {
    return this.preferences[key];
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  resetToDefaults() {
    this.preferences = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16,
      autoSave: false
    };
    this.savePreferences();
    this.dispatchChangeEvent('reset', this.preferences);
    return this;
  }

  dispatchChangeEvent(key, value) {
    const event = new CustomEvent('preferencesChanged', {
      detail: { key, value, allPreferences: this.getAllPreferences() }
    });
    window.dispatchEvent(event);
  }

  exportPreferences() {
    const dataStr = JSON.stringify(this.preferences, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    return dataUri;
  }

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      const validKeys = Object.keys(this.preferences);
      
      for (const key of validKeys) {
        if (imported.hasOwnProperty(key)) {
          this.preferences[key] = imported[key];
        }
      }
      
      this.savePreferences();
      this.dispatchChangeEvent('import', this.preferences);
      return true;
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    }

    function savePreferences(preferences) {
        try {
            const current = loadPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(DEFAULT_PREFERENCES));
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const preferences = loadPreferences();
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function getAllPreferences() {
        return loadPreferences();
    }

    function clearPreferences() {
        try {
            localStorage.removeItem(PREFERENCES_KEY);
            return true;
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    }

    return {
        load: loadPreferences,
        save: savePreferences,
        reset: resetPreferences,
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        clear: clearPreferences,
        defaults: { ...DEFAULT_PREFERENCES }
    };
})();class UserPreferencesManager {
  constructor(storageKey = 'user_preferences') {
    this.storageKey = storageKey;
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {};
    }
  }

  savePreferences() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  setPreference(key, value) {
    this.preferences[key] = value;
    return this.savePreferences();
  }

  getPreference(key, defaultValue = null) {
    return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
  }

  removePreference(key) {
    if (this.preferences.hasOwnProperty(key)) {
      delete this.preferences[key];
      return this.savePreferences();
    }
    return false;
  }

  clearAllPreferences() {
    this.preferences = {};
    return this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  hasPreference(key) {
    return this.preferences.hasOwnProperty(key);
  }
}

export default UserPreferencesManager;const UserPreferences = {
  defaults: {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true
  },

  init() {
    if (!this.isSupported()) {
      console.warn('localStorage not supported, using defaults');
      return this.defaults;
    }

    const stored = this.getAll();
    if (!stored || Object.keys(stored).length === 0) {
      this.setAll(this.defaults);
      return this.defaults;
    }

    return { ...this.defaults, ...stored };
  },

  isSupported() {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  },

  get(key) {
    if (!this.isSupported()) return this.defaults[key];

    try {
      const item = localStorage.getItem(`pref_${key}`);
      return item ? JSON.parse(item) : this.defaults[key];
    } catch {
      return this.defaults[key];
    }
  },

  set(key, value) {
    if (!this.isSupported()) return false;

    try {
      localStorage.setItem(`pref_${key}`, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  getAll() {
    if (!this.isSupported()) return {};

    const preferences = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('pref_')) {
        try {
          const prefKey = key.replace('pref_', '');
          preferences[prefKey] = JSON.parse(localStorage.getItem(key));
        } catch {
          continue;
        }
      }
    }
    return preferences;
  },

  setAll(prefs) {
    if (!this.isSupported()) return false;

    try {
      Object.keys(prefs).forEach(key => {
        this.set(key, prefs[key]);
      });
      return true;
    } catch {
      return false;
    }
  },

  reset() {
    if (!this.isSupported()) return false;

    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('pref_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      this.setAll(this.defaults);
      return true;
    } catch {
      return false;
    }
  },

  export() {
    const prefs = this.getAll();
    return JSON.stringify(prefs, null, 2);
  },

  import(jsonString) {
    if (!this.isSupported()) return false;

    try {
      const prefs = JSON.parse(jsonString);
      return this.setAll(prefs);
    } catch {
      return false;
    }
  }
};

export default UserPreferences;const USER_PREFERENCES_KEY = 'app_preferences';

class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(USER_PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : this.getDefaultPreferences();
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return this.getDefaultPreferences();
    }
  }

  getDefaultPreferences() {
    return {
      theme: 'light',
      notifications: true,
      fontSize: 16,
      language: 'en',
      autoSave: true,
      lastUpdated: new Date().toISOString()
    };
  }

  updatePreference(key, value) {
    if (!this.preferences.hasOwnProperty(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    this.preferences[key] = value;
    this.preferences.lastUpdated = new Date().toISOString();
    this.savePreferences();
    return true;
  }

  savePreferences() {
    try {
      localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  resetToDefaults() {
    this.preferences = this.getDefaultPreferences();
    this.savePreferences();
    return this.preferences;
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  getPreference(key) {
    return this.preferences[key];
  }

  exportPreferences() {
    return JSON.stringify(this.preferences, null, 2);
  }

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.preferences = { ...this.getDefaultPreferences(), ...imported };
      this.preferences.lastUpdated = new Date().toISOString();
      this.savePreferences();
      return true;
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  }
}

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    recentItems: []
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
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

  const updatePreference = (key, value) => {
    const current = getPreferences();
    return savePreferences({ ...current, [key]: value });
  };

  const addRecentItem = (item) => {
    const current = getPreferences();
    const recentItems = [...current.recentItems];
    
    const existingIndex = recentItems.findIndex(i => i.id === item.id);
    if (existingIndex !== -1) {
      recentItems.splice(existingIndex, 1);
    }
    
    recentItems.unshift(item);
    
    if (recentItems.length > 10) {
      recentItems.pop();
    }
    
    return updatePreference('recentItems', recentItems);
  };

  const clearRecentItems = () => {
    return updatePreference('recentItems', []);
  };

  const exportPreferences = () => {
    const preferences = getPreferences();
    const dataStr = JSON.stringify(preferences, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'user-preferences.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      return savePreferences(imported);
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return null;
    }
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    updatePreference,
    addRecentItem,
    clearRecentItems,
    exportPreferences,
    importPreferences
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}