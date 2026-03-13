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
        const stored = localStorage.getItem('userPreferences');
        return stored ? JSON.parse(stored) : {};
    }

    savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    }

    getPreference(key) {
        return this.preferences[key] !== undefined ? this.preferences[key] : this.defaults[key];
    }

    setPreference(key, value) {
        if (this.defaults.hasOwnProperty(key)) {
            this.preferences[key] = value;
            this.savePreferences();
            this.dispatchChangeEvent(key, value);
            return true;
        }
        return false;
    }

    resetPreference(key) {
        if (this.preferences.hasOwnProperty(key)) {
            delete this.preferences[key];
            this.savePreferences();
            this.dispatchChangeEvent(key, this.defaults[key]);
            return true;
        }
        return false;
    }

    resetAllPreferences() {
        this.preferences = {};
        this.savePreferences();
        this.dispatchChangeEvent('all', null);
    }

    dispatchChangeEvent(key, value) {
        const event = new CustomEvent('preferenceChanged', {
            detail: { key, value }
        });
        window.dispatchEvent(event);
    }

    getAllPreferences() {
        return {
            ...this.defaults,
            ...this.preferences
        };
    }
}

const userPrefs = new UserPreferencesManager();
window.userPreferences = userPrefs;