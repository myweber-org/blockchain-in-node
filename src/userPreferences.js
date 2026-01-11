const defaultPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
  language: 'en'
};

function validatePreferences(userPrefs) {
  const validPrefs = { ...defaultPreferences };
  
  for (const key in userPrefs) {
    if (key in defaultPreferences) {
      if (key === 'theme' && ['light', 'dark', 'auto'].includes(userPrefs[key])) {
        validPrefs[key] = userPrefs[key];
      } else if (key === 'fontSize' && typeof userPrefs[key] === 'number' && userPrefs[key] >= 12 && userPrefs[key] <= 24) {
        validPrefs[key] = userPrefs[key];
      } else if (key === 'notifications' && typeof userPrefs[key] === 'boolean') {
        validPrefs[key] = userPrefs[key];
      } else if (key === 'language' && ['en', 'es', 'fr', 'de'].includes(userPrefs[key])) {
        validPrefs[key] = userPrefs[key];
      }
    }
  }
  
  return validPrefs;
}

function savePreferences(preferences) {
  const validated = validatePreferences(preferences);
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