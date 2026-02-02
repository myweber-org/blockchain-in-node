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
console.log(result);function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateAge(age) {
    return Number.isInteger(age) && age >= 0 && age <= 120;
}

class UserProfile {
    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.lastUpdated = new Date();
    }

    updateProfile(newName, newEmail, newAge) {
        if (newName && typeof newName === 'string' && newName.trim() !== '') {
            this.name = newName.trim();
        }

        if (newEmail && validateEmail(newEmail)) {
            this.email = newEmail;
        }

        if (newAge && validateAge(newAge)) {
            this.age = newAge;
        }

        this.lastUpdated = new Date();
        return this;
    }

    getProfileSummary() {
        return `User: ${this.name}, Email: ${this.email}, Age: ${this.age}, Last Updated: ${this.lastUpdated.toISOString()}`;
    }
}

function createUserProfile(name, email, age) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new Error('Invalid name provided');
    }

    if (!validateEmail(email)) {
        throw new Error('Invalid email format');
    }

    if (!validateAge(age)) {
        throw new Error('Invalid age value');
    }

    return new UserProfile(name.trim(), email, age);
}

export { UserProfile, createUserProfile, validateEmail, validateAge };