const UserPreferences = {
  _prefs: {},

  init() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      this._prefs = JSON.parse(stored);
    }
  },

  set(key, value) {
    this._prefs[key] = value;
    this._save();
  },

  get(key, defaultValue = null) {
    return this._prefs[key] !== undefined ? this._prefs[key] : defaultValue;
  },

  remove(key) {
    delete this._prefs[key];
    this._save();
  },

  clear() {
    this._prefs = {};
    localStorage.removeItem('userPreferences');
  },

  getAll() {
    return { ...this._prefs };
  },

  _save() {
    localStorage.setItem('userPreferences', JSON.stringify(this._prefs));
  }
};

UserPreferences.init();