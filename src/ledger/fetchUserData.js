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
            return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}async function fetchUserData() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        console.log('Fetched users:', users);
        return users;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`Successfully fetched data for user ${userId}`);
            return data;
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}

function validateUserData(userData) {
    const requiredFields = ['id', 'name', 'email'];
    
    for (const field of requiredFields) {
        if (!userData[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    
    return true;
}

async function getUserProfile(userId) {
    try {
        const userData = await fetchUserData(userId);
        validateUserData(userData);
        
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            profileComplete: userData.profileComplete || false
        };
        
    } catch (error) {
        console.error(`Failed to get user profile: ${error.message}`);
        return null;
    }
}

export { fetchUserData, getUserProfile };