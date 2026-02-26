const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true
  };

  const validateKey = (key) => {
    if (!key || typeof key !== 'string') {
      throw new Error('Invalid preference key');
    }
    return true;
  };

  const getFullKey = (key) => `${PREFIX}${key}`;

  const getAll = () => {
    const preferences = { ...DEFAULT_PREFERENCES };
    
    Object.keys(DEFAULT_PREFERENCES).forEach(key => {
      const storedValue = localStorage.getItem(getFullKey(key));
      if (storedValue !== null) {
        try {
          preferences[key] = JSON.parse(storedValue);
        } catch {
          preferences[key] = storedValue;
        }
      }
    });
    
    return preferences;
  };

  const get = (key) => {
    validateKey(key);
    
    if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
      throw new Error(`Unknown preference: ${key}`);
    }
    
    const storedValue = localStorage.getItem(getFullKey(key));
    
    if (storedValue === null) {
      return DEFAULT_PREFERENCES[key];
    }
    
    try {
      return JSON.parse(storedValue);
    } catch {
      return storedValue;
    }
  };

  const set = (key, value) => {
    validateKey(key);
    
    if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
      throw new Error(`Cannot set unknown preference: ${key}`);
    }
    
    const expectedType = typeof DEFAULT_PREFERENCES[key];
    if (typeof value !== expectedType) {
      throw new Error(`Expected ${expectedType} for ${key}, got ${typeof value}`);
    }
    
    localStorage.setItem(getFullKey(key), JSON.stringify(value));
    return true;
  };

  const reset = (key = null) => {
    if (key) {
      validateKey(key);
      localStorage.removeItem(getFullKey(key));
    } else {
      Object.keys(DEFAULT_PREFERENCES).forEach(k => {
        localStorage.removeItem(getFullKey(k));
      });
    }
    return true;
  };

  const subscribe = (key, callback) => {
    validateKey(key);
    
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    
    const storageListener = (event) => {
      if (event.key === getFullKey(key)) {
        callback(get(key));
      }
    };
    
    window.addEventListener('storage', storageListener);
    
    return () => {
      window.removeEventListener('storage', storageListener);
    };
  };

  return {
    getAll,
    get,
    set,
    reset,
    subscribe,
    DEFAULT_PREFERENCES
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}