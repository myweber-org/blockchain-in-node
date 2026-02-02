function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function testEmailValidation() {
    const testCases = [
        { email: "test@example.com", expected: true },
        { email: "invalid.email", expected: false },
        { email: "another.test@domain.co.uk", expected: true },
        { email: "spaces in@email.com", expected: false },
        { email: "", expected: false }
    ];

    testCases.forEach((testCase, index) => {
        const result = validateEmail(testCase.email);
        console.log(`Test ${index + 1}: ${testCase.email} => ${result} (expected: ${testCase.expected})`);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail, testEmailValidation };
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = validateEmail;