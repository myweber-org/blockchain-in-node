async function fetchUserData(userId, cacheDuration = 300000) {
    const cacheKey = `user_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheDuration) {
            return data;
        }
    }

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const userData = await response.json();
        
        localStorage.setItem(cacheKey, JSON.stringify({
            data: userData,
            timestamp: Date.now()
        }));
        
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
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
    const outputDiv = document.getElementById('userInfo');
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

function displayErrorMessage(message) {
    const outputDiv = document.getElementById('userInfo');
    if (outputDiv) {
        outputDiv.innerHTML = `<p class="error">Error: ${message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const fetchButton = document.getElementById('fetchUserBtn');
    if (fetchButton) {
        fetchButton.addEventListener('click', function() {
            const userId = document.getElementById('userIdInput').value || 1;
            fetchUserData(userId);
        });
    }
});