function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data fetched successfully:', data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
}async function fetchUserData(userId, maxRetries = 3) {
  const baseUrl = 'https://api.example.com/users';
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${baseUrl}/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: data,
        attempts: attempt
      };
      
    } catch (error) {
      console.warn(`Attempt ${attempt} failed: ${error.message}`);
      
      if (attempt === maxRetries) {
        return {
          success: false,
          error: error.message,
          attempts: attempt
        };
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

function validateUserId(userId) {
  return typeof userId === 'string' && userId.length > 0;
}

export { fetchUserData, validateUserId };