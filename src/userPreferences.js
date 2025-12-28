const defaultPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
  language: 'en'
};

function validatePreferences(userPrefs) {
  const validPreferences = {};
  const allowedKeys = Object.keys(defaultPreferences);
  
  for (const key of allowedKeys) {
    if (userPrefs.hasOwnProperty(key)) {
      const value = userPrefs[key];
      
      switch(key) {
        case 'theme':
          if (['light', 'dark', 'auto'].includes(value)) {
            validPreferences[key] = value;
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        case 'fontSize':
          if (typeof value === 'number' && value >= 12 && value <= 24) {
            validPreferences[key] = value;
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        case 'notifications':
          if (typeof value === 'boolean') {
            validPreferences[key] = value;
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        case 'language':
          if (['en', 'es', 'fr', 'de'].includes(value)) {
            validPreferences[key] = value;
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        default:
          validPreferences[key] = defaultPreferences[key];
      }
    } else {
      validPreferences[key] = defaultPreferences[key];
    }
  }
  
  return validPreferences;
}

function mergePreferences(existingPrefs, newPrefs) {
  const validatedNewPrefs = validatePreferences(newPrefs);
  return { ...existingPrefs, ...validatedNewPrefs };
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
      const parsed = JSON.parse(stored);
      return validatePreferences(parsed);
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
      return { ...defaultPreferences };
    }
  }
  return { ...defaultPreferences };
}

export { validatePreferences, mergePreferences, savePreferences, loadPreferences, defaultPreferences };