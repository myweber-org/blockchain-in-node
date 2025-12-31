
const CACHE_DURATION = 5 * 60 * 1000;
const userCache = new Map();

async function fetchUserData(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID provided');
    }

    const cached = userCache.get(userId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
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

        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw new Error(`Unable to fetch data for user ${userId}`);
    }
}

function clearUserCache(userId = null) {
    if (userId) {
        userCache.delete(userId);
    } else {
        userCache.clear();
    }
}

export { fetchUserData, clearUserCache };async function fetchUserData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('User data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}async function fetchUserData(userId) {
  const apiUrl = `https://api.example.com/users/${userId}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      isActive: userData.status === 'active',
      lastLogin: new Date(userData.last_login)
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`Successfully fetched data for user ${userId}`);
            return data;
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
            
            // Exponential backoff delay
            const delay = Math.pow(2, attempt) * 100;
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Utility function to validate user ID format
function isValidUserId(userId) {
    return typeof userId === 'string' && /^[a-zA-Z0-9_-]+$/.test(userId);
}

// Example usage
async function main() {
    const testUserId = 'user123';
    
    if (!isValidUserId(testUserId)) {
        console.error('Invalid user ID format');
        return;
    }
    
    try {
        const userData = await fetchUserData(testUserId);
        console.log('User data:', userData);
    } catch (error) {
        console.error('Fatal error:', error.message);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchUserData, isValidUserId };
}function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data retrieved:', data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}