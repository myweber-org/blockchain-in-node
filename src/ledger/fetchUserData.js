async function fetchUserData(userId, maxRetries = 3) {
    const baseUrl = 'https://api.example.com/users';
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`Successfully fetched data for user ${userId}`);
            return data;
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
            
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

function validateUserId(userId) {
    if (typeof userId !== 'string' && typeof userId !== 'number') {
        throw new TypeError('User ID must be a string or number');
    }
    
    if (typeof userId === 'string' && userId.trim() === '') {
        throw new Error('User ID cannot be empty');
    }
    
    return String(userId).trim();
}

async function getUserProfile(userId) {
    try {
        const validatedId = validateUserId(userId);
        const userData = await fetchUserData(validatedId);
        
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            lastActive: new Date(userData.lastActive),
            profileComplete: userData.profileComplete || false
        };
        
    } catch (error) {
        console.error('Failed to get user profile:', error);
        return null;
    }
}

export { fetchUserData, getUserProfile };const fetchUserData = async (userId, maxRetries = 3) => {
  const fetchWithRetry = async (attempt) => {
    try {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (attempt < maxRetries) {
        console.warn(`Attempt ${attempt} failed. Retrying...`);
        return fetchWithRetry(attempt + 1);
      } else {
        console.error(`Failed after ${maxRetries} attempts:`, error);
        throw error;
      }
    }
  };

  return fetchWithRetry(1);
};function fetchUserData(apiUrl) {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                active: user.status === 'active'
            }));
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            return [];
        });
}