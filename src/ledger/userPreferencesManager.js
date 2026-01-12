const UserPreferences = {
    _prefs: {},

    init() {
        const stored = localStorage.getItem('userPrefs');
        this._prefs = stored ? JSON.parse(stored) : {};
    },

    set(key, value) {
        this._prefs[key] = value;
        this._save();
        return this;
    },

    get(key, defaultValue = null) {
        return this._prefs.hasOwnProperty(key) ? this._prefs[key] : defaultValue;
    },

    remove(key) {
        delete this._prefs[key];
        this._save();
        return this;
    },

    getAll() {
        return { ...this._prefs };
    },

    clear() {
        this._prefs = {};
        localStorage.removeItem('userPrefs');
        return this;
    },

    _save() {
        localStorage.setItem('userPrefs', JSON.stringify(this._prefs));
    }
};

UserPreferences.init();