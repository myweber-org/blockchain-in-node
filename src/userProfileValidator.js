function validateUserProfile(profile) {
    const errors = [];

    if (!profile.email || !isValidEmail(profile.email)) {
        errors.push('Invalid email format');
    }

    if (typeof profile.age !== 'number' || profile.age < 18 || profile.age > 120) {
        errors.push('Age must be between 18 and 120');
    }

    if (!profile.username || profile.username.length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = { validateUserProfile, isValidEmail };function validateUserProfile(formData) {
    const errors = {};

    if (!formData.username || formData.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Valid email is required';
    }

    if (formData.age && (isNaN(formData.age) || formData.age < 0 || formData.age > 120)) {
        errors.age = 'Age must be between 0 and 120';
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
        errors.website = 'Website must start with http:// or https://';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}