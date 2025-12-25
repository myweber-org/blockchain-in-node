function fetchUserData(userId, maxRetries = 3) {
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
                    console.warn(`Fetch failed for user ${userId}. Retry ${retryCount}/${maxRetries}. Error: ${error.message}`);
                    return new Promise(resolve => {
                        setTimeout(() => resolve(attemptFetch()), 1000 * retryCount);
                    });
                } else {
                    console.error(`Failed to fetch data for user ${userId} after ${maxRetries} retries.`);
                    throw error;
                }
            });
    }

    return attemptFetch();
}