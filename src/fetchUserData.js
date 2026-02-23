async function fetchUserData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return processUserData(data);
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}

function processUserData(users) {
    if (!Array.isArray(users)) {
        return [];
    }
    return users
        .filter(user => user.active && user.age >= 18)
        .map(user => ({
            id: user.id,
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            age: user.age
        }))
        .sort((a, b) => a.age - b.age);
}function fetchUserData(userId) {
    return fetch(`https://api.example.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const processedData = {
                id: data.id,
                name: data.name,
                email: data.email,
                active: data.status === 'active'
            };
            return processedData;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}