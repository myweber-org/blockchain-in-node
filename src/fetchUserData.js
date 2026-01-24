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
            displayUserData(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function displayUserData(user) {
    const outputDiv = document.getElementById('userDataOutput');
    if (outputDiv) {
        outputDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: ${user.company.name}</p>
        `;
    }
}async function fetchUserData(userId, cacheDuration = 300000) {
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
}