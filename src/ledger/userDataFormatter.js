function formatUserData(users) {
    return users.map(user => {
        const fullName = `${user.firstName} ${user.lastName}`.trim();
        const age = calculateAge(user.birthDate);
        const status = user.isActive ? 'Active' : 'Inactive';
        
        return {
            id: user.id,
            name: fullName,
            age: age,
            email: user.email,
            status: status,
            lastLogin: formatDate(user.lastLogin)
        };
    });
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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}