const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function savePreferences(preferences) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        savePreferences(preferences);
        return preferences;
    }
    
    function getPreference(key, defaultValue = null) {
        const preferences = getPreferences();
        return preferences.hasOwnProperty(key) ? preferences[key] : defaultValue;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        if (preferences.hasOwnProperty(key)) {
            delete preferences[key];
            savePreferences(preferences);
        }
        return preferences;
    }
    
    function clearAllPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return {};
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        set: setPreference,
        get: getPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        getAll: getAllPreferences
    };
})();

// Example usage
// UserPreferencesManager.set('theme', 'dark');
// UserPreferencesManager.set('language', 'en');
// console.log(UserPreferencesManager.get('theme')); // 'dark'
// console.log(UserPreferencesManager.getAll()); // {theme: 'dark', language: 'en'}