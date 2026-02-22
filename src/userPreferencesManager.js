const UserPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true,
        sidebarCollapsed: false
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...defaultPreferences, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    };

    const savePreferences = (preferences) => {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    };

    const resetToDefaults = () => {
        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(defaultPreferences));
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const subscribe = (callback) => {
        const handleStorageChange = (event) => {
            if (event.key === PREFERENCES_KEY) {
                callback(getPreferences());
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    };

    const exportPreferences = () => {
        const prefs = getPreferences();
        const dataStr = JSON.stringify(prefs, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        return dataUri;
    };

    const importPreferences = (jsonString) => {
        try {
            const imported = JSON.parse(jsonString);
            return savePreferences(imported);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return null;
        }
    };

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetToDefaults,
        subscribe,
        export: exportPreferences,
        import: importPreferences,
        defaults: { ...defaultPreferences }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}