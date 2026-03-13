function calculateMonthlyPayment(principal, annualInterestRate, years) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalPayments = years * 12;
    if (monthlyInterestRate === 0) {
        return principal / totalPayments;
    }
    const monthlyPayment = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    return Math.round(monthlyPayment * 100) / 100;
}