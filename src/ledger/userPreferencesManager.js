const USER_PREFERENCES_KEY = 'app_preferences';

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
            autoSave: true,
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

const preferencesManager = new UserPreferencesManager();
export default preferencesManager;const UserPreferencesManager = (() => {
    const PREFIX = 'user_pref_';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const validateKey = (key) => {
        if (!key || typeof key !== 'string') {
            throw new Error('Key must be a non-empty string');
        }
        return true;
    };

    const validateValue = (value) => {
        if (value === undefined || value === null) {
            throw new Error('Value cannot be null or undefined');
        }
        return true;
    };

    const getStorageKey = (key) => `${PREFIX}${key}`;

    const get = (key) => {
        validateKey(key);
        const storageKey = getStorageKey(key);
        const storedValue = localStorage.getItem(storageKey);
        
        if (storedValue === null) {
            return DEFAULT_PREFERENCES[key] !== undefined ? DEFAULT_PREFERENCES[key] : null;
        }

        try {
            return JSON.parse(storedValue);
        } catch {
            return storedValue;
        }
    };

    const set = (key, value) => {
        validateKey(key);
        validateValue(value);
        
        const storageKey = getStorageKey(key);
        const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
        
        localStorage.setItem(storageKey, valueToStore);
        return true;
    };

    const remove = (key) => {
        validateKey(key);
        const storageKey = getStorageKey(key);
        localStorage.removeItem(storageKey);
        return true;
    };

    const clear = () => {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(PREFIX)) {
                keysToRemove.push(key);
            }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
        return keysToRemove.length;
    };

    const getAll = () => {
        const preferences = { ...DEFAULT_PREFERENCES };
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(PREFIX)) {
                const prefKey = key.replace(PREFIX, '');
                try {
                    preferences[prefKey] = JSON.parse(localStorage.getItem(key));
                } catch {
                    preferences[prefKey] = localStorage.getItem(key);
                }
            }
        }
        
        return preferences;
    };

    const resetToDefaults = () => {
        clear();
        Object.keys(DEFAULT_PREFERENCES).forEach(key => {
            set(key, DEFAULT_PREFERENCES[key]);
        });
        return getAll();
    };

    const has = (key) => {
        validateKey(key);
        const storageKey = getStorageKey(key);
        return localStorage.getItem(storageKey) !== null;
    };

    return {
        get,
        set,
        remove,
        clear,
        getAll,
        resetToDefaults,
        has,
        DEFAULT_PREFERENCES
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}