async function fetchUserData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return processUserData(data);
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}

function processUserData(users) {
    if (!Array.isArray(users)) {
        return [];
    }
    return users
        .filter(user => user.active && user.age >= 18)
        .map(user => ({
            id: user.id,
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            age: user.age
        }))
        .sort((a, b) => a.age - b.age);
}function fetchUserData(userId) {
    return fetch(`https://api.example.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const processedData = {
                id: data.id,
                name: data.name,
                email: data.email,
                active: data.status === 'active'
            };
            return processedData;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}async function fetchUserData(userId, maxRetries = 3) {
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
      console.error(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        return {
          success: false,
          error: error.message,
          attempts: attempt
        };
      }
      
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
}

function validateUserId(userId) {
  return typeof userId === 'string' && 
         userId.length > 0 && 
         /^[a-zA-Z0-9-_]+$/.test(userId);
}

export { fetchUserData, validateUserId };async function fetchUserData(userId) {
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
            active: userData.status === 'active'
        };
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
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
            return {
                id: data.id,
                name: data.name,
                email: data.email,
                active: data.status === 'active'
            };
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            return null;
        });
}async function fetchUserData(userId) {
    const cacheKey = `user_${userId}`;
    const cacheExpiry = 5 * 60 * 1000; // 5 minutes
    
    try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < cacheExpiry) {
                console.log('Returning cached data for user:', userId);
                return data;
            }
        }

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
        console.log('Fetched fresh data for user:', userId);
        return userData;
        
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw new Error(`Unable to retrieve data for user ${userId}`);
    }
}