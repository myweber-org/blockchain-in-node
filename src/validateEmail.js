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
        { email: "", expected: false }
    ];

    testCases.forEach(testCase => {
        const result = validateEmail(testCase.email);
        console.assert(result === testCase.expected, 
            `Failed for ${testCase.email}: expected ${testCase.expected}, got ${result}`);
    });

    console.log("All email validation tests completed");
}

module.exports = { validateEmail, testEmailValidation };function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

module.exports = validateEmail;