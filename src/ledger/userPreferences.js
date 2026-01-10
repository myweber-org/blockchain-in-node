const userPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 10
};

const validThemes = ['light', 'dark', 'auto'];
const validLanguages = ['en', 'es', 'fr', 'de'];
const minResultsPerPage = 5;
const maxResultsPerPage = 100;

function validatePreferences(prefs) {
  const errors = [];
  
  if (!validThemes.includes(prefs.theme)) {
    errors.push(`Invalid theme. Must be one of: ${validThemes.join(', ')}`);
  }
  
  if (typeof prefs.notifications !== 'boolean') {
    errors.push('Notifications must be a boolean value');
  }
  
  if (!validLanguages.includes(prefs.language)) {
    errors.push(`Invalid language. Must be one of: ${validLanguages.join(', ')}`);
  }
  
  if (typeof prefs.resultsPerPage !== 'number' || 
      prefs.resultsPerPage < minResultsPerPage || 
      prefs.resultsPerPage > maxResultsPerPage) {
    errors.push(`Results per page must be between ${minResultsPerPage} and ${maxResultsPerPage}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

function applyDefaultPreferences(prefs) {
  return {
    theme: prefs.theme || userPreferences.theme,
    notifications: typeof prefs.notifications === 'boolean' ? prefs.notifications : userPreferences.notifications,
    language: prefs.language || userPreferences.language,
    resultsPerPage: prefs.resultsPerPage || userPreferences.resultsPerPage
  };
}

function savePreferences(prefs) {
  const validatedPrefs = applyDefaultPreferences(prefs);
  const validation = validatePreferences(validatedPrefs);
  
  if (!validation.isValid) {
    console.error('Invalid preferences:', validation.errors);
    return false;
  }
  
  try {
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      const parsed = JSON.parse(saved);
      return applyDefaultPreferences(parsed);
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  
  return {...userPreferences};
}

export { validatePreferences, applyDefaultPreferences, savePreferences, loadPreferences };