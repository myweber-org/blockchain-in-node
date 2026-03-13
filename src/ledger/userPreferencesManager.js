const UserPreferencesManager = (function() {
    const PREF_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(PREF_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const prefs = getPreferences();
        prefs[key] = value;
        localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
        return prefs;
    }
    
    function removePreference(key) {
        const prefs = getPreferences();
        delete prefs[key];
        localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
        return prefs;
    }
    
    function clearPreferences() {
        localStorage.removeItem(PREF_KEY);
        return {};
    }
    
    function hasPreference(key) {
        const prefs = getPreferences();
        return key in prefs;
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        get: getPreferences,
        set: setPreference,
        remove: removePreference,
        clear: clearPreferences,
        has: hasPreference,
        all: getAllPreferences
    };
})();