const UserPreferencesManager = {
    storageKey: 'app_user_preferences',

    defaults: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    },

    getPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? { ...this.defaults, ...JSON.parse(stored) } : { ...this.defaults };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
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

    hasSavedPreferences() {
        return localStorage.getItem(this.storageKey) !== null;
    }
};

export default UserPreferencesManager;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
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
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...DEFAULT_PREFERENCES };
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
            localStorage.removeItem(STORAGE_KEY);
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === STORAGE_KEY) {
                callback(getPreferences());
            }
        };
        return function unsubscribe() {
            localStorage.setItem = originalSetItem;
        };
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe,
        defaults: DEFAULT_PREFERENCES
    };
})();const userPreferencesManager = {
    preferences: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 'medium'
    },

    init: function() {
        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
            this.preferences = JSON.parse(savedPreferences);
        }
        return this.preferences;
    },

    updatePreference: function(key, value) {
        if (this.preferences.hasOwnProperty(key)) {
            this.preferences[key] = value;
            this.savePreferences();
            return true;
        }
        return false;
    },

    getPreference: function(key) {
        return this.preferences[key] || null;
    },

    getAllPreferences: function() {
        return {...this.preferences};
    },

    resetPreferences: function() {
        this.preferences = {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 'medium'
        };
        this.savePreferences();
    },

    savePreferences: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    },

    exportPreferences: function() {
        return JSON.stringify(this.preferences, null, 2);
    },

    importPreferences: function(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.preferences = {...this.preferences, ...imported};
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Invalid preferences format:', error);
            return false;
        }
    }
};

export default userPreferencesManager;