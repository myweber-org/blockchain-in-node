const fetchUserData = async (userId, maxRetries = 3) => {
    const baseUrl = 'https://api.example.com/users';
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const response = await fetch(`${baseUrl}/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            attempt++;
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt >= maxRetries) {
                throw new Error(`Failed to fetch user data after ${maxRetries} attempts`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
};async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        return processUserData(userData);
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
}

function processUserData(data) {
    const { id, name, email, age } = data;
    return {
        userId: id,
        fullName: name.toUpperCase(),
        contact: email,
        isAdult: age >= 18
    };
}