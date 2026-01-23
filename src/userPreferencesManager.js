const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function validatePreferences(prefs) {
        const validThemes = ['light', 'dark', 'auto'];
        const validLanguages = ['en', 'es', 'fr', 'de'];
        
        if (!prefs || typeof prefs !== 'object') {
            return false;
        }

        if (prefs.theme && !validThemes.includes(prefs.theme)) {
            return false;
        }

        if (prefs.language && !validLanguages.includes(prefs.language)) {
            return false;
        }

        if (prefs.fontSize && (typeof prefs.fontSize !== 'number' || prefs.fontSize < 12 || prefs.fontSize > 24)) {
            return false;
        }

        if (prefs.notifications !== undefined && typeof prefs.notifications !== 'boolean') {
            return false;
        }

        if (prefs.autoSave !== undefined && typeof prefs.autoSave !== 'boolean') {
            return false;
        }

        return true;
    }

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                return { ...DEFAULT_PREFERENCES };
            }

            const parsed = JSON.parse(stored);
            if (!validatePreferences(parsed)) {
                console.warn('Invalid preferences found, using defaults');
                return { ...DEFAULT_PREFERENCES };
            }

            return { ...DEFAULT_PREFERENCES, ...parsed };
        } catch (error) {
            console.error('Error loading preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    }

    function savePreferences(preferences) {
        if (!validatePreferences(preferences)) {
            throw new Error('Invalid preferences provided');
        }

        const current = getPreferences();
        const merged = { ...current, ...preferences };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return false;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Error resetting preferences:', error);
            return false;
        }
    }

    function applyPreferences() {
        const prefs = getPreferences();
        
        document.documentElement.setAttribute('data-theme', prefs.theme);
        document.documentElement.lang = prefs.language;
        document.documentElement.style.fontSize = `${prefs.fontSize}px`;

        if (prefs.autoSave) {
            window.addEventListener('beforeunload', handleAutoSave);
        } else {
            window.removeEventListener('beforeunload', handleAutoSave);
        }

        return prefs;
    }

    function handleAutoSave(event) {
        const forms = document.querySelectorAll('form[data-autosave]');
        forms.forEach(form => {
            const formData = new FormData(form);
            const formState = Object.fromEntries(formData.entries());
            localStorage.setItem(`form_${form.id}_autosave`, JSON.stringify(formState));
        });
    }

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        apply: applyPreferences,
        validate: validatePreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...DEFAULT_PREFERENCES };
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
      return { ...DEFAULT_PREFERENCES };
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
    get: getPreferences,
    save: savePreferences,
    reset: resetPreferences,
    subscribe
  };
})();const userPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {...defaultPreferences};
    }

    function savePreferences(preferences) {
        const current = getPreferences();
        const merged = {...current, ...preferences};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
    }

    function resetPreferences() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPreferences));
        return {...defaultPreferences};
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        const prefs = getPreferences();
        prefs[key] = value;
        return savePreferences(prefs);
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(e) {
            if (e.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe
    };
})();