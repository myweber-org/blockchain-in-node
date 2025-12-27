function fetchUserData(userId) {
  const apiUrl = `https://api.example.com/users/${userId}`;
  
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        active: data.status === 'active',
        lastLogin: new Date(data.last_login)
      };
    })
    .catch(error => {
      console.error('Failed to fetch user data:', error);
      return null;
    });
}async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    console.log('User Data:', userData);
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}