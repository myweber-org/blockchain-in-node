
function formatUserData(user) {
  const { id, name, email, createdAt } = user;
  
  return {
    userId: id,
    fullName: name.trim(),
    contactEmail: email.toLowerCase(),
    memberSince: new Date(createdAt).toISOString().split('T')[0],
    profileUrl: `/users/${id}`,
    isActive: user.status === 'active'
  };
}

function validateUserInput(input) {
  const requiredFields = ['name', 'email', 'password'];
  const missingFields = requiredFields.filter(field => !input[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email)) {
    throw new Error('Invalid email format');
  }
  
  return true;
}

export { formatUserData, validateUserInput };