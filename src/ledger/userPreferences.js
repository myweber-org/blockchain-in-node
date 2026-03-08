const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

function validatePreferences(userPrefs) {
  const validPreferences = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (['light', 'dark'].includes(userPrefs.theme)) {
      validPreferences.theme = userPrefs.theme;
    }
    
    if (['en', 'es', 'fr'].includes(userPrefs.language)) {
      validPreferences.language = userPrefs.language;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validPreferences.notifications = userPrefs.notifications;
    }
    
    if (typeof userPrefs.fontSize === 'number' && userPrefs.fontSize >= 12 && userPrefs.fontSize <= 24) {
      validPreferences.fontSize = userPrefs.fontSize;
    }
  }
  
  return validPreferences;
}

function initializePreferences() {
  const storedPrefs = localStorage.getItem('userPreferences');
  let userPrefs = defaultPreferences;
  
  if (storedPrefs) {
    try {
      const parsedPrefs = JSON.parse(storedPrefs);
      userPrefs = validatePreferences(parsedPrefs);
    } catch (error) {
      console.warn('Invalid preferences in localStorage, using defaults');
    }
  }
  
  localStorage.setItem('userPreferences', JSON.stringify(userPrefs));
  return userPrefs;
}

function updatePreference(key, value) {
  const currentPrefs = JSON.parse(localStorage.getItem('userPreferences')) || defaultPreferences;
  
  if (key in defaultPreferences) {
    const tempObj = { [key]: value };
    const validated = validatePreferences({ ...currentPrefs, ...tempObj });
    
    if (validated[key] === value) {
      localStorage.setItem('userPreferences', JSON.stringify(validated));
      return true;
    }
  }
  
  return false;
}

export { validatePreferences, initializePreferences, updatePreference };