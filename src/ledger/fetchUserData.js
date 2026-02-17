const CACHE_DURATION = 5 * 60 * 1000;
const userDataCache = new Map();

async function fetchUserData(userId) {
    const cacheKey = `user_${userId}`;
    const cached = userDataCache.get(cacheKey);

    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
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
        userDataCache.delete(`user_${userId}`);
    } else {
        userDataCache.clear();
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
      console.log('Returning cached data for user:', userId);
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
      console.log('Returning expired cached data as fallback');
      return data;
    }
    throw error;
  }
}async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(`Successfully fetched data for user ${userId}`);
            return data;
            
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt < maxRetries) {
                const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw new Error(`Failed to fetch user data after ${maxRetries} attempts: ${lastError.message}`);
}

function validateUserId(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID provided');
    }
    
    if (!/^[a-zA-Z0-9-]+$/.test(userId)) {
        throw new Error('User ID contains invalid characters');
    }
    
    return true;
}

async function getUserProfile(userId) {
    try {
        validateUserId(userId);
        const userData = await fetchUserData(userId);
        
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            lastActive: new Date(userData.lastActive),
            profileComplete: userData.profileComplete || false
        };
        
    } catch (error) {
        console.error(`Failed to get profile for user ${userId}:`, error);
        throw error;
    }
}

export { fetchUserData, getUserProfile };async function fetchUserData(userId, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`, {
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            success: true,
            data: data
        };
    } catch (error) {
        if (error.name === 'AbortError') {
            return {
                success: false,
                error: 'Request timeout'
            };
        }
        return {
            success: false,
            error: error.message
        };
    }
}async function fetchUserData(userId) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        const processedData = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            isActive: userData.status === 'active',
            lastLogin: new Date(userData.last_login),
            formattedName: userData.name.toUpperCase()
        };
        
        console.log('User data processed successfully:', processedData);
        return processedData;
        
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        throw error;
    }
}