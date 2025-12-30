const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    const loadPreferences = () => {
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
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const updatePreference = (key, value) => {
        if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
        const current = loadPreferences();
        const updated = { ...current, [key]: value };
        return savePreferences(updated);
    };

    const resetToDefaults = () => {
        return savePreferences(DEFAULT_PREFERENCES);
    };

    const getPreference = (key) => {
        const prefs = loadPreferences();
        return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    return {
        get: getPreference,
        set: updatePreference,
        getAll: getAllPreferences,
        reset: resetToDefaults,
        defaults: DEFAULT_PREFERENCES
    };
})();

export default UserPreferencesManager;