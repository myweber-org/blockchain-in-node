function fetchUserData(userId, maxRetries = 3) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    async function attemptFetch(retryCount) {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            if (retryCount < maxRetries) {
                console.warn(`Attempt ${retryCount + 1} failed. Retrying...`);
                return attemptFetch(retryCount + 1);
            } else {
                console.error(`Failed after ${maxRetries} attempts:`, error);
                throw error;
            }
        }
    }
    
    return attemptFetch(0);
}

function validateUserData(userData) {
    const requiredFields = ['id', 'name', 'email'];
    
    for (const field of requiredFields) {
        if (!userData[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        throw new Error('Invalid email format');
    }
    
    return true;
}

async function getUserData(userId) {
    try {
        const userData = await fetchUserData(userId);
        validateUserData(userData);
        return userData;
    } catch (error) {
        console.error('Failed to get user data:', error);
        return null;
    }
}

export { fetchUserData, validateUserData, getUserData };