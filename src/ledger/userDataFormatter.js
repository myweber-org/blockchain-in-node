function formatUserData(users) {
  return users.map(user => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email.toLowerCase(),
    formattedDate: new Date(user.createdAt).toISOString().split('T')[0],
    isActive: user.status === 'active'
  }));
}