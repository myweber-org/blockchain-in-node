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
}