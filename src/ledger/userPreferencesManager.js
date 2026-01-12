const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    this.setupListeners();
  },

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse preferences:', e);
        this.preferences = {};
      }
    }
  },

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  },

  getPreference(key, defaultValue = null) {
    return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    this.savePreferences();
    this.dispatchChangeEvent(key, value);
  },

  removePreference(key) {
    delete this.preferences[key];
    this.savePreferences();
  },

  clearAll() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
  },

  dispatchChangeEvent(key, value) {
    const event = new CustomEvent('preferenceChanged', {
      detail: { key, value }
    });
    window.dispatchEvent(event);
  },

  setupListeners() {
    window.addEventListener('storage', (e) => {
      if (e.key === 'userPreferences') {
        this.loadPreferences();
      }
    });
  }
};

UserPreferences.init();