async function fetchUserData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    async function attemptFetch() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('User data fetched successfully:', data);
            return data;
        } catch (error) {
            retryCount++;
            if (retryCount <= maxRetries) {
                console.warn(`Attempt ${retryCount} failed. Retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
                return attemptFetch();
            } else {
                console.error('Max retries reached. Operation failed:', error);
                throw error;
            }
        }
    }

    return attemptFetch();
}function fetchUserData() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched user data:', data);
            displayUserData(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayUserData(users) {
    const container = document.getElementById('userContainer');
    if (!container) {
        console.error('Container element not found');
        return;
    }

    container.innerHTML = '';
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'user-card';
        userElement.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
        `;
        container.appendChild(userElement);
    });
}

document.addEventListener('DOMContentLoaded', fetchUserData);async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log(`User ID: ${userData.id}`);
        console.log(`Name: ${userData.name}`);
        console.log(`Email: ${userData.email}`);
        console.log(`Company: ${userData.company.name}`);
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error.message);
        return null;
    }
}

fetchUserData(1);