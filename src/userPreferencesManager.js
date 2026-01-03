const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true
    };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
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
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const prefs = loadPreferences();
        return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function getAllPreferences() {
        return loadPreferences();
    }

    function migrateOldPreferences(oldKey, migrationFn) {
        try {
            const oldData = localStorage.getItem(oldKey);
            if (oldData) {
                const migrated = migrationFn ? migrationFn(JSON.parse(oldData)) : JSON.parse(oldData);
                savePreferences(migrated);
                localStorage.removeItem(oldKey);
                return true;
            }
        } catch (error) {
            console.error('Migration failed:', error);
        }
        return false;
    }

    return {
        load: loadPreferences,
        save: savePreferences,
        reset: resetPreferences,
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        migrate: migrateOldPreferences,
        defaults: DEFAULT_PREFERENCES
    };
})();

export default userPreferencesManager;