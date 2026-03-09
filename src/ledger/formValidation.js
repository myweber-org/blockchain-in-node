function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    if (!/[!@#$%^&*]/.test(password)) return false;
    return true;
}

function validateForm(email, password) {
    const errors = [];
    
    if (!validateEmail(email)) {
        errors.push('Invalid email format');
    }
    
    if (!validatePassword(password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateEmail, validatePassword, validateForm };function validateEmail(email) {
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
        const validation = validateForm(emailInput.value, passwordInput.value);
        
        if (emailError) {
            emailError.textContent = validation.emailError;
            emailError.style.display = validation.emailError ? 'block' : 'none';
        }
        
        if (passwordError) {
            passwordError.textContent = validation.passwordError;
            passwordError.style.display = validation.passwordError ? 'block' : 'none';
        }
    }

    emailInput.addEventListener('input', updateValidation);
    passwordInput.addEventListener('input', updateValidation);

    form.addEventListener('submit', function(event) {
        const validation = validateForm(emailInput.value, passwordInput.value);
        if (!validation.isValid) {
            event.preventDefault();
            updateValidation();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation('loginForm');
});