async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      status: userData.active ? 'active' : 'inactive'
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const userDataCache = new Map();

async function fetchUserData(userId, forceRefresh = false) {
    const cacheKey = `user_${userId}`;
    const cached = userDataCache.get(cacheKey);

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
        
        userDataCache.set(cacheKey, {
            data: userData,
            timestamp: Date.now()
        });

        console.log(`Fetched fresh data for user ${userId}`);
        return userData;
    } catch (error) {
        console.error(`Failed to fetch user data for ${userId}:`, error);
        
        if (cached) {
            console.log(`Falling back to stale cache for user ${userId}`);
            return cached.data;
        }
        
        throw error;
    }
}

function clearUserCache(userId = null) {
    if (userId) {
        userDataCache.delete(`user_${userId}`);
    } else {
        userDataCache.clear();
    }
}

export { fetchUserData, clearUserCache };