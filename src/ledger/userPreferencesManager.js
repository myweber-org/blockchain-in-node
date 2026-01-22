const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false,
        sidebarCollapsed: false
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...DEFAULT_PREFERENCES };
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
        
        if (savePreferences(updated)) {
            dispatchPreferenceChange(key, value);
            return true;
        }
        return false;
    };

    const resetPreferences = () => {
        if (savePreferences(DEFAULT_PREFERENCES)) {
            Object.keys(DEFAULT_PREFERENCES).forEach(key => {
                dispatchPreferenceChange(key, DEFAULT_PREFERENCES[key]);
            });
            return true;
        }
        return false;
    };

    const dispatchPreferenceChange = (key, value) => {
        const event = new CustomEvent('preferencechange', {
            detail: { key, value }
        });
        window.dispatchEvent(event);
    };

    const getPreference = (key) => {
        const prefs = loadPreferences();
        return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    const exportPreferences = () => {
        const prefs = loadPreferences();
        return JSON.stringify(prefs, null, 2);
    };

    const importPreferences = (jsonString) => {
        try {
            const imported = JSON.parse(jsonString);
            const validated = {};
            
            Object.keys(DEFAULT_PREFERENCES).forEach(key => {
                if (imported.hasOwnProperty(key)) {
                    validated[key] = imported[key];
                } else {
                    validated[key] = DEFAULT_PREFERENCES[key];
                }
            });

            if (savePreferences(validated)) {
                Object.keys(validated).forEach(key => {
                    dispatchPreferenceChange(key, validated[key]);
                });
                return true;
            }
        } catch (error) {
            console.error('Failed to import preferences:', error);
        }
        return false;
    };

    return {
        get: getPreference,
        getAll: getAllPreferences,
        set: updatePreference,
        reset: resetPreferences,
        export: exportPreferences,
        import: importPreferences,
        subscribe: (callback) => {
            window.addEventListener('preferencechange', (e) => {
                callback(e.detail.key, e.detail.value);
            });
        },
        unsubscribe: (callback) => {
            window.removeEventListener('preferencechange', (e) => {
                callback(e.detail.key, e.detail.value);
            });
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}