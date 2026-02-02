function checkPasswordStrength(password) {
    if (typeof password !== 'string') return 0;
    
    let score = 0;
    const patterns = {
        length: /.{8,}/,
        lowercase: /[a-z]/,
        uppercase: /[A-Z]/,
        digit: /\d/,
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    };
    
    Object.values(patterns).forEach(pattern => {
        if (pattern.test(password)) score++;
    });
    
    return {
        score: score,
        strength: score < 3 ? 'Weak' : score < 5 ? 'Medium' : 'Strong',
        meetsRequirements: score >= 4
    };
}

module.exports = checkPasswordStrength;