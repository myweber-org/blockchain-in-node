async function fetchUserData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return processUserData(data);
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}

function processUserData(users) {
    if (!Array.isArray(users)) {
        return [];
    }
    return users
        .filter(user => user.active && user.age >= 18)
        .map(user => ({
            id: user.id,
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            age: user.age
        }))
        .sort((a, b) => a.age - b.age);
}