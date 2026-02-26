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
            displayErrorMessage(error.message);
        });
}

function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('userInfo');
    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: ${user.company.name}</p>
        `;
    }
}

function displayErrorMessage(message) {
    const userInfoDiv = document.getElementById('userInfo');
    if (userInfoDiv) {
        userInfoDiv.innerHTML = `<p class="error">Error: ${message}</p>`;
    }
}const fetchUserData = async (userId, maxRetries = 3) => {
    const baseUrl = 'https://api.example.com/users';
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return {
                success: true,
                data: data,
                attempts: attempt
            };
            
        } catch (error) {
            console.warn(`Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt === maxRetries) {
                return {
                    success: false,
                    error: error.message,
                    attempts: attempt
                };
            }
            
            await new Promise(resolve => 
                setTimeout(resolve, Math.pow(2, attempt) * 100)
            );
        }
    }
};

const processUserData = async () => {
    const result = await fetchUserData(12345);
    
    if (result.success) {
        console.log(`User data fetched successfully after ${result.attempts} attempt(s)`);
        console.log('User data:', result.data);
        return result.data;
    } else {
        console.error(`Failed to fetch user data after ${result.attempts} attempts`);
        console.error('Error:', result.error);
        return null;
    }
};

export { fetchUserData, processUserData };