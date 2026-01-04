const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        return true;
    }
    
    function getPreference(key, defaultValue = null) {
        const preferences = getPreferences();
        return preferences.hasOwnProperty(key) ? preferences[key] : defaultValue;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        if (preferences.hasOwnProperty(key)) {
            delete preferences[key];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        }
        return false;
    }
    
    function clearAllPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        set: setPreference,
        get: getPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        getAll: getAllPreferences
    };
})();const UserPreferencesManager = (function() {
    const PREFIX = 'app_pref_';
    
    function setPreference(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(PREFIX + key, serialized);
            return true;
        } catch (error) {
            console.error('Failed to save preference:', error);
            return false;
        }
    }
    
    function getPreference(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(PREFIX + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Failed to retrieve preference:', error);
            return defaultValue;
        }
    }
    
    function removePreference(key) {
        localStorage.removeItem(PREFIX + key);
    }
    
    function clearAllPreferences() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(PREFIX)) {
                localStorage.removeItem(key);
            }
        });
    }
    
    function getAllPreferences() {
        const preferences = {};
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(PREFIX)) {
                const prefKey = key.replace(PREFIX, '');
                preferences[prefKey] = getPreference(prefKey);
            }
        });
        return preferences;
    }
    
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
        autoSave: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {...defaultPreferences};
    }

    function updatePreferences(newPreferences) {
        const current = getPreferences();
        const updated = {...current, ...newPreferences};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        dispatchChangeEvent(updated);
        return updated;
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        dispatchChangeEvent({...defaultPreferences});
        return {...defaultPreferences};
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function dispatchChangeEvent(preferences) {
        const event = new CustomEvent('preferencesChanged', {
            detail: { preferences }
        });
        window.dispatchEvent(event);
    }

    function subscribe(callback) {
        window.addEventListener('preferencesChanged', (e) => callback(e.detail.preferences));
        return () => window.removeEventListener('preferencesChanged', callback);
    }

    return {
        get: getPreference,
        getAll: getPreferences,
        update: updatePreferences,
        reset: resetPreferences,
        subscribe: subscribe,
        default: defaultPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}