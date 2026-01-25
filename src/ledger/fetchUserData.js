async function fetchUserData(userId) {
    const cacheKey = `user_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
        try {
            return JSON.parse(cachedData);
        } catch (e) {
            console.warn('Failed to parse cached data', e);
            localStorage.removeItem(cacheKey);
        }
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        try {
            localStorage.setItem(cacheKey, JSON.stringify(userData));
        } catch (e) {
            console.warn('Failed to cache user data', e);
        }
        
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}