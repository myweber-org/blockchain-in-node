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
        return null;
    }
}