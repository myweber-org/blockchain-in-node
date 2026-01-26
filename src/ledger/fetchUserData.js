const fetchUserData = async (userId, maxRetries = 3) => {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
      
    } catch (error) {
      retries++;
      console.warn(`Attempt ${retries} failed: ${error.message}`);
      
      if (retries >= maxRetries) {
        return { 
          success: false, 
          error: `Failed after ${maxRetries} attempts: ${error.message}` 
        };
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000 * retries));
    }
  }
};

const processUserData = async (userId) => {
  const result = await fetchUserData(userId);
  
  if (result.success) {
    console.log('User data retrieved:', result.data);
    return result.data;
  } else {
    console.error('Failed to fetch user data:', result.error);
    throw new Error(result.error);
  }
};

export { fetchUserData, processUserData };