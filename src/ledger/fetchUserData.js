function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    
    async function attemptFetch(retryCount) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('User data fetched successfully:', data);
            return data;
            
        } catch (error) {
            console.error(`Attempt ${retryCount + 1} failed:`, error.message);
            
            if (retryCount < maxRetries - 1) {
                console.log(`Retrying in ${Math.pow(2, retryCount)} seconds...`);
                await new Promise(resolve => 
                    setTimeout(resolve, Math.pow(2, retryCount) * 1000)
                );
                return attemptFetch(retryCount + 1);
            } else {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts: ${error.message}`);
            }
        }
    }
    
    return attemptFetch(0);
}