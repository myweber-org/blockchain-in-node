function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    function attemptFetch() {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('User data fetched successfully:', data);
                return data;
            })
            .catch(error => {
                retryCount++;
                if (retryCount <= maxRetries) {
                    console.warn(`Attempt ${retryCount} failed. Retrying...`);
                    return attemptFetch();
                } else {
                    console.error('Max retries reached. Operation failed:', error);
                    throw new Error('Failed to fetch user data after multiple attempts');
                }
            });
    }

    return attemptFetch();
}

// Example usage
fetchUserData(123)
    .then(data => console.log('Final data:', data))
    .catch(error => console.error('Final error:', error));function fetchUserData(userId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
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
    const outputDiv = document.getElementById('userInfo');
    if (outputDiv) {
        outputDiv.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Company: ${user.company.name}</p>
            <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        `;
    }
}

function displayErrorMessage(message) {
    const outputDiv = document.getElementById('userInfo');
    if (outputDiv) {
        outputDiv.innerHTML = `<p class="error">Failed to load user data: ${message}</p>`;
    }
}