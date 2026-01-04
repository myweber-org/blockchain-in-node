const fetchUserData = async (userId, maxRetries = 3) => {
  const fetchWithRetry = async (attempt) => {
    try {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      if (attempt < maxRetries) {
        console.warn(`Attempt ${attempt + 1} failed. Retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        return fetchWithRetry(attempt + 1);
      }
      return { 
        success: false, 
        error: `Failed after ${maxRetries} attempts: ${error.message}` 
      };
    }
  };
  
  return fetchWithRetry(0);
};

const processUserData = async (userId) => {
  const result = await fetchUserData(userId);
  
  if (result.success) {
    console.log('User data retrieved:', result.data);
    return result.data;
  } else {
    console.error('Error fetching user data:', result.error);
    throw new Error(result.error);
  }
};

export { fetchUserData, processUserData };function fetchUserData(userId, cacheDuration = 300000) {
    const cacheKey = `user_${userId}`;
    const cached = localStorage.getItem(cacheKey);
    const now = Date.now();

    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (now - timestamp < cacheDuration) {
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
                timestamp: now
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
            return data;
        })
        .catch(error => {
            console.error('Failed to fetch user data:', error);
            throw error;
        });
}function fetchUserData(userId) {
    fetch(`https://api.example.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User data:', data);
            displayUserData(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function displayUserData(user) {
    const container = document.getElementById('user-data-container');
    if (container) {
        container.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Location: ${user.location}</p>
        `;
    }
}