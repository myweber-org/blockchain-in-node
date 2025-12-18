function fetchUserData(userId, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => {
            controller.abort();
            reject(new Error('Request timed out'));
        }, timeout);

        fetch(`https://api.example.com/users/${userId}`, { signal })
            .then(response => {
                clearTimeout(timeoutId);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => {
                clearTimeout(timeoutId);
                if (error.name === 'AbortError') {
                    reject(new Error('Request was aborted due to timeout'));
                } else {
                    reject(error);
                }
            });
    });
}