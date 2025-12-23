function fetchUserData(userId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
            displayUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('userInfo');
    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: ${user.company.name}</p>
        `;
    }
}

// Example usage
fetchUserData(1);async function fetchUserData(userId, maxRetries = 3) {
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
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID provided');
    }
    return userId.trim();
}

async function getUserProfile(userId) {
    try {
        const validatedId = validateUserId(userId);
        const userData = await fetchUserData(validatedId);
        
        return {
            success: true,
            data: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                lastLogin: userData.lastLogin ? new Date(userData.lastLogin) : null
            }
        };
    } catch (error) {
        console.error('Failed to get user profile:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

export { fetchUserData, getUserProfile };async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Fetch attempt ${attempt} for user ${userId}`);
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
    
    throw new Error(`Failed to fetch user data after ${maxRetries} attempts. Last error: ${lastError.message}`);
}

function validateUserId(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID provided');
    }
    return userId.trim();
}

async function getUserProfile(userId) {
    try {
        const validatedId = validateUserId(userId);
        const userData = await fetchUserData(validatedId);
        
        return {
            success: true,
            data: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                lastLogin: userData.lastLogin ? new Date(userData.lastLogin) : null
            },
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Failed to get user profile:', error);
        return {
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        };
    }
}

export { fetchUserData, getUserProfile };function fetchUserData(userId, maxRetries = 3) {
    const baseUrl = 'https://api.example.com/users';
    let retryCount = 0;

    async function attemptFetch() {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            if (retryCount < maxRetries) {
                retryCount++;
                console.warn(`Attempt ${retryCount} failed. Retrying...`);
                return attemptFetch();
            } else {
                console.error('Max retries reached. Operation failed.');
                throw error;
            }
        }
    }

    return attemptFetch();
}function fetchUserData(userId, maxRetries = 3) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    async function attemptFetch(retryCount) {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error(`Attempt ${retryCount + 1} failed:`, error.message);
            
            if (retryCount < maxRetries - 1) {
                const delay = Math.pow(2, retryCount) * 1000;
                console.log(`Retrying in ${delay}ms...`);
                
                await new Promise(resolve => setTimeout(resolve, delay));
                return attemptFetch(retryCount + 1);
            }
            
            return { 
                success: false, 
                error: `Failed after ${maxRetries} attempts: ${error.message}` 
            };
        }
    }
    
    return attemptFetch(0);
}

function processUserData(userData) {
    if (!userData.success) {
        console.error('Failed to fetch user data:', userData.error);
        return null;
    }
    
    const processedData = {
        id: userData.data.id,
        name: `${userData.data.firstName} ${userData.data.lastName}`,
        email: userData.data.email,
        active: userData.data.status === 'active',
        lastLogin: new Date(userData.data.lastLogin),
        permissions: userData.data.permissions || []
    };
    
    return processedData;
}

async function getUserProfile(userId) {
    const result = await fetchUserData(userId);
    return processUserData(result);
}

export { fetchUserData, getUserProfile };function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data fetched successfully:', data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}function fetchUserData(userId) {
  const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('User Data:', data);
      displayUserInfo(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      displayErrorMessage(error.message);
    });
}

function displayUserInfo(user) {
  const container = document.getElementById('user-info');
  if (container) {
    container.innerHTML = `
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>Phone: ${user.phone}</p>
      <p>Website: ${user.website}</p>
      <p>Company: ${user.company.name}</p>
    `;
  }
}

function displayErrorMessage(message) {
  const container = document.getElementById('user-info');
  if (container) {
    container.innerHTML = `<p class="error">Failed to load user data: ${message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const userId = 1;
  fetchUserData(userId);
});function fetchUserData(userId) {
  const cacheKey = `user_${userId}`;
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    if (Date.now() - parsedData.timestamp < 300000) {
      return Promise.resolve(parsedData.data);
    }
  }

  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(userData => {
      const cacheObject = {
        data: userData,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheObject));
      return userData;
    })
    .catch(error => {
      console.error('Failed to fetch user data:', error);
      throw error;
    });
}