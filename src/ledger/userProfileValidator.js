function validateUserProfile(profile) {
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;

    const errors = [];

    if (!nameRegex.test(profile.name?.trim())) {
        errors.push('Name must be 2-50 letters and spaces only');
    }

    if (!emailRegex.test(profile.email?.trim())) {
        errors.push('Invalid email format');
    }

    if (profile.phone && !phoneRegex.test(profile.phone.replace(/\s/g, ''))) {
        errors.push('Phone must be 10-15 digits with optional country code');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validateUserProfile };