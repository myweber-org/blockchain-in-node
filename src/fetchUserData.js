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
        console.warn(`Attempt ${attempt} failed. Retrying...`);
        return fetchWithRetry(attempt + 1);
      }
      return { success: false, error: error.message };
    }
  };

  return fetchWithRetry(1);
};

const processUser = async () => {
  const result = await fetchUserData(123);
  if (result.success) {
    console.log('User data:', result.data);
    return result.data;
  } else {
    console.error('Failed to fetch user:', result.error);
    return null;
  }
};

export { fetchUserData, processUser };