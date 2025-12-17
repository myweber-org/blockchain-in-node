async function fetchUserData(userId) {
  const cacheKey = `user_${userId}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    const data = JSON.parse(cached);
    if (Date.now() - data.timestamp < 300000) {
      return data.user;
    }
  }

  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const userData = await response.json();
    const cacheData = {
      user: userData,
      timestamp: Date.now()
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    return userData;
    
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    
    if (cached) {
      const data = JSON.parse(cached);
      console.warn('Returning stale cached data');
      return data.user;
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
    if (typeof userId !== 'string' && typeof userId !== 'number') {
        throw new TypeError('User ID must be a string or number');
    }
    
    const idStr = String(userId).trim();
    if (!idStr || !/^[a-zA-Z0-9_-]+$/.test(idStr)) {
        throw new Error('Invalid user ID format');
    }
    
    return idStr;
}

async function getUserProfile(userId) {
    try {
        const validatedId = validateUserId(userId);
        const userData = await fetchUserData(validatedId);
        
        return {
            id: userData.id,
            name: userData.name || 'Unknown',
            email: userData.email,
            active: userData.status === 'active',
            lastUpdated: new Date(userData.updated_at || Date.now())
        };
        
    } catch (error) {
        console.error(`Failed to get profile for user ${userId}:`, error);
        return {
            id: userId,
            error: error.message,
            retrieved: false
        };
    }
}

export { fetchUserData, getUserProfile };async function fetchUserData(userId, maxRetries = 3) {
    const baseUrl = 'https://api.example.com/users';
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return {
                success: true,
                data: data,
                attempts: attempt
            };
            
        } catch (error) {
            console.warn(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt === maxRetries) {
                return {
                    success: false,
                    error: error.message,
                    attempts: attempt
                };
            }
            
            await new Promise(resolve => 
                setTimeout(resolve, Math.pow(2, attempt) * 100)
            );
        }
    }
}

function validateUserId(userId) {
    return typeof userId === 'string' && 
           userId.length > 0 && 
           /^[a-zA-Z0-9_-]+$/.test(userId);
}

async function processUserRequest(userId) {
    if (!validateUserId(userId)) {
        throw new Error('Invalid user ID format');
    }
    
    const result = await fetchUserData(userId);
    
    if (result.success) {
        console.log(`User data retrieved successfully after ${result.attempts} attempt(s)`);
        return result.data;
    } else {
        console.error(`Failed to fetch user data after ${result.attempts} attempts`);
        throw new Error(`Fetch failed: ${result.error}`);
    }
}

export { fetchUserData, validateUserId, processUserRequest };