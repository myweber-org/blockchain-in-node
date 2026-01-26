const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: true
};

function validatePreferences(userPrefs) {
  const validPreferences = { ...defaultPreferences };
  
  for (const key in userPrefs) {
    if (key in defaultPreferences) {
      if (typeof userPrefs[key] === typeof defaultPreferences[key]) {
        validPreferences[key] = userPrefs[key];
      } else {
        console.warn(`Invalid type for preference "${key}". Using default.`);
      }
    } else {
      console.warn(`Unknown preference "${key}" will be ignored.`);
    }
  }
  
  return validPreferences;
}

function savePreferences(prefs) {
  try {
    const validatedPrefs = validatePreferences(prefs);
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    return { success: true, preferences: validatedPrefs };
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return { success: false, error: error.message };
  }
}

function loadPreferences() {
  try {
    const storedPrefs = localStorage.getItem('userPreferences');
    if (storedPrefs) {
      return validatePreferences(JSON.parse(storedPrefs));
    }
    return { ...defaultPreferences };
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return { ...defaultPreferences };
  }
}

function resetPreferences() {
  localStorage.removeItem('userPreferences');
  return { ...defaultPreferences };
}

export { validatePreferences, savePreferences, loadPreferences, resetPreferences, defaultPreferences };