const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false,
        lastUpdated: null
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...defaultPreferences, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    }

    function savePreferences(preferences) {
        try {
            const updated = {
                ...preferences,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function updatePreference(key, value) {
        const current = getPreferences();
        if (key in defaultPreferences) {
            current[key] = value;
            return savePreferences(current);
        }
        return false;
    }

    function resetToDefaults() {
        return savePreferences(defaultPreferences);
    }

    function exportPreferences() {
        const prefs = getPreferences();
        const dataStr = JSON.stringify(prefs, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        return dataUri;
    }

    function importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            const validated = {};
            
            Object.keys(defaultPreferences).forEach(key => {
                if (key in imported) {
                    validated[key] = imported[key];
                }
            });
            
            return savePreferences(validated);
        } catch (error) {
            console.error('Invalid preferences format:', error);
            return false;
        }
    }

    return {
        get: getPreferences,
        save: savePreferences,
        update: updatePreference,
        reset: resetToDefaults,
        export: exportPreferences,
        import: importPreferences
    };
})();