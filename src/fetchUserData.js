function fetchUserData(apiUrl) {
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data.users.map(user => ({
        id: user.id,
        name: user.name.toUpperCase(),
        email: user.email.toLowerCase(),
        isActive: user.status === 'active'
      }));
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      return [];
    });
}