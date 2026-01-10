const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const userDataCache = new Map();

async function fetchUserData(userId, forceRefresh = false) {
    const cached = userDataCache.get(userId);
    const now = Date.now();

    if (!forceRefresh && cached && (now - cached.timestamp) < CACHE_DURATION) {
        console.log(`Returning cached data for user ${userId}`);
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        userDataCache.set(userId, {
            data: data,
            timestamp: now
        });

        console.log(`Fetched fresh data for user ${userId}`);
        return data;
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
        userDataCache.delete(userId);
        console.log(`Cleared cache for user ${userId}`);
    } else {
        userDataCache.clear();
        console.log('Cleared all user cache');
    }
}

export { fetchUserData, clearUserCache };async function fetchUserData(userId) {
  const cacheKey = `user_${userId}`;
  const cacheExpiry = 5 * 60 * 1000; // 5 minutes

  // Check cache first
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheExpiry) {
      return data;
    }
  }

  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();

    // Cache the response
    localStorage.setItem(cacheKey, JSON.stringify({
      data: userData,
      timestamp: Date.now()
    }));

    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    // Return cached data even if expired as fallback
    if (cached) {
      const { data } = JSON.parse(cached);
      return data;
    }
    throw error;
  }
}const USER_DATA_CACHE = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchUserData(userId, forceRefresh = false) {
    const cacheKey = `user_${userId}`;
    const cached = USER_DATA_CACHE.get(cacheKey);

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
        
        USER_DATA_CACHE.set(cacheKey, {
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
        USER_DATA_CACHE.delete(`user_${userId}`);
    } else {
        USER_DATA_CACHE.clear();
    }
}

export { fetchUserData, clearUserCache };