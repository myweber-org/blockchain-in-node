function validateRegistrationForm(email, password, confirmPassword) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    
    if (!emailRegex.test(email)) {
        return { isValid: false, message: "Invalid email format" };
    }
    
    if (!passwordRegex.test(password)) {
        return { 
            isValid: false, 
            message: "Password must be at least 8 characters with letters and numbers" 
        };
    }
    
    if (password !== confirmPassword) {
        return { isValid: false, message: "Passwords do not match" };
    }
    
    return { isValid: true, message: "Registration validation successful" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const validationResult = validateRegistrationForm(email, password, confirmPassword);
    
    if (validationResult.isValid) {
        console.log("Registration data is valid. Proceeding with submission...");
        // Submit form or make API call here
        return true;
    } else {
        alert(validationResult.message);
        return false;
    }
}

// Example usage when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }
});function validateRegistrationForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        alert('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
        return false;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }
    
    return true;
}