const UserPreferences = {
    storageKey: 'app_preferences',

    defaults: {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en'
    },

    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : { ...this.defaults };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...this.defaults };
        }
    },

    save(preferences) {
        try {
            const merged = { ...this.defaults, ...preferences };
            localStorage.setItem(this.storageKey, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    },

    update(key, value) {
        const current = this.load();
        const updated = { ...current, [key]: value };
        return this.save(updated);
    },

    reset() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return false;
        }
    },

    getAll() {
        return this.load();
    },

    get(key) {
        const prefs = this.load();
        return prefs[key] !== undefined ? prefs[key] : this.defaults[key];
    }
};

export default UserPreferences;