async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log(`User ID: ${userData.id}`);
        console.log(`Name: ${userData.name}`);
        console.log(`Email: ${userData.email}`);
        console.log(`City: ${userData.address.city}`);
        return userData;
    } catch (error) {
        console.error('Failed to fetch user data:', error.message);
        return null;
    }
}function fetchUserData(userId) {
  const cacheKey = `user_${userId}`;
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    return Promise.resolve(JSON.parse(cachedData));
  }
  
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    })
    .catch(error => {
      console.error('Failed to fetch user data:', error);
      throw error;
    });
}