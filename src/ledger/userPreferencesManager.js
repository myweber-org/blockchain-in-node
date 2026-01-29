const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    let currentPreferences = { ...defaultPreferences };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                currentPreferences = { ...defaultPreferences, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return currentPreferences;
    };

    const savePreferences = (updates) => {
        currentPreferences = { ...currentPreferences, ...updates };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetPreferences = () => {
        currentPreferences = { ...defaultPreferences };
        localStorage.removeItem(STORAGE_KEY);
        return currentPreferences;
    };

    const getPreference = (key) => {
        return currentPreferences[key] !== undefined 
            ? currentPreferences[key] 
            : defaultPreferences[key];
    };

    const getAllPreferences = () => {
        return { ...currentPreferences };
    };

    const validatePreference = (key, value) => {
        const validators = {
            theme: (v) => ['light', 'dark', 'auto'].includes(v),
            language: (v) => ['en', 'es', 'fr', 'de'].includes(v),
            notifications: (v) => typeof v === 'boolean',
            fontSize: (v) => Number.isInteger(v) && v >= 12 && v <= 24,
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
        validate: validatePreference
    };
})();

export default UserPreferencesManager;