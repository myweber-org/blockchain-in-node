async function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`User data fetched successfully on attempt ${attempt}`);
            return data;
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
            
            // Exponential backoff
            const delay = Math.pow(2, attempt) * 100;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Usage example
fetchUserData(123)
    .then(data => console.log('User data:', data))
    .catch(error => console.error('Final error:', error.message));const fetchUserData = async (userId, maxRetries = 3) => {
    const fetchData = async (attempt) => {
        try {
            const response = await fetch(`https://api.example.com/users/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            if (attempt < maxRetries) {
                console.warn(`Attempt ${attempt + 1} failed. Retrying...`);
                return fetchData(attempt + 1);
            } else {
                console.error(`Failed after ${maxRetries} attempts:`, error);
                throw error;
            }
        }
    };
    return fetchData(0);
};async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log('Fetched user data:', userData);
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        return null;
    }
}

fetchUserData(1);