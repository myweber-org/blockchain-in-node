function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitize(userInput) {
    if (typeof userInput !== 'string') {
        return '';
    }
    
    const trimmed = userInput.trim();
    const sanitized = sanitizeInput(trimmed);
    
    const regex = /^[a-zA-Z0-9\s.,!?-]+$/;
    if (!regex.test(sanitized)) {
        return '';
    }
    
    return sanitized;
}

export { validateAndSanitize };function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateAndSanitizeForm() {
    const userInput = document.getElementById('userInput').value;
    const sanitizedInput = sanitizeInput(userInput);
    document.getElementById('output').innerHTML = sanitizedInput;
    console.log('Sanitized input:', sanitizedInput);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inputForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            validateAndSanitizeForm();
        });
    }
});function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

export { sanitizeInput, validateEmail, escapeHtml };