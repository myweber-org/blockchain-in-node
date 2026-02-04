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