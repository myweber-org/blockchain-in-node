function fetchUserData(userId, maxRetries = 3) {
    const apiUrl = `https://api.example.com/users/${userId}`;
    let attempt = 0;

    async function attemptFetch() {
        attempt++;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('User data fetched successfully:', data);
            return data;
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt) * 100;
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return attemptFetch();
            } else {
                console.error('Max retries reached. Operation failed.');
                throw new Error('Failed to fetch user data after multiple attempts');
            }
        }
    }

    return attemptFetch();
}function fetchUserData(userId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
            displayUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            displayErrorMessage(error.message);
        });
}

function displayUserInfo(user) {
    const container = document.getElementById('user-info');
    if (container) {
        container.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Company: ${user.company.name}</p>
        `;
    }
}

function displayErrorMessage(message) {
    const container = document.getElementById('user-info');
    if (container) {
        container.innerHTML = `<p class="error">Error: ${message}</p>`;
    }
}async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      isActive: userData.status === 'active'
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}