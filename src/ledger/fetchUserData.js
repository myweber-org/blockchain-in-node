function fetchUserData(userId) {
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
            return processUserData(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}

function processUserData(userData) {
    const processedData = {
        id: userData.id,
        name: userData.name.toUpperCase(),
        email: userData.email,
        isActive: userData.status === 'active',
        registeredDate: new Date(userData.registeredAt).toLocaleDateString()
    };
    
    return processedData;
}