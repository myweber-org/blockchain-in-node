async function fetchUserData(userId) {
  const cacheKey = `user_${userId}`;
  const cacheExpiry = 5 * 60 * 1000; // 5 minutes
  
  try {
    // Check cache first
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < cacheExpiry) {
        console.log('Returning cached data for user:', userId);
        return data;
      }
    }

    // Fetch from API
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
    
    console.log('Fetched fresh data for user:', userId);
    return userData;
    
  } catch (error) {
    console.error('Error fetching user data:', error);
    
    // Return cached data even if expired as fallback
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      console.log('Returning expired cached data as fallback');
      return JSON.parse(cached).data;
    }
    
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
            displayUserData(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function displayUserData(user) {
    const outputDiv = document.getElementById('userOutput');
    if (outputDiv) {
        outputDiv.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: ${user.company.name}</p>
        `;
    }
}

// Example usage
fetchUserData(1);