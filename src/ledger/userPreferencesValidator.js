function validateUserPreferences(preferences) {
    const errors = {};
    
    if (!preferences.username || preferences.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    }
    
    if (!preferences.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(preferences.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (preferences.age && (preferences.age < 18 || preferences.age > 120)) {
        errors.age = 'Age must be between 18 and 120';
    }
    
    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        errors.theme = 'Theme must be light, dark, or auto';
    }
    
    if (preferences.notificationFrequency && !['daily', 'weekly', 'monthly'].includes(preferences.notificationFrequency)) {
        errors.notificationFrequency = 'Notification frequency must be daily, weekly, or monthly';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}