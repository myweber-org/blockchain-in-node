
function fetchUserData(userId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}

function displayUserData(user) {
    const outputDiv = document.getElementById('userOutput');
    if (outputDiv) {
        outputDiv.innerHTML = `
            <h3>User Details</h3>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('fetchUserButton');
    if (button) {
        button.addEventListener('click', function() {
            const userId = document.getElementById('userIdInput').value || 1;
            fetchUserData(userId)
                .then(user => displayUserData(user))
                .catch(error => console.error('Failed to load user:', error));
        });
    }
});