const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: false
};

const defaultPreferences = {
  theme: 'dark',
  language: 'en',
  notifications: false,
  fontSize: 14,
  autoSave: true
};

function validatePreferences(prefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validated = {};
  
  validKeys.forEach(key => {
    if (prefs.hasOwnProperty(key)) {
      if (key === 'fontSize' && typeof prefs[key] === 'number') {
        validated[key] = Math.max(8, Math.min(prefs[key], 72));
      } else if (key === 'notifications' || key === 'autoSave') {
        validated[key] = Boolean(prefs[key]);
      } else {
        validated[key] = prefs[key];
      }
    } else {
      validated[key] = defaultPreferences[key];
    }
  });
  
  return validated;
}

function mergePreferences(userPrefs) {
  return {
    ...defaultPreferences,
    ...validatePreferences(userPrefs)
  };
}

function savePreferences(prefs) {
  const validPrefs = mergePreferences(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validPrefs));
  return validPrefs;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return mergePreferences(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to parse stored preferences:', e);
    }
  }
  return { ...defaultPreferences };
}

export { savePreferences, loadPreferences, validatePreferences };