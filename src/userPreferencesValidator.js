function validateUserPreferences(preferences) {
  const defaults = {
    theme: 'light',
    notifications: true,
    language: 'en',
    timezone: 'UTC',
    resultsPerPage: 25
  };

  const validators = {
    theme: value => ['light', 'dark', 'auto'].includes(value),
    notifications: value => typeof value === 'boolean',
    language: value => /^[a-z]{2}(-[A-Z]{2})?$/.test(value),
    timezone: value => Intl.supportedValuesOf('timeZone').includes(value),
    resultsPerPage: value => Number.isInteger(value) && value >= 10 && value <= 100
  };

  const errors = [];
  const validated = { ...defaults };

  for (const [key, value] of Object.entries(preferences || {})) {
    if (validators[key]) {
      if (validators[key](value)) {
        validated[key] = value;
      } else {
        errors.push(`Invalid value for ${key}: ${value}`);
      }
    }
  }

  return {
    preferences: validated,
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : null
  };
}

export default validateUserPreferences;