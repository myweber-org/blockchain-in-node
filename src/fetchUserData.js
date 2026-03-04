function fetchUserData(apiUrl) {
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data.users.map(user => ({
        id: user.id,
        name: user.name.toUpperCase(),
        email: user.email.toLowerCase(),
        isActive: user.status === 'active'
      }));
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      return [];
    });
}function fetchUserData(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
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
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
    }
}function fetchUserData(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}

function displayUserData(user) {
    const outputDiv = document.getElementById('userOutput');
    if (outputDiv) {
        outputDiv.innerHTML = `
            <h2>User Information</h2>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const fetchButton = document.getElementById('fetchUserBtn');
    if (fetchButton) {
        fetchButton.addEventListener('click', function() {
            const userId = document.getElementById('userIdInput').value || 1;
            fetchUserData(userId)
                .then(user => displayUserData(user))
                .catch(error => console.error('Failed to load user:', error));
        });
    }
});const CACHE_DURATION = 5 * 60 * 1000;
const userDataCache = new Map();

async function fetchUserData(userId, forceRefresh = false) {
    const cached = userDataCache.get(userId);
    
    if (!forceRefresh && cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        userDataCache.set(userId, {
            data: userData,
            timestamp: Date.now()
        });
        
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        
        if (cached) {
            console.warn('Returning stale cached data');
            return cached.data;
        }
        
        throw error;
    }
}

function clearUserCache(userId = null) {
    if (userId) {
        userDataCache.delete(userId);
    } else {
        userDataCache.clear();
    }
}

export { fetchUserData, clearUserCache };async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log('User data fetched successfully:', userData);
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        return null;
    }
}function fetchUserData(userId, maxRetries = 3) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    function attemptFetch() {
        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.warn(`Fetch attempt ${retryCount} failed. Retrying...`);
                    return attemptFetch();
                } else {
                    throw new Error(`Failed to fetch user data after ${maxRetries} attempts: ${error.message}`);
                }
            });
    }

    return attemptFetch();
}function fetchUserData(userId) {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

fetchUserData(1);function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    async function attemptFetch() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('User data fetched successfully:', data);
            return data;
        } catch (error) {
            retryCount++;
            if (retryCount <= maxRetries) {
                console.warn(`Attempt ${retryCount} failed. Retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
                return attemptFetch();
            } else {
                console.error('Max retries reached. Operation failed:', error);
                throw error;
            }
        }
    }

    return attemptFetch();
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
            displayErrorMessage(error.message);
        });
}

function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('user-info');
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

function displayErrorMessage(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = `Error: ${message}`;
        errorDiv.style.color = 'red';
    }
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
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
    }
}

// Example usage
fetchUserData(1);