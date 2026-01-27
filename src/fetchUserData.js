async function fetchUserData(userId, maxRetries = 3) {
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
            console.warn(`Attempt ${attempt} failed for user ${userId}:`, error.message);
            if (attempt >= maxRetries) {
                throw new Error(`Failed to fetch user ${userId} after ${maxRetries} attempts`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}