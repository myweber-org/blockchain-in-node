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
        return [];
    }
}

function displayUserData(users) {
    const container = document.getElementById('userContainer');
    if (!container) {
        console.error('Container element not found');
        return;
    }
    container.innerHTML = '';
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'user-card';
        userElement.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Company: ${user.company.name}</p>
        `;
        container.appendChild(userElement);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const users = await fetchUserData();
    displayUserData(users);
});const userDataCache = new Map();

async function fetchUserData(userId) {
  if (userDataCache.has(userId)) {
    console.log(`Returning cached data for user ${userId}`);
    return userDataCache.get(userId);
  }

  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    userDataCache.set(userId, data);
    
    console.log(`Fetched and cached data for user ${userId}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch data for user ${userId}:`, error);
    throw error;
  }
}

function clearUserCache(userId = null) {
  if (userId) {
    userDataCache.delete(userId);
    console.log(`Cleared cache for user ${userId}`);
  } else {
    userDataCache.clear();
    console.log('Cleared all user cache');
  }
}

export { fetchUserData, clearUserCache };