function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function validateInput(input) {
    return Number.isInteger(input) && input > 0;
}

function displayFibonacciSequence(n) {
    if (!validateInput(n)) {
        console.error('Invalid input. Please provide a positive integer.');
        return;
    }
    
    const result = calculateFibonacci(n);
    console.log(`Fibonacci sequence up to ${n} numbers:`, result);
    return result;
}

module.exports = {
    calculateFibonacci,
    validateInput,
    displayFibonacciSequence
};