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

    function attemptFetch() {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.warn(`Attempt ${retryCount} failed. Retrying...`);
                    return attemptFetch();
                } else {
                    throw new Error(`Failed to fetch user data after ${maxRetries} attempts: ${error.message}`);
                }
            });
    }

    return attemptFetch();
}