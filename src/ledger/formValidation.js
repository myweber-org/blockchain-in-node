function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    let isValid = true;

    emailError.textContent = '';
    passwordError.textContent = '';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
    }

    return isValid;
}
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

    function validateForm() {
        const isEmailValid = validateEmail(emailInput.value);
        const isPasswordValid = validatePassword(passwordInput.value);
        
        emailInput.classList.toggle('invalid', !isEmailValid);
        passwordInput.classList.toggle('invalid', !isPasswordValid);
        
        submitButton.disabled = !(isEmailValid && isPasswordValid);
        
        return isEmailValid && isPasswordValid;
    }

    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);

    form.addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    validateForm();
}

document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation('loginForm');
});