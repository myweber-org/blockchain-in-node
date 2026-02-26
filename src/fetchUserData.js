function fetchUserData(userId) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return {
                id: data.id,
                name: data.name,
                email: data.email,
                isActive: data.status === 'active'
            };
        })
        .catch(error => {
            console.error('Failed to fetch user data:', error);
            return null;
        });
}