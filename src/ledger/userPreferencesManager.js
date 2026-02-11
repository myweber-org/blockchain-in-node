const UserPreferencesManager = {
    storageKey: 'user_preferences',

    defaults: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    },

    initialize() {
        if (!this.getPreferences()) {
            this.savePreferences(this.defaults);
        }
    },

    getPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return null;
        }
    },

    savePreferences(preferences) {
        try {
            const current = this.getPreferences() || this.defaults;
            const merged = { ...current, ...preferences };
            localStorage.setItem(this.storageKey, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    },

    updatePreference(key, value) {
        const current = this.getPreferences();
        if (current) {
            return this.savePreferences({ [key]: value });
        }
        return false;
    },

    resetToDefaults() {
        return this.savePreferences(this.defaults);
    },

    clearPreferences() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    }
};

UserPreferencesManager.initialize();const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
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

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : null;
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
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        getPreference: getPreference,
        setPreference: setPreference,
        subscribe: subscribe,
        constants: {
            THEMES: ['light', 'dark', 'auto'],
            LANGUAGES: ['en', 'es', 'fr', 'de']
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}