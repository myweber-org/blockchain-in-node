function formatUserData(users) {
    if (!Array.isArray(users)) {
        throw new TypeError('Input must be an array of user objects');
    }

    return users.map(user => {
        const formatted = {};

        if (user.firstName && user.lastName) {
            formatted.fullName = `${user.firstName.trim()} ${user.lastName.trim()}`;
        } else if (user.username) {
            formatted.fullName = user.username.trim();
        } else {
            formatted.fullName = 'Anonymous User';
        }

        if (user.email) {
            formatted.email = user.email.trim().toLowerCase();
        }

        if (user.createdAt) {
            const date = new Date(user.createdAt);
            if (!isNaN(date.getTime())) {
                formatted.joinDate = date.toISOString().split('T')[0];
            }
        }

        if (user.isActive !== undefined) {
            formatted.status = user.isActive ? 'active' : 'inactive';
        }

        return Object.assign({}, user, formatted);
    });
}

export { formatUserData };
function formatUserData(users) {
  return users.map(user => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email.toLowerCase(),
    age: calculateAge(user.birthDate),
    isActive: user.status === 'active',
    lastLogin: formatDate(user.lastLogin)
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

function formatDate(dateString) {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export { formatUserData, calculateAge, formatDate };