const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };
    
    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...defaultPreferences };
        }
    }
    
    function savePreferences(preferences) {
        try {
            const current = loadPreferences();
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
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }
    
    function getPreference(key) {
        const prefs = loadPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }
    
    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }
    
    function getAllPreferences() {
        return loadPreferences();
    }
    
    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === STORAGE_KEY) {
                callback(loadPreferences());
            }
        });
    }
    
    return {
        load: loadPreferences,
        save: savePreferences,
        reset: resetPreferences,
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        subscribe: subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    let currentPreferences = { ...DEFAULT_PREFERENCES };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                currentPreferences = { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences from storage:', error);
        }
        return currentPreferences;
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
        return currentPreferences[key] !== undefined 
            ? currentPreferences[key] 
            : DEFAULT_PREFERENCES[key];
    };

    const getAllPreferences = () => {
        return { ...currentPreferences };
    };

    const validatePreference = (key, value) => {
        switch(key) {
            case 'theme':
                return ['light', 'dark', 'auto'].includes(value);
            case 'fontSize':
                return Number.isInteger(value) && value >= 12 && value <= 24;
            case 'notifications':
            case 'autoSave':
                return typeof value === 'boolean';
            case 'language':
                return ['en', 'es', 'fr', 'de'].includes(value);
            default:
                return false;
        }
    };

    loadPreferences();

    return {
        save: savePreferences,
        load: loadPreferences,
        reset: resetPreferences,
        get: getPreference,
        getAll: getAllPreferences,
        validate: validatePreference,
        defaults: { ...DEFAULT_PREFERENCES }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}