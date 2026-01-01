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

export { validatePreferences, savePreferences, loadPreferences, defaultPreferences };const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25
};

function validatePreferences(userPrefs) {
  const validPreferences = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (['light', 'dark', 'auto'].includes(userPrefs.theme)) {
      validPreferences.theme = userPrefs.theme;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validPreferences.notifications = userPrefs.notifications;
    }
    
    if (['en', 'es', 'fr', 'de'].includes(userPrefs.language)) {
      validPreferences.language = userPrefs.language;
    }
    
    if (Number.isInteger(userPrefs.resultsPerPage) && 
        userPrefs.resultsPerPage >= 10 && 
        userPrefs.resultsPerPage <= 100) {
      validPreferences.resultsPerPage = userPrefs.resultsPerPage;
    }
  }
  
  return validPreferences;
}

function mergePreferences(existingPrefs, newPrefs) {
  const validatedNew = validatePreferences(newPrefs);
  return { ...existingPrefs, ...validatedNew };
}

export { defaultPreferences, validatePreferences, mergePreferences };