function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let attempt = 0;

    async function attemptFetch() {
        attempt++;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('User data fetched successfully:', data);
            return data;
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            if (attempt < maxRetries) {
                console.log(`Retrying... (${attempt}/${maxRetries})`);
                const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
                await new Promise(resolve => setTimeout(resolve, delay));
                return attemptFetch();
            } else {
                console.error('Max retries reached. Operation failed.');
                throw new Error('Failed to fetch user data after multiple attempts');
            }
        }
    }

    return attemptFetch();
}