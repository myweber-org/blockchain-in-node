const fetchUserData = async (userId, maxRetries = 3) => {
  const fetchWithRetry = async (attempt) => {
    try {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      if (attempt < maxRetries) {
        console.warn(`Attempt ${attempt + 1} failed. Retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        return fetchWithRetry(attempt + 1);
      }
      return { 
        success: false, 
        error: `Failed after ${maxRetries} attempts: ${error.message}` 
      };
    }
  };
  
  return fetchWithRetry(0);
};

const processUserData = async (userId) => {
  const result = await fetchUserData(userId);
  
  if (result.success) {
    console.log('User data retrieved:', result.data);
    return result.data;
  } else {
    console.error('Error fetching user data:', result.error);
    throw new Error(result.error);
  }
};

export { fetchUserData, processUserData };