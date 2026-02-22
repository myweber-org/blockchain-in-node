
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

export default UserDataFetcher;const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const userDataCache = new Map();

async function fetchUserData(userId, forceRefresh = false) {
    const cacheKey = `user_${userId}`;
    const cached = userDataCache.get(cacheKey);

    if (!forceRefresh && cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        console.log(`Returning cached data for user ${userId}`);
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        
        userDataCache.set(cacheKey, {
            data: userData,
            timestamp: Date.now()
        });

        console.log(`Fetched fresh data for user ${userId}`);
        return userData;
    } catch (error) {
        console.error(`Failed to fetch user data for ${userId}:`, error);
        
        if (cached) {
            console.log(`Returning stale cached data for user ${userId}`);
            return cached.data;
        }
        
        throw error;
    }
}

function clearUserCache(userId = null) {
    if (userId) {
        userDataCache.delete(`user_${userId}`);
    } else {
        userDataCache.clear();
    }
}

export { fetchUserData, clearUserCache };const CACHE_DURATION = 5 * 60 * 1000;
const userDataCache = new Map();

async function fetchUserData(userId) {
    const cached = userDataCache.get(userId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        userDataCache.set(userId, {
            data: data,
            timestamp: Date.now()
        });
        return data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        if (cached) {
            console.warn('Returning stale cached data due to fetch failure');
            return cached.data;
        }
        throw error;
    }
}

function invalidateUserCache(userId) {
    userDataCache.delete(userId);
}

export { fetchUserData, invalidateUserCache };function fetchUserData(userId) {
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
    const container = document.getElementById('userDataContainer');
    if (container) {
        container.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Location: ${user.location}</p>
        `;
    }
}function fetchUserData(userId) {
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
}function fetchUserData(userId, cacheDuration = 300000) {
    const cacheKey = `user_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);
    const now = Date.now();

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < cacheDuration) {
            console.log('Returning cached user data');
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
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('User data retrieved:', data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}const cache = new Map();

async function fetchUserData(userId) {
    if (cache.has(userId)) {
        console.log(`Cache hit for user ${userId}`);
        return cache.get(userId);
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        cache.set(userId, userData);
        console.log(`Fetched and cached data for user ${userId}`);
        return userData;
    } catch (error) {
        console.error(`Failed to fetch data for user ${userId}:`, error);
        throw error;
    }
}function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    function attemptFetch() {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('User data fetched successfully:', data);
                return data;
            })
            .catch(error => {
                retryCount++;
                if (retryCount <= maxRetries) {
                    console.warn(`Attempt ${retryCount} failed. Retrying...`);
                    return attemptFetch();
                } else {
                    console.error('Max retries reached. Operation failed:', error);
                    throw new Error('Failed to fetch user data after multiple attempts');
                }
            });
    }

    return attemptFetch();
}

// Usage example
fetchUserData(123)
    .then(data => console.log('Final data:', data))
    .catch(error => console.error('Final error:', error));async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log(`User ID: ${userData.id}`);
        console.log(`Name: ${userData.name}`);
        console.log(`Email: ${userData.email}`);
        console.log(`Company: ${userData.company.name}`);
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error.message);
        return null;
    }
}

fetchUserData(1);function fetchUserData(userId) {
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
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: ${user.company.name}</p>
        `;
    }
}

// Example usage
fetchUserData(1);function fetchUserData(userId) {
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
            displayErrorMessage(error.message);
        });
}

function displayUserInfo(user) {
    const container = document.getElementById('user-info');
    if (container) {
        container.innerHTML = `
            <h2>${user.name}</h2>
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
        container.innerHTML = `<p class="error">Error: ${message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const userId = 1;
    fetchUserData(userId);
});