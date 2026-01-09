class UserPreferencesManager {
    constructor() {
        this.prefs = this.loadPreferences();
    }

    setPreference(key, value) {
        this.prefs[key] = value;
        this.savePreferences();
        return this;
    }

    getPreference(key, defaultValue = null) {
        return this.prefs[key] !== undefined ? this.prefs[key] : defaultValue;
    }

    removePreference(key) {
        delete this.prefs[key];
        this.savePreferences();
        return this;
    }

    clearAllPreferences() {
        this.prefs = {};
        this.savePreferences();
        return this;
    }

    getAllPreferences() {
        return { ...this.prefs };
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem('userPreferences');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.warn('Failed to load preferences:', error);
            return {};
        }
    }

    savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
        } catch (error) {
            console.warn('Failed to save preferences:', error);
        }
    }
}

const preferences = new UserPreferencesManager();