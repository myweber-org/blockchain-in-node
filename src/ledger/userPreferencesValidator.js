function validateUserPreferences(preferences) {
    const allowedThemes = ['light', 'dark', 'auto'];
    const allowedLanguages = ['en', 'es', 'fr', 'de'];
    const maxFontSize = 24;
    const minFontSize = 10;

    if (!preferences || typeof preferences !== 'object') {
        return { valid: false, error: 'Preferences must be an object' };
    }

    if (preferences.theme && !allowedThemes.includes(preferences.theme)) {
        return { valid: false, error: `Theme must be one of: ${allowedThemes.join(', ')}` };
    }

    if (preferences.language && !allowedLanguages.includes(preferences.language)) {
        return { valid: false, error: `Language must be one of: ${allowedLanguages.join(', ')}` };
    }

    if (preferences.fontSize !== undefined) {
        const fontSize = Number(preferences.fontSize);
        if (isNaN(fontSize) || fontSize < minFontSize || fontSize > maxFontSize) {
            return { valid: false, error: `Font size must be between ${minFontSize} and ${maxFontSize}` };
        }
    }

    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        return { valid: false, error: 'Notifications must be a boolean value' };
    }

    return { valid: true, data: preferences };
}