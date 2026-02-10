async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    console.log('Fetched user data:', userData);
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return null;
  }
}

fetchUserData(1);function fetchUserData(userId, maxRetries = 3) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    let retryCount = 0;

    async function attemptFetch() {
        try {
            const response = await fetch(apiUrl);
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
                const delay = Math.pow(2, retryCount) * 100;
                await new Promise(resolve => setTimeout(resolve, delay));
                return attemptFetch();
            } else {
                console.error('Max retries reached. Operation failed:', error);
                throw error;
            }
        }
    }

    return attemptFetch();
}