const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        return true;
    }
    
    function getPreference(key, defaultValue = null) {
        const preferences = getPreferences();
        return preferences.hasOwnProperty(key) ? preferences[key] : defaultValue;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        if (preferences.hasOwnProperty(key)) {
            delete preferences[key];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        }
        return false;
    }
    
    function clearAllPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        get: getPreference,
        set: setPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        getAll: getAllPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = {
    preferences: {},

    init: function() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            this.preferences = JSON.parse(stored);
        }
    },

    setPreference: function(key, value) {
        this.preferences[key] = value;
        this.save();
    },

    getPreference: function(key, defaultValue = null) {
        return this.preferences[key] || defaultValue;
    },

    removePreference: function(key) {
        delete this.preferences[key];
        this.save();
    },

    save: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    },

    clearAll: function() {
        this.preferences = {};
        localStorage.removeItem('userPreferences');
    }
};

UserPreferencesManager.init();