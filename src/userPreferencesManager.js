const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
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
            console.warn('Failed to load preferences:', error);
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
        const validators = {
            theme: (v) => ['light', 'dark', 'auto'].includes(v),
            fontSize: (v) => Number.isInteger(v) && v >= 8 && v <= 32,
            notifications: (v) => typeof v === 'boolean',
            language: (v) => ['en', 'es', 'fr', 'de'].includes(v),
            autoSave: (v) => typeof v === 'boolean'
        };
        
        return validators[key] ? validators[key](value) : false;
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

export default UserPreferencesManager;