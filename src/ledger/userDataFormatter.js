function formatUserData(users) {
    return users.map(user => ({
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email.toLowerCase(),
        age: calculateAge(user.birthDate),
        isActive: user.status === 'active'
    }));
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}function formatUserData(users) {
  return users.map(user => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email.toLowerCase(),
    age: user.age,
    isActive: user.status === 'active',
    formattedJoinDate: new Date(user.joinDate).toLocaleDateString('en-US')
  }));
}

function validateUserData(user) {
  const requiredFields = ['id', 'firstName', 'lastName', 'email'];
  const missingFields = requiredFields.filter(field => !user[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    throw new Error('Invalid email format');
  }
  
  return true;
}

export { formatUserData, validateUserData };