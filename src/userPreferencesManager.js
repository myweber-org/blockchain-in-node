const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function validatePreferences(prefs) {
        const validThemes = ['light', 'dark', 'auto'];
        const validLanguages = ['en', 'es', 'fr', 'de'];
        
        if (!prefs || typeof prefs !== 'object') {
            return false;
        }

        if (prefs.theme && !validThemes.includes(prefs.theme)) {
            return false;
        }

        if (prefs.language && !validLanguages.includes(prefs.language)) {
            return false;
        }

        if (prefs.fontSize && (typeof prefs.fontSize !== 'number' || prefs.fontSize < 12 || prefs.fontSize > 24)) {
            return false;
        }

        if (prefs.notifications !== undefined && typeof prefs.notifications !== 'boolean') {
            return false;
        }

        if (prefs.autoSave !== undefined && typeof prefs.autoSave !== 'boolean') {
            return false;
        }

        return true;
    }

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                return { ...DEFAULT_PREFERENCES };
            }

            const parsed = JSON.parse(stored);
            if (!validatePreferences(parsed)) {
                console.warn('Invalid preferences found, using defaults');
                return { ...DEFAULT_PREFERENCES };
            }

            return { ...DEFAULT_PREFERENCES, ...parsed };
        } catch (error) {
            console.error('Error loading preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    }

    function savePreferences(preferences) {
        if (!validatePreferences(preferences)) {
            throw new Error('Invalid preferences provided');
        }

        const current = getPreferences();
        const merged = { ...current, ...preferences };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return false;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Error resetting preferences:', error);
            return false;
        }
    }

    function applyPreferences() {
        const prefs = getPreferences();
        
        document.documentElement.setAttribute('data-theme', prefs.theme);
        document.documentElement.lang = prefs.language;
        document.documentElement.style.fontSize = `${prefs.fontSize}px`;

        if (prefs.autoSave) {
            window.addEventListener('beforeunload', handleAutoSave);
        } else {
            window.removeEventListener('beforeunload', handleAutoSave);
        }

        return prefs;
    }

    function handleAutoSave(event) {
        const forms = document.querySelectorAll('form[data-autosave]');
        forms.forEach(form => {
            const formData = new FormData(form);
            const formState = Object.fromEntries(formData.entries());
            localStorage.setItem(`form_${form.id}_autosave`, JSON.stringify(formState));
        });
    }

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        apply: applyPreferences,
        validate: validatePreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}