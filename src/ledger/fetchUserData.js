const fetchUserData = async (userId, maxRetries = 3) => {
    const baseUrl = 'https://api.example.com/users';
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }

    return { 
        success: false, 
        error: `Failed after ${maxRetries} attempts: ${lastError.message}` 
    };
};

const validateUserData = (userData) => {
    const requiredFields = ['id', 'name', 'email'];
    return requiredFields.every(field => userData.hasOwnProperty(field));
};

const processUserData = async (userId) => {
    const result = await fetchUserData(userId);
    
    if (!result.success) {
        console.error('Failed to fetch user data:', result.error);
        return null;
    }

    if (!validateUserData(result.data)) {
        console.error('Invalid user data structure');
        return null;
    }

    const processedData = {
        ...result.data,
        fetchedAt: new Date().toISOString(),
        displayName: `${result.data.name} (${result.data.email})`
    };

    return processedData;
};

export { fetchUserData, processUserData };function fetchUserData(userId) {
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
}