class UserPreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
        this.defaults = {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16
        };
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem('userPreferences');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return {};
        }
    }

    savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    getPreference(key) {
        return this.preferences[key] !== undefined ? this.preferences[key] : this.defaults[key];
    }

    setPreference(key, value) {
        if (this.defaults[key] !== undefined) {
            this.preferences[key] = value;
            return this.savePreferences();
        }
        return false;
    }

    resetPreference(key) {
        if (this.defaults[key] !== undefined) {
            delete this.preferences[key];
            return this.savePreferences();
        }
        return false;
    }

    getAllPreferences() {
        return { ...this.defaults, ...this.preferences };
    }

    clearAllPreferences() {
        this.preferences = {};
        return this.savePreferences();
    }
}

const preferenceManager = new UserPreferencesManager();