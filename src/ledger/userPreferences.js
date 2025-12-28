const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25
};

const validThemes = ['light', 'dark', 'auto'];
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
  }
  
  return validated;
}

function savePreferences(prefs) {
  const validated = validatePreferences(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validated));
  return validated;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return validatePreferences(JSON.parse(stored));
    } catch {
      return defaultPreferences;
    }
  }
  return defaultPreferences;
}

export { validatePreferences, savePreferences, loadPreferences, defaultPreferences };