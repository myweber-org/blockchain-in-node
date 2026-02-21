const fetchUserData = async (userId, maxRetries = 3) => {
    const baseUrl = 'https://api.example.com/users';
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }

    return { 
        success: false, 
        error: `Failed after ${maxRetries} attempts: ${lastError.message}` 
    };
};

const validateUserData = (userData) => {
    const requiredFields = ['id', 'name', 'email'];
    return requiredFields.every(field => userData.hasOwnProperty(field));
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
        displayName: `${result.data.name} (${result.data.email})`
    };

    return processedData;
};

export { fetchUserData, processUserData };function fetchUserData(userId) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    return fetch(apiUrl)
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
fetchUserData(1);const CACHE_DURATION = 5 * 60 * 1000;
const userCache = new Map();

async function fetchUserData(userId) {
    if (userCache.has(userId)) {
        const cached = userCache.get(userId);
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
            return cached.data;
        }
        userCache.delete(userId);
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
        throw error;
    }
}

function clearUserCache(userId = null) {
    if (userId) {
        userCache.delete(userId);
    } else {
        userCache.clear();
    }
}

export { fetchUserData, clearUserCache };function fetchUserData(userId, cacheDuration = 300000) {
    const cacheKey = `user_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);
    const now = Date.now();

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
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
            const cacheData = {
                data: data,
                timestamp: now
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            return data;
        })
        .catch(error => {
            console.error('Failed to fetch user data:', error);
            throw error;
        });
}