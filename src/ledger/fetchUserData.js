async function fetchUserData(userId, maxRetries = 3) {
    const baseUrl = 'https://api.example.com/users';
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            
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
            
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

function validateUserId(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID provided');
    }
    
    if (!/^[a-zA-Z0-9-]+$/.test(userId)) {
        throw new Error('User ID contains invalid characters');
    }
    
    return true;
}

async function getUserProfile(userId) {
    try {
        validateUserId(userId);
        const userData = await fetchUserData(userId);
        
        return {
            success: true,
            data: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                lastActive: new Date(userData.lastActive).toLocaleDateString()
            }
        };
    } catch (error) {
        console.error('Failed to get user profile:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

export { fetchUserData, getUserProfile };