function calculateMonthlyPayment(principal, annualInterestRate, years) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = years * 12;
    
    if (monthlyInterestRate === 0) {
        return principal / numberOfPayments;
    }
    
    const monthlyPayment = principal * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    return Math.round(monthlyPayment * 100) / 100;
}

function validateInput(principal, annualInterestRate, years) {
    if (principal <= 0 || annualInterestRate < 0 || years <= 0) {
        throw new Error('Invalid input values');
    }
    
    if (!Number.isFinite(principal) || !Number.isFinite(annualInterestRate) || !Number.isFinite(years)) {
        throw new Error('Input values must be numbers');
    }
    
    return true;
}

module.exports = { calculateMonthlyPayment, validateInput };function calculateMonthlyPayment(principal, annualInterestRate, loanTermYears) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = loanTermYears * 12;
    
    if (monthlyInterestRate === 0) {
        return principal / numberOfPayments;
    }
    
    const monthlyPayment = principal * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    return Math.round(monthlyPayment * 100) / 100;
}