async function fetchUserData() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        console.log('Fetched users:', users);
        return users;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}

function displayUserData(users) {
    if (!users || users.length === 0) {
        console.log('No user data available');
        return;
    }
    
    users.forEach(user => {
        console.log(`Name: ${user.name}, Email: ${user.email}`);
    });
}

fetchUserData().then(displayUserData);