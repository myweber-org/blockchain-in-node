const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true,
        sidebarCollapsed: false
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
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

    const resetPreferences = () => {
        localStorage.removeItem(STORAGE_KEY);
        return { ...defaultPreferences };
    };

    const validatePreference = (key, value) => {
        const validators = {
            theme: (v) => ['light', 'dark', 'auto'].includes(v),
            fontSize: (v) => Number.isInteger(v) && v >= 12 && v <= 24,
            notifications: (v) => typeof v === 'boolean',
            language: (v) => ['en', 'es', 'fr', 'de'].includes(v),
            autoSave: (v) => typeof v === 'boolean',
            sidebarCollapsed: (v) => typeof v === 'boolean'
        };
        
        return validators[key] ? validators[key](value) : false;
    };

    return {
        getPreferences: () => loadPreferences(),
        
        getPreference: (key) => {
            const prefs = loadPreferences();
            return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
        },
        
        setPreference: (key, value) => {
            if (!validatePreference(key, value)) {
                throw new Error(`Invalid value for preference "${key}"`);
            }
            
            const prefs = loadPreferences();
            prefs[key] = value;
            return savePreferences(prefs);
        },
        
        setMultiplePreferences: (updates) => {
            const prefs = loadPreferences();
            
            for (const [key, value] of Object.entries(updates)) {
                if (validatePreference(key, value)) {
                    prefs[key] = value;
                }
            }
            
            return savePreferences(prefs);
        },
        
        resetToDefaults: () => {
            return savePreferences(defaultPreferences);
        },
        
        clearAll: () => {
            return resetPreferences();
        },
        
        exportPreferences: () => {
            const prefs = loadPreferences();
            return JSON.stringify(prefs, null, 2);
        },
        
        importPreferences: (jsonString) => {
            try {
                const imported = JSON.parse(jsonString);
                return savePreferences({ ...defaultPreferences, ...imported });
            } catch (error) {
                throw new Error('Invalid preferences format');
            }
        },
        
        subscribe: (callback) => {
            const handler = (event) => {
                if (event.key === STORAGE_KEY) {
                    callback(loadPreferences());
                }
            };
            window.addEventListener('storage', handler);
            
            return () => window.removeEventListener('storage', handler);
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}