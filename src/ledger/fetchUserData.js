function fetchUserData(userId, cacheDuration = 300000) {
    const cacheKey = `user_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);
    const now = Date.now();

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < cacheDuration) {
            console.log(`Returning cached data for user ${userId}`);
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

// Example usage: fetchUserData(1);