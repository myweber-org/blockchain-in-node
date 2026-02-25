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
});