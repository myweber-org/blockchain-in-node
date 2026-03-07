function fetchUserData(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User data:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}

function displayUserData(user) {
    const container = document.getElementById('userDataContainer');
    if (!container) {
        console.error('Container element not found');
        return;
    }
    
    container.innerHTML = `
        <h2>User Profile</h2>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> ${user.website}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const userId = 1;
    fetchUserData(userId)
        .then(user => displayUserData(user))
        .catch(error => console.error('Failed to load user data:', error));
});