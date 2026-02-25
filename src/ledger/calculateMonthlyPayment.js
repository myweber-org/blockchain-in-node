function calculateMonthlyPayment(principal, annualInterestRate, loanTermYears) {
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

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calculateAmortizationSchedule(principal, annualInterestRate, loanTermYears) {
    const monthlyPayment = calculateMonthlyPayment(principal, annualInterestRate, loanTermYears);
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalPayments = loanTermYears * 12;
    
    let balance = principal;
    const schedule = [];
    
    for (let month = 1; month <= totalPayments; month++) {
        const interestPayment = balance * monthlyInterestRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        schedule.push({
            month: month,
            payment: monthlyPayment,
            principal: principalPayment,
            interest: interestPayment,
            balance: Math.max(0, balance - principalPayment)
        });
        
        balance -= principalPayment;
    }
    
    return schedule;
}

export {
    calculateMonthlyPayment,
    validateLoanInputs,
    formatCurrency,
    calculateAmortizationSchedule
};function calculateMonthlyPayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const totalPayments = years * 12;
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
    const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;
    return principal * (numerator / denominator);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}

function validateLoanInput(principal, annualRate, years) {
    const errors = [];
    
    if (principal <= 0) {
        errors.push('Principal must be greater than zero');
    }
    
    if (annualRate <= 0 || annualRate > 100) {
        errors.push('Annual rate must be between 0 and 100');
    }
    
    if (years <= 0 || years > 50) {
        errors.push('Loan term must be between 1 and 50 years');
    }
    
    return errors;
}

module.exports = {
    calculateMonthlyPayment,
    formatCurrency,
    validateLoanInput
};