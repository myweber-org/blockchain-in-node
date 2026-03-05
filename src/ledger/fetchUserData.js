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
            
            // Exponential backoff
            const delay = Math.pow(2, attempt) * 100;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Utility function to validate user ID format
function isValidUserId(userId) {
    return typeof userId === 'string' && /^[a-zA-Z0-9-]+$/.test(userId);
}

// Example usage
async function main() {
    const testUserId = 'user-12345';
    
    if (!isValidUserId(testUserId)) {
        console.error('Invalid user ID format');
        return;
    }
    
    try {
        const userData = await fetchUserData(testUserId);
        console.log('User data:', userData);
    } catch (error) {
        console.error('Fatal error:', error.message);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchUserData, isValidUserId };
}