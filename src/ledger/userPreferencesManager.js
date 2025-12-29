const UserPreferencesManager = {
    storageKey: 'user_preferences_v1',

    defaultPreferences: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        sidebarCollapsed: false
    },

    getPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...this.defaultPreferences, ...parsed };
            }
            return { ...this.defaultPreferences };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return { ...this.defaultPreferences };
        }
    },

    savePreferences(preferences) {
        try {
            const current = this.getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(this.storageKey, JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    },

    resetToDefaults() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.defaultPreferences));
            return true;
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return false;
        }
    },

    getPreference(key) {
        const prefs = this.getPreferences();
        return prefs[key] !== undefined ? prefs[key] : this.defaultPreferences[key];
    },

    setPreference(key, value) {
        return this.savePreferences({ [key]: value });
    },

    clearAll() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    },

    exportPreferences() {
        const prefs = this.getPreferences();
        return JSON.stringify(prefs, null, 2);
    },

    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            return this.savePreferences(imported);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }
};

export default UserPreferencesManager;