async function fetchUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        console.log('Fetched users:', users);
        return users;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return [];
    }
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
            <p>Company: ${user.company.name}</p>
        `;
        container.appendChild(userElement);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const users = await fetchUserData();
    displayUserData(users);
});