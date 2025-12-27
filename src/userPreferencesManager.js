const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        timezone: 'UTC'
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
                return defaultPreferences;
            }
        }
        return defaultPreferences;
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
        return defaultPreferences;
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : null;
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

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
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        getPreference,
        setPreference,
        subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}