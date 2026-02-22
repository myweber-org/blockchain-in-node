function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function testEmailValidation() {
    const testCases = [
        { email: "user@example.com", expected: true },
        { email: "invalid.email", expected: false },
        { email: "another.user@domain.co.uk", expected: true },
        { email: "spaces in@email.com", expected: false },
        { email: "", expected: false }
    ];

    testCases.forEach(testCase => {
        const result = validateEmail(testCase.email);
        console.log(`Email: "${testCase.email}" => ${result === testCase.expected ? "PASS" : "FAIL"}`);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail, testEmailValidation };
}