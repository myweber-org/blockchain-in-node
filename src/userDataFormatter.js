function formatUserData(users) {
  return users.map(user => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email.toLowerCase(),
    age: user.age || 'N/A',
    isActive: user.status === 'active',
    lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'
  }));
}
function formatUserData(users) {
    return users.map(user => ({
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email.toLowerCase(),
        age: user.age || 'N/A',
        isActive: user.status === 'active',
        createdAt: new Date(user.createdAt).toLocaleDateString('en-US')
    }));
}