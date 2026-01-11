function validatePreferences(preferences) {
    const allowedThemes = ['light', 'dark', 'auto'];
    const allowedLanguages = ['en', 'es', 'fr', 'de'];
    
    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }
    
    if (preferences.theme && !allowedThemes.includes(preferences.theme)) {
        throw new Error(`Theme must be one of: ${allowedThemes.join(', ')}`);
    }
    
    if (preferences.language && !allowedLanguages.includes(preferences.language)) {
        throw new Error(`Language must be one of: ${allowedLanguages.join(', ')}`);
    }
    
    if (preferences.fontSize && (typeof preferences.fontSize !== 'number' || preferences.fontSize < 8 || preferences.fontSize > 72)) {
        throw new Error('Font size must be a number between 8 and 72');
    }
    
    return true;
}

function savePreferences(preferences) {
    try {
        validatePreferences(preferences);
        const currentPrefs = loadPreferences();
        const mergedPrefs = { ...currentPrefs, ...preferences };
        localStorage.setItem('userPreferences', JSON.stringify(mergedPrefs));
        return mergedPrefs;
    } catch (error) {
        console.error('Failed to save preferences:', error.message);
        throw error;
    }
}

function loadPreferences() {
    try {
        const stored = localStorage.getItem('userPreferences');
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Failed to load preferences:', error.message);
        return {};
    }
}

function resetPreferences() {
    localStorage.removeItem('userPreferences');
    return {};
}

function applyPreferences() {
    const prefs = loadPreferences();
    
    if (prefs.theme) {
        document.documentElement.setAttribute('data-theme', prefs.theme);
    }
    
    if (prefs.fontSize) {
        document.documentElement.style.fontSize = `${prefs.fontSize}px`;
    }
    
    if (prefs.language) {
        document.documentElement.lang = prefs.language;
    }
    
    return prefs;
}

export { validatePreferences, savePreferences, loadPreferences, resetPreferences, applyPreferences };