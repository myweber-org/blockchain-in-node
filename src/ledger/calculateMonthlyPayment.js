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
}function calculateMonthlyPayment(principal, annualInterestRate, loanTermYears) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalPayments = loanTermYears * 12;
    
    if (monthlyInterestRate === 0) {
        return principal / totalPayments;
    }
    
    const monthlyPayment = principal * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    
    return Math.round(monthlyPayment * 100) / 100;
}

function validateLoanInputs(principal, annualInterestRate, loanTermYears) {
    const errors = [];
    
    if (principal <= 0 || principal > 10000000) {
        errors.push('Principal must be between $1 and $10,000,000');
    }
    
    if (annualInterestRate < 0 || annualInterestRate > 100) {
        errors.push('Interest rate must be between 0% and 100%');
    }
    
    if (loanTermYears <= 0 || loanTermYears > 50) {
        errors.push('Loan term must be between 1 and 50 years');
    }
    
    return errors;
}

function calculateAmortizationSchedule(principal, annualInterestRate, loanTermYears) {
    const monthlyPayment = calculateMonthlyPayment(principal, annualInterestRate, loanTermYears);
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalPayments = loanTermYears * 12;
    
    let remainingBalance = principal;
    const schedule = [];
    
    for (let month = 1; month <= totalPayments; month++) {
        const interestPayment = remainingBalance * monthlyInterestRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        remainingBalance -= principalPayment;
        
        schedule.push({
            month: month,
            payment: monthlyPayment,
            principal: Math.round(principalPayment * 100) / 100,
            interest: Math.round(interestPayment * 100) / 100,
            remainingBalance: Math.round(Math.max(remainingBalance, 0) * 100) / 100
        });
    }
    
    return schedule;
}

module.exports = {
    calculateMonthlyPayment,
    validateLoanInputs,
    calculateAmortizationSchedule
};function calculateMonthlyPayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const totalPayments = years * 12;
    if (monthlyRate === 0) {
        return principal / totalPayments;
    }
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
    const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;
    return principal * (numerator / denominator);
}