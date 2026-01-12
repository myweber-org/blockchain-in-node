async function fetchUserData() {
  const url = 'https://jsonplaceholder.typicode.com/users/1';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    console.log('Fetched user data:', userData);
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}

fetchUserData();function fetchUserData(userId, maxRetries = 3) {
    const url = `https://api.example.com/users/${userId}`;
    let attempts = 0;

    async function attemptFetch() {
        attempts++;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('User data fetched successfully:', data);
            return data;
        } catch (error) {
            console.error(`Attempt ${attempts} failed:`, error.message);
            if (attempts < maxRetries) {
                console.log(`Retrying... (${attempts}/${maxRetries})`);
                return attemptFetch();
            } else {
                console.error('Max retries reached. Operation failed.');
                throw new Error('Failed to fetch user data after multiple attempts');
            }
        }
    }

    return attemptFetch();
}