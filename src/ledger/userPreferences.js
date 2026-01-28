const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25,
  autoSave: false
};

const validThemes = ['light', 'dark', 'system'];
const validLanguages = ['en', 'es', 'fr', 'de'];
const maxResultsPerPage = 100;

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
    
    if (Number.isInteger(userPrefs.resultsPerPage) && 
        userPrefs.resultsPerPage > 0 && 
        userPrefs.resultsPerPage <= maxResultsPerPage) {
      validated.resultsPerPage = userPrefs.resultsPerPage;
    }
    
    if (typeof userPrefs.autoSave === 'boolean') {
      validated.autoSave = userPrefs.autoSave;
    }
  }
  
  return validated;
}

function savePreferences(prefs) {
  const validatedPrefs = validatePreferences(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
  return validatedPrefs;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return validatePreferences(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
    }
  }
  return { ...defaultPreferences };
}

function resetPreferences() {
  localStorage.removeItem('userPreferences');
  return { ...defaultPreferences };
}

export { validatePreferences, savePreferences, loadPreferences, resetPreferences, defaultPreferences };