const fetchUserData = async (userId, maxRetries = 3) => {
  const baseUrl = 'https://api.example.com/users';
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${baseUrl}/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
};

export default fetchUserData;const userCache = new Map();

async function fetchUserData(userId) {
    if (userCache.has(userId)) {
        console.log(`Returning cached data for user ${userId}`);
        return userCache.get(userId);
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        userCache.set(userId, userData);
        console.log(`Fetched and cached data for user ${userId}`);
        return userData;
    } catch (error) {
        console.error(`Failed to fetch data for user ${userId}:`, error);
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