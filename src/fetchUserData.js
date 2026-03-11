function fetchUserData(apiUrl) {
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const processedData = data.map(user => ({
        id: user.id,
        name: user.name.toUpperCase(),
        email: user.email.toLowerCase(),
        active: user.status === 'active'
      }));
      return processedData;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}