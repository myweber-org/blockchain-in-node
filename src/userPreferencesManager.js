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

UserPreferences.init();const UserPreferences = {
    preferences: {},

    init() {
        this.loadPreferences();
        this.setupEventListeners();
    },

    loadPreferences() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            try {
                this.preferences = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                this.preferences = this.getDefaultPreferences();
            }
        } else {
            this.preferences = this.getDefaultPreferences();
        }
        this.applyPreferences();
    },

    getDefaultPreferences() {
        return {
            theme: 'light',
            fontSize: 16,
            notifications: true,
            language: 'en',
            autoSave: true,
            sidebarCollapsed: false
        };
    },

    savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
            this.dispatchEvent('preferencesUpdated', this.preferences);
            return true;
        } catch (e) {
            console.error('Failed to save preferences:', e);
            return false;
        }
    },

    updatePreference(key, value) {
        if (key in this.preferences) {
            this.preferences[key] = value;
            this.applyPreference(key, value);
            return this.savePreferences();
        }
        return false;
    },

    applyPreferences() {
        Object.entries(this.preferences).forEach(([key, value]) => {
            this.applyPreference(key, value);
        });
    },

    applyPreference(key, value) {
        switch (key) {
            case 'theme':
                document.documentElement.setAttribute('data-theme', value);
                break;
            case 'fontSize':
                document.documentElement.style.fontSize = `${value}px`;
                break;
            case 'sidebarCollapsed':
                const sidebar = document.getElementById('sidebar');
                if (sidebar) {
                    sidebar.classList.toggle('collapsed', value);
                }
                break;
        }
    },

    getPreference(key) {
        return this.preferences[key];
    },

    resetToDefaults() {
        this.preferences = this.getDefaultPreferences();
        this.applyPreferences();
        return this.savePreferences();
    },

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const themeToggle = document.getElementById('themeToggle');
            const fontSizeSlider = document.getElementById('fontSizeSlider');
            const resetBtn = document.getElementById('resetPreferences');

            if (themeToggle) {
                themeToggle.addEventListener('change', (e) => {
                    this.updatePreference('theme', e.target.checked ? 'dark' : 'light');
                });
            }

            if (fontSizeSlider) {
                fontSizeSlider.addEventListener('input', (e) => {
                    this.updatePreference('fontSize', parseInt(e.target.value));
                });
            }

            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    if (confirm('Reset all preferences to default?')) {
                        this.resetToDefaults();
                    }
                });
            }
        });
    },

    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferences;
} else {
    window.UserPreferences = UserPreferences;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UserPreferences.init());
} else {
    UserPreferences.init();
}