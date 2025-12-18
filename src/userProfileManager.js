function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateProfile(userProfile) {
    const errors = [];
    
    if (!userProfile.username || userProfile.username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }
    
    if (!userProfile.email || !validateEmail(userProfile.email)) {
        errors.push('Please provide a valid email address');
    }
    
    if (userProfile.age && (userProfile.age < 0 || userProfile.age > 150)) {
        errors.push('Age must be between 0 and 150');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function updateUserProfile(currentProfile, updates) {
    const validationResult = validateProfile(updates);
    
    if (!validationResult.isValid) {
        return {
            success: false,
            errors: validationResult.errors,
            profile: currentProfile
        };
    }
    
    const updatedProfile = {
        ...currentProfile,
        ...updates,
        lastUpdated: new Date().toISOString()
    };
    
    return {
        success: true,
        profile: updatedProfile,
        message: 'Profile updated successfully'
    };
}

const userProfile = {
    username: 'john_doe',
    email: 'john@example.com',
    age: 30,
    lastUpdated: '2024-01-01T00:00:00.000Z'
};

const profileUpdates = {
    email: 'john.new@example.com',
    age: 31
};

const result = updateUserProfile(userProfile, profileUpdates);
console.log(result);