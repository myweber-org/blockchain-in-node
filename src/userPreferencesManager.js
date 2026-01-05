const userPreferencesManager = {
    preferences: {
        theme: 'light',
        language: 'en',
        fontSize: 16,
        notifications: true
    },

    init: function() {
        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
            this.preferences = JSON.parse(savedPreferences);
        }
        this.applyPreferences();
    },

    savePreferences: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
        this.applyPreferences();
    },

    applyPreferences: function() {
        document.documentElement.setAttribute('data-theme', this.preferences.theme);
        document.documentElement.lang = this.preferences.language;
        document.body.style.fontSize = this.preferences.fontSize + 'px';
        
        const notificationElement = document.getElementById('notifications');
        if (notificationElement) {
            notificationElement.style.display = this.preferences.notifications ? 'block' : 'none';
        }
    },

    updatePreference: function(key, value) {
        if (this.preferences.hasOwnProperty(key)) {
            this.preferences[key] = value;
            this.savePreferences();
            return true;
        }
        return false;
    },

    getPreference: function(key) {
        return this.preferences[key] || null;
    },

    resetPreferences: function() {
        this.preferences = {
            theme: 'light',
            language: 'en',
            fontSize: 16,
            notifications: true
        };
        this.savePreferences();
    },

    exportPreferences: function() {
        const dataStr = JSON.stringify(this.preferences, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        return URL.createObjectURL(dataBlob);
    },

    importPreferences: function(jsonString) {
        try {
            const importedPrefs = JSON.parse(jsonString);
            Object.keys(importedPrefs).forEach(key => {
                if (this.preferences.hasOwnProperty(key)) {
                    this.preferences[key] = importedPrefs[key];
                }
            });
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Invalid preferences format:', error);
            return false;
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    userPreferencesManager.init();
    
    const themeToggle = document.getElementById('themeToggle');
    const languageSelect = document.getElementById('languageSelect');
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const notificationsToggle = document.getElementById('notificationsToggle');
    
    if (themeToggle) {
        themeToggle.value = userPreferencesManager.getPreference('theme');
        themeToggle.addEventListener('change', function(e) {
            userPreferencesManager.updatePreference('theme', e.target.value);
        });
    }
    
    if (languageSelect) {
        languageSelect.value = userPreferencesManager.getPreference('language');
        languageSelect.addEventListener('change', function(e) {
            userPreferencesManager.updatePreference('language', e.target.value);
        });
    }
    
    if (fontSizeSlider) {
        fontSizeSlider.value = userPreferencesManager.getPreference('fontSize');
        fontSizeSlider.addEventListener('input', function(e) {
            userPreferencesManager.updatePreference('fontSize', parseInt(e.target.value));
        });
    }
    
    if (notificationsToggle) {
        notificationsToggle.checked = userPreferencesManager.getPreference('notifications');
        notificationsToggle.addEventListener('change', function(e) {
            userPreferencesManager.updatePreference('notifications', e.target.checked);
        });
    }
});