const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  fontSize: 14,
  autoSave: true
};

const validThemes = ['light', 'dark', 'system'];
const validLanguages = ['en', 'es', 'fr', 'de'];
const minFontSize = 8;
const maxFontSize = 32;

function validatePreferences(userPrefs) {
  const validated = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (validThemes.includes(userPrefs.theme)) {
      validated.theme = userPrefs.theme;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validated.notifications = userPrefs.notifications;
    }
    
    if (validLanguages.includes(userPrefs.language)) {
      validated.language = userPrefs.language;
    }
    
    if (typeof userPrefs.fontSize === 'number' && 
        userPrefs.fontSize >= minFontSize && 
        userPrefs.fontSize <= maxFontSize) {
      validated.fontSize = userPrefs.fontSize;
    }
    
    if (typeof userPrefs.autoSave === 'boolean') {
      validated.autoSave = userPrefs.autoSave;
    }
  }
  
  return validated;
}

function savePreferences(prefs) {
  const validatedPrefs = validatePreferences(prefs);
  try {
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    return { success: true, preferences: validatedPrefs };
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return { success: false, error: 'Storage error' };
  }
}

function loadPreferences() {
  try {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      return validatePreferences(JSON.parse(stored));
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  return { ...defaultPreferences };
}

function resetPreferences() {
  try {
    localStorage.removeItem('userPreferences');
    return { success: true, preferences: { ...defaultPreferences } };
  } catch (error) {
    console.error('Failed to reset preferences:', error);
    return { success: false, error: 'Reset failed' };
  }
}

export { validatePreferences, savePreferences, loadPreferences, resetPreferences, defaultPreferences };