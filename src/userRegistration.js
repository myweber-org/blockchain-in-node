function validateRegistrationForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email format" };
    }
    
    if (!passwordRegex.test(password)) {
        return { 
            valid: false, 
            message: "Password must be at least 8 characters with letters and numbers" 
        };
    }
    
    return { valid: true, message: "Registration data is valid" };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const validationResult = validateRegistrationForm(email, password);
    
    if (validationResult.valid) {
        console.log("Registration successful for:", email);
        alert("Registration successful!");
    } else {
        console.error("Registration failed:", validationResult.message);
        alert("Registration failed: " + validationResult.message);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registrationForm");
    if (form) {
        form.addEventListener("submit", handleRegistrationSubmit);
    }
});