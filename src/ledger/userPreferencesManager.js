const UserPreferencesManager = (() => {
    const PREFIX = 'user_pref_';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false,
        sidebarCollapsed: false
    };

    const validateKey = (key) => {
        if (!key || typeof key !== 'string') {
            throw new Error('Invalid preference key');
        }
        return key;
    };

    const getStorageKey = (key) => `${PREFIX}${key}`;

    const getAllPreferences = () => {
        try {
            const stored = localStorage.getItem(PREFIX + 'all');
            if (stored) {
                return JSON.parse(stored);
            }
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.warn('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    };

    const saveAllPreferences = (prefs) => {
        try {
            localStorage.setItem(PREFIX + 'all', JSON.stringify(prefs));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const setPreference = (key, value) => {
        validateKey(key);
        const allPrefs = getAllPreferences();
        allPrefs[key] = value;
        return saveAllPreferences(allPrefs);
    };

    const getPreference = (key) => {
        validateKey(key);
        const allPrefs = getAllPreferences();
        return allPrefs[key] !== undefined ? allPrefs[key] : DEFAULT_PREFERENCES[key];
    };

    const resetPreference = (key) => {
        validateKey(key);
        if (DEFAULT_PREFERENCES[key] !== undefined) {
            return setPreference(key, DEFAULT_PREFERENCES[key]);
        }
        return false;
    };

    const resetAllPreferences = () => {
        return saveAllPreferences({ ...DEFAULT_PREFERENCES });
    };

    const exportPreferences = () => {
        return JSON.stringify(getAllPreferences(), null, 2);
    };

    const importPreferences = (jsonString) => {
        try {
            const imported = JSON.parse(jsonString);
            const merged = { ...DEFAULT_PREFERENCES, ...imported };
            return saveAllPreferences(merged);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    };

    const subscribe = (callback) => {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const handler = (event) => {
            if (event.key && event.key.startsWith(PREFIX)) {
                callback(getAllPreferences());
            }
        };

        window.addEventListener('storage', handler);
        
        return () => {
            window.removeEventListener('storage', handler);
        };
    };

    return {
        set: setPreference,
        get: getPreference,
        reset: resetPreference,
        resetAll: resetAllPreferences,
        export: exportPreferences,
        import: importPreferences,
        subscribe,
        defaults: { ...DEFAULT_PREFERENCES }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}