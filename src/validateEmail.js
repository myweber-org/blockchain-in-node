function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function testValidation() {
  const testCases = [
    { email: "test@example.com", expected: true },
    { email: "invalid.email", expected: false },
    { email: "another.test@domain.co.uk", expected: true },
    { email: "spaces in@email.com", expected: false },
    { email: "", expected: false }
  ];

  testCases.forEach(({ email, expected }) => {
    const result = validateEmail(email);
    console.assert(result === expected, 
      `Failed for ${email}: expected ${expected}, got ${result}`);
  });
  
  console.log("All email validation tests completed");
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateEmail, testValidation };
}