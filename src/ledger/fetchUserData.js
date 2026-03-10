async function fetchUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        console.log('Fetched users:', users);
        return users;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}async function fetchUserData(userId) {
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
    throw error;
  }
}function fetchUserData(userId) {
    return fetch(`https://api.example.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User data:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}function fetchUserData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched successfully:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}async function fetchUserData(userId, cacheDuration = 300000) {
  const cacheKey = `user_${userId}`;
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < cacheDuration) {
      return data;
    }
  }

  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    const cacheData = {
      data: userData,
      timestamp: Date.now()
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    return userData;
    
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    
    if (cachedData) {
      const { data } = JSON.parse(cachedData);
      console.warn('Returning stale cached data due to fetch failure');
      return data;
    }
    
    throw error;
  }
}