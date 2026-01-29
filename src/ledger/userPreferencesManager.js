const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const STORAGE_KEY = 'user_preferences';

function loadPreferences() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      Object.assign(userPreferences, JSON.parse(saved));
    } catch (e) {
      console.error('Failed to parse saved preferences:', e);
    }
  }
  return userPreferences;
}

function savePreferences() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userPreferences));
    return true;
  } catch (e) {
    console.error('Failed to save preferences:', e);
    return false;
  }
}

function updatePreference(key, value) {
  if (userPreferences.hasOwnProperty(key)) {
    userPreferences[key] = value;
    return savePreferences();
  }
  return false;
}

function resetPreferences() {
  const defaults = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  };
  Object.assign(userPreferences, defaults);
  localStorage.removeItem(STORAGE_KEY);
  return userPreferences;
}

function getPreference(key) {
  return userPreferences[key];
}

export {
  loadPreferences,
  savePreferences,
  updatePreference,
  resetPreferences,
  getPreference,
  userPreferences
};