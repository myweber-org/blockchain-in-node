function fetchUserData(userId) {
  fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data:', data);
      displayUserData(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}

function displayUserData(user) {
  const container = document.getElementById('userDataContainer');
  if (container) {
    container.innerHTML = `
      <h2>${user.name}</h2>
      <p>Email: ${user.email}</p>
      <p>Location: ${user.location}</p>
    `;
  }
}function fetchUserData(userId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
            displayUserData(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function displayUserData(user) {
    const outputDiv = document.getElementById('userDataOutput');
    if (outputDiv) {
        outputDiv.innerHTML = `
            <h3>User Information</h3>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
    }
}

// Example usage
// fetchUserData(1);function fetchUserData(userId) {
    fetch(`https://api.example.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User data:', data);
            displayUserData(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function displayUserData(user) {
    const container = document.getElementById('user-container');
    if (container) {
        container.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Location: ${user.location}</p>
        `;
    }
}function fetchUserData(userId) {
    return fetch(`https://api.example.com/users/${userId}`)
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
}function fetchUserData(userId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
            displayUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('userInfo');
    
    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const userId = 1;
    fetchUserData(userId);
});function fetchUserData(userId) {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('User Data:', data);
            displayUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            displayErrorMessage(error.message);
        });
}

function displayUserInfo(user) {
    const outputDiv = document.getElementById('user-info');
    if (outputDiv) {
        outputDiv.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Company: ${user.company.name}</p>
        `;
    }
}

function displayErrorMessage(message) {
    const outputDiv = document.getElementById('user-info');
    if (outputDiv) {
        outputDiv.innerHTML = `<p class="error">Error: ${message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const fetchButton = document.getElementById('fetch-user-btn');
    if (fetchButton) {
        fetchButton.addEventListener('click', function() {
            const userId = document.getElementById('user-id').value || 1;
            fetchUserData(userId);
        });
    }
});