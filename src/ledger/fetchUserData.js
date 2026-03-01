function fetchUserData(userId, cacheDuration = 300000) {
  const cacheKey = `user_${userId}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < cacheDuration) {
      return Promise.resolve(data);
    }
  }

  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const cacheItem = {
        data: data,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
      return data;
    })
    .catch(error => {
      console.error('Failed to fetch user data:', error);
      throw error;
    });
}const fetchUserData = async (userId, retries = 3) => {
    const baseUrl = 'https://api.example.com/users';
    
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return {
                success: true,
                data: data
            };
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === retries) {
                return {
                    success: false,
                    error: `Failed after ${retries} attempts: ${error.message}`
                };
            }
            
            await new Promise(resolve => 
                setTimeout(resolve, Math.pow(2, attempt) * 1000)
            );
        }
    }
};

const validateUserData = (userData) => {
    const requiredFields = ['id', 'name', 'email'];
    
    if (!userData || typeof userData !== 'object') {
        return false;
    }
    
    return requiredFields.every(field => 
        userData.hasOwnProperty(field) && 
        userData[field] !== null && 
        userData[field] !== undefined
    );
};

const processUserData = async (userId) => {
    const result = await fetchUserData(userId);
    
    if (!result.success) {
        console.error('Failed to fetch user data:', result.error);
        return null;
    }
    
    if (!validateUserData(result.data)) {
        console.error('Invalid user data structure');
        return null;
    }
    
    const processedData = {
        ...result.data,
        fetchedAt: new Date().toISOString(),
        displayName: result.data.name.toUpperCase(),
        isActive: result.data.status === 'active'
    };
    
    return processedData;
};

export { fetchUserData, validateUserData, processUserData };