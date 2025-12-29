const UserPreferences = {
    preferences: {},

    init: function() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            this.preferences = JSON.parse(stored);
        }
    },

    setPreference: function(key, value) {
        this.preferences[key] = value;
        this.save();
    },

    getPreference: function(key, defaultValue = null) {
        return this.preferences[key] || defaultValue;
    },

    removePreference: function(key) {
        delete this.preferences[key];
        this.save();
    },

    save: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    },

    clearAll: function() {
        this.preferences = {};
        localStorage.removeItem('userPreferences');
    }
};

UserPreferences.init();const USER_PREFERENCES_KEY = 'app_preferences';

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
            language: 'en',
            notifications: true,
            fontSize: 16,
            autoSave: false,
            lastUpdated: new Date().toISOString()
        };
    }

    updatePreference(key, value) {
        if (key in this.preferences) {
            this.preferences[key] = value;
            this.preferences.lastUpdated = new Date().toISOString();
            this.savePreferences();
            return true;
        }
        return false;
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

    getPreference(key) {
        return this.preferences[key];
    }

    getAllPreferences() {
        return { ...this.preferences };
    }

    resetToDefaults() {
        this.preferences = this.getDefaultPreferences();
        this.savePreferences();
    }

    exportPreferences() {
        return JSON.stringify(this.preferences, null, 2);
    }

    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.preferences = { ...this.getDefaultPreferences(), ...imported };
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }
}

const preferencesManager = new UserPreferencesManager();const UserPreferences = {
    preferences: {},

    init() {
        this.loadPreferences();
        return this;
    },

    loadPreferences() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            try {
                this.preferences = JSON.parse(stored);
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
                this.preferences = {};
            }
        }
    },

    savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    },

    setPreference(key, value) {
        if (typeof key !== 'string' || key.trim() === '') {
            throw new Error('Preference key must be a non-empty string');
        }
        this.preferences[key] = value;
        return this.savePreferences();
    },

    getPreference(key, defaultValue = null) {
        return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
    },

    removePreference(key) {
        if (this.preferences.hasOwnProperty(key)) {
            delete this.preferences[key];
            return this.savePreferences();
        }
        return false;
    },

    clearAllPreferences() {
        this.preferences = {};
        localStorage.removeItem('userPreferences');
        return true;
    },

    getAllPreferences() {
        return { ...this.preferences };
    }
};

export default UserPreferences.init();