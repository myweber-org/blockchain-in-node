const userPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        sidebarCollapsed: false
    };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    }

    function savePreferences(preferences) {
        try {
            const validPreferences = validatePreferences(preferences);
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(validPreferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function validatePreferences(preferences) {
        const validated = { ...defaultPreferences };
        
        Object.keys(preferences).forEach(key => {
            if (key in defaultPreferences) {
                const value = preferences[key];
                const defaultValue = defaultPreferences[key];
                
                if (typeof value === typeof defaultValue) {
                    validated[key] = value;
                }
            }
        });
        
        return validated;
    }

    function resetToDefaults() {
        return savePreferences(defaultPreferences);
    }

    function getPreference(key) {
        const preferences = loadPreferences();
        return preferences[key] ?? defaultPreferences[key];
    }

    function setPreference(key, value) {
        const preferences = loadPreferences();
        preferences[key] = value;
        return savePreferences(preferences);
    }

    function getAllPreferences() {
        return loadPreferences();
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === PREFERENCES_KEY) {
                callback(loadPreferences());
            }
        };

        return () => {
            localStorage.setItem = originalSetItem;
        };
    }

    return {
        load: loadPreferences,
        save: savePreferences,
        reset: resetToDefaults,
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}