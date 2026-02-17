async function fetchUserData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return processUserData(data);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}

function processUserData(users) {
  if (!Array.isArray(users)) {
    throw new TypeError('Expected an array of users');
  }
  
  return users
    .filter(user => user.age >= 18)
    .map(user => ({
      fullName: `${user.firstName} ${user.lastName}`,
      age: user.age,
      isActive: user.status === 'active'
    }))
    .sort((a, b) => a.age - b.age);
}