const UserPreferencesManager = {
    storageKey: 'user_preferences',

    defaults: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    },

    initialize() {
        if (!this.getPreferences()) {
            this.savePreferences(this.defaults);
        }
    },

    getPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return null;
        }
    },

    savePreferences(preferences) {
        try {
            const current = this.getPreferences() || this.defaults;
            const merged = { ...current, ...preferences };
            localStorage.setItem(this.storageKey, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    },

    updatePreference(key, value) {
        const current = this.getPreferences();
        if (current) {
            return this.savePreferences({ [key]: value });
        }
        return false;
    },

    resetToDefaults() {
        return this.savePreferences(this.defaults);
    },

    clearPreferences() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    }
};

UserPreferencesManager.initialize();