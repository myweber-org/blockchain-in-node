function fetchUserData(userId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
            displayUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('user-info');
    
    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const userId = 1;
    fetchUserData(userId);
});async function fetchUserData(userId, maxRetries = 3) {
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
            
            // Exponential backoff
            const delay = Math.pow(2, attempt) * 100;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Utility function to validate user ID format
function isValidUserId(userId) {
    return typeof userId === 'string' && /^[a-zA-Z0-9_-]{3,20}$/.test(userId);
}

// Example usage
async function main() {
    const userId = 'john_doe_123';
    
    if (!isValidUserId(userId)) {
        console.error('Invalid user ID format');
        return;
    }
    
    try {
        const userData = await fetchUserData(userId);
        console.log('User data:', userData);
    } catch (error) {
        console.error('Fatal error:', error.message);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchUserData, isValidUserId };
}