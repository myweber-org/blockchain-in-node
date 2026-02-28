function fetchUserData(userId) {
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const processedData = {
                id: data.id,
                name: data.name,
                email: data.email,
                active: data.status === 'active',
                lastLogin: new Date(data.last_login)
            };
            return processedData;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}