class UserPreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
    }

    setPreference(key, value) {
        this.preferences[key] = value;
        this.savePreferences();
        return this;
    }

    getPreference(key, defaultValue = null) {
        return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
    }

    removePreference(key) {
        delete this.preferences[key];
        this.savePreferences();
        return this;
    }

    clearAllPreferences() {
        this.preferences = {};
        this.savePreferences();
        return this;
    }

    getAllPreferences() {
        return { ...this.preferences };
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
        } catch (error) {
            console.error('Failed to save preferences:', error);
        }
    }
}

const userPrefs = new UserPreferencesManager();