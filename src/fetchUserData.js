
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const userCache = new Map();

async function fetchUserData(userId, forceRefresh = false) {
    const cached = userCache.get(userId);
    
    if (!forceRefresh && cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        console.log(`Returning cached data for user ${userId}`);
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        userCache.set(userId, {
            data: userData,
            timestamp: Date.now()
        });
        
        console.log(`Fetched fresh data for user ${userId}`);
        return userData;
        
    } catch (error) {
        console.error(`Failed to fetch data for user ${userId}:`, error);
        
        if (cached) {
            console.log(`Returning stale cached data for user ${userId}`);
            return cached.data;
        }
        
        throw error;
    }
}

function clearUserCache(userId = null) {
    if (userId) {
        userCache.delete(userId);
        console.log(`Cleared cache for user ${userId}`);
    } else {
        userCache.clear();
        console.log('Cleared all user cache');
    }
}

export { fetchUserData, clearUserCache };