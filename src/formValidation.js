function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    let isValid = true;

    emailError.textContent = '';
    passwordError.textContent = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        isValid = false;
    }

    return isValid;
}

document.getElementById('email').addEventListener('input', validateForm);
document.getElementById('password').addEventListener('input', validateForm);