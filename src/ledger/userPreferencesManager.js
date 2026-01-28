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
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return null;
    }
  },

  save(preferences) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
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

UserPreferences.init();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';

  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
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
      console.warn('Failed to load preferences:', error);
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

  const subscribe = (callback) => {
    const storageHandler = (event) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', storageHandler);
    return () => window.removeEventListener('storage', storageHandler);
  };

  return {
    get: getPreferences,
    set: savePreferences,
    reset: resetPreferences,
    subscribe,
    defaults: { ...defaultPreferences }
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    fontSize: 16,
    notifications: true,
    autoSave: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  };

  const updatePreferences = (updates) => {
    try {
      const current = getPreferences();
      const merged = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      dispatchPreferenceChange(merged);
      return merged;
    } catch (error) {
      console.error('Failed to update preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      dispatchPreferenceChange(DEFAULT_PREFERENCES);
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const dispatchPreferenceChange = (preferences) => {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      const event = new CustomEvent('preferencesChanged', { detail: preferences });
      window.dispatchEvent(event);
    }
  };

  const subscribe = (callback) => {
    if (typeof window !== 'undefined') {
      window.addEventListener('preferencesChanged', (event) => callback(event.detail));
      return () => window.removeEventListener('preferencesChanged', (event) => callback(event.detail));
    }
    return () => {};
  };

  return {
    getPreferences,
    updatePreferences,
    resetPreferences,
    subscribe
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}