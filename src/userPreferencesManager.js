const UserPreferences = {
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

UserPreferences.init();