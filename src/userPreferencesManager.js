const UserPreferencesManager = (function() {
    const PREFIX = 'user_pref_';
    
    const getKey = (key) => `${PREFIX}${key}`;
    
    return {
        setPreference: function(key, value) {
            try {
                const serialized = JSON.stringify(value);
                localStorage.setItem(getKey(key), serialized);
                return true;
            } catch (error) {
                console.error('Failed to save preference:', error);
                return false;
            }
        },
        
        getPreference: function(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(getKey(key));
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('Failed to retrieve preference:', error);
                return defaultValue;
            }
        },
        
        removePreference: function(key) {
            try {
                localStorage.removeItem(getKey(key));
                return true;
            } catch (error) {
                console.error('Failed to remove preference:', error);
                return false;
            }
        },
        
        clearAllPreferences: function() {
            try {
                const keysToRemove = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key.startsWith(PREFIX)) {
                        keysToRemove.push(key);
                    }
                }
                
                keysToRemove.forEach(key => localStorage.removeItem(key));
                return true;
            } catch (error) {
                console.error('Failed to clear preferences:', error);
                return false;
            }
        },
        
        getAllPreferences: function() {
            const preferences = {};
            try {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key.startsWith(PREFIX)) {
                        const prefKey = key.replace(PREFIX, '');
                        preferences[prefKey] = this.getPreference(prefKey);
                    }
                }
            } catch (error) {
                console.error('Failed to retrieve all preferences:', error);
            }
            return preferences;
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}