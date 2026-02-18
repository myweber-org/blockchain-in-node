
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class UserDataFetcher {
  constructor() {
    this.cache = new Map();
  }

  async fetchUserData(userId) {
    const cacheKey = `user_${userId}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`Returning cached data for user ${userId}`);
      return cached.data;
    }

    try {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      
      this.cache.set(cacheKey, {
        data: userData,
        timestamp: Date.now()
      });

      console.log(`Fetched fresh data for user ${userId}`);
      return userData;
    } catch (error) {
      console.error(`Failed to fetch data for user ${userId}:`, error);
      
      if (cached) {
        console.log(`Falling back to stale cached data for user ${userId}`);
        return cached.data;
      }
      
      throw error;
    }
  }

  clearCache() {
    this.cache.clear();
    console.log('Cache cleared');
  }

  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.entries()).map(([key, value]) => ({
        key,
        age: Date.now() - value.timestamp
      }))
    };
  }
}

export default UserDataFetcher;