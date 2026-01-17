async function fetchUserData(userId) {
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
            isActive: userData.status === 'active'
        };
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
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
      <h2>${user.name}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
      <p><strong>Website:</strong> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
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
});
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const userCache = new Map();

async function fetchUserData(userId, forceRefresh = false) {
    const cached = userCache.get(userId);
    
    if (!forceRefresh && cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        return cached.data;
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
        
        if (cached) {
            console.warn('Returning stale cached data');
            return cached.data;
        }
        
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

export { fetchUserData, clearUserCache };async function fetchUserData(userId) {
  const apiUrl = `https://api.example.com/users/${userId}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    
    const processedData = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      isActive: userData.status === 'active',
      lastLogin: new Date(userData.last_login)
    };
    
    return processedData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
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
    const userInfoDiv = document.getElementById('user-info');
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

document.addEventListener('DOMContentLoaded', function() {
    const userId = 1;
    fetchUserData(userId);
});