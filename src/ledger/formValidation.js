function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function setupFormValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const submitButton = form.querySelector('button[type="submit"]');

    function updateValidationState() {
        const isEmailValid = validateEmail(emailInput.value);
        const isPasswordValid = validatePassword(passwordInput.value);

        emailInput.classList.toggle('invalid', !isEmailValid);
        emailInput.classList.toggle('valid', isEmailValid);
        passwordInput.classList.toggle('invalid', !isPasswordValid);
        passwordInput.classList.toggle('valid', isPasswordValid);

        submitButton.disabled = !(isEmailValid && isPasswordValid);
    }

    emailInput.addEventListener('input', updateValidationState);
    passwordInput.addEventListener('input', updateValidationState);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateEmail(emailInput.value) && validatePassword(passwordInput.value)) {
            console.log('Form submitted successfully');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation('loginForm');
});function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    let isValid = true;

    emailError.textContent = '';
    passwordError.textContent = '';
    document.getElementById('email').classList.remove('error');
    document.getElementById('password').classList.remove('error');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        document.getElementById('email').classList.add('error');
        isValid = false;
    }

    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        document.getElementById('password').classList.add('error');
        isValid = false;
    }

    return isValid;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }
    
    if (!/[A-Z]/.test(password)) {
        alert('Password must contain at least one uppercase letter.');
        return false;
    }
    
    if (!/[0-9]/.test(password)) {
        alert('Password must contain at least one number.');
        return false;
    }
    
    alert('Form submitted successfully!');
    return true;
}function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long and contain both letters and numbers.');
        return false;
    }
    
    return true;
}