function validateForm() {
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

document.getElementById('submitBtn').addEventListener('click', function(event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validateForm(email, password) {
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    
    return {
        isValid: emailValid && passwordValid,
        emailError: emailValid ? '' : 'Invalid email format',
        passwordError: passwordValid ? '' : 'Password must be at least 8 characters'
    };
}

function setupFormValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const emailError = form.querySelector('.email-error');
    const passwordError = form.querySelector('.password-error');

    function updateValidation() {
        const result = validateForm(emailInput.value, passwordInput.value);
        
        if (emailError) {
            emailError.textContent = result.emailError;
            emailError.style.display = result.emailError ? 'block' : 'none';
        }
        
        if (passwordError) {
            passwordError.textContent = result.passwordError;
            passwordError.style.display = result.passwordError ? 'block' : 'none';
        }
        
        return result.isValid;
    }

    emailInput.addEventListener('input', updateValidation);
    passwordInput.addEventListener('input', updateValidation);

    form.addEventListener('submit', function(event) {
        if (!updateValidation()) {
            event.preventDefault();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation('loginForm');
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
    
    return true;
}