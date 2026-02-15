function fetchUserData(userId) {
    return fetch(`https://api.example.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return {
                id: data.id,
                name: data.name,
                email: data.email,
                isActive: data.status === 'active'
            };
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            return null;
        });
}function fetchUserData(apiUrl) {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                return data.map(user => ({
                    id: user.id,
                    name: user.name || 'Unknown',
                    email: user.email || 'No email provided',
                    active: user.status === 'active'
                }));
            }
            throw new Error('Invalid data format: expected an array');
        })
        .catch(error => {
            console.error('Error fetching user data:', error.message);
            return [];
        });
}function fetchUserData(userId) {
  const apiUrl = `https://api.example.com/users/${userId}`;
  
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const processedData = {
        id: data.id,
        name: data.name.toUpperCase(),
        email: data.email,
        isActive: data.status === 'active',
        lastLogin: new Date(data.last_login)
      };
      return processedData;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}