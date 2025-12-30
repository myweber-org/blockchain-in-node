
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
function formatUserData(users) {
    return users.map(user => ({
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email.toLowerCase(),
        age: calculateAge(user.birthDate),
        isActive: user.status === 'active',
        formattedJoinDate: new Date(user.joinDate).toLocaleDateString('en-US')
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
}

export { formatUserData, calculateAge };