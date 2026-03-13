const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

function validatePreferences(userPrefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validatedPrefs = { ...defaultPreferences };

  for (const key of validKeys) {
    if (userPrefs.hasOwnProperty(key)) {
      if (typeof userPrefs[key] === typeof defaultPreferences[key]) {
        validatedPrefs[key] = userPrefs[key];
      }
    }
  }

  return validatedPrefs;
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
      return { ...defaultPreferences };
    }
  }
  return { ...defaultPreferences };
}

export { savePreferences, loadPreferences, defaultPreferences };