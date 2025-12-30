function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
        { email: "missing@dotcom", expected: false },
        { email: "UPPERCASE@DOMAIN.COM", expected: true }
    ];

    testCases.forEach(testCase => {
        const result = validateEmail(testCase.email);
        console.log(`Testing: ${testCase.email} => ${result} (expected: ${testCase.expected})`);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail, testEmailValidation };
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = validateEmail;function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

module.exports = validateEmail;