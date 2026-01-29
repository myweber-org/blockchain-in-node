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
};const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                return defaultPreferences;
            }
        }
        return defaultPreferences;
    }

    function updatePreferences(newPreferences) {
        const current = getPreferences();
        const updated = { ...current, ...newPreferences };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        dispatchPreferenceChange(updated);
        return updated;
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        dispatchPreferenceChange(defaultPreferences);
        return defaultPreferences;
    }

    function dispatchPreferenceChange(preferences) {
        const event = new CustomEvent('preferencesChanged', {
            detail: preferences
        });
        window.dispatchEvent(event);
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key];
    }

    return {
        getPreferences,
        updatePreferences,
        resetPreferences,
        getPreference,
        onPreferencesChange: (callback) => {
            window.addEventListener('preferencesChanged', (e) => callback(e.detail));
        }
    };
})();