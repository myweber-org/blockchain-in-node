const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    let currentPreferences = { ...DEFAULT_PREFERENCES };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                currentPreferences = { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
        return currentPreferences;
    }

    function savePreferences() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function updatePreferences(newPreferences) {
        currentPreferences = { ...currentPreferences, ...newPreferences };
        const success = savePreferences();
        if (success) {
            dispatchPreferenceChangeEvent();
        }
        return success;
    }

    function resetPreferences() {
        currentPreferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        dispatchPreferenceChangeEvent();
    }

    function dispatchPreferenceChangeEvent() {
        const event = new CustomEvent('preferencesChanged', {
            detail: { preferences: currentPreferences }
        });
        window.dispatchEvent(event);
    }

    function getPreference(key) {
        return currentPreferences[key];
    }

    function getAllPreferences() {
        return { ...currentPreferences };
    }

    loadPreferences();

    return {
        update: updatePreferences,
        reset: resetPreferences,
        get: getPreference,
        getAll: getAllPreferences,
        load: loadPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}