function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    let fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i-1] + fib[i-2]);
    }
    return fib;
}function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function validateInput(input) {
    const num = parseInt(input);
    if (isNaN(num) || num < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    return num;
}

function displayFibonacciSequence(input) {
    try {
        const n = validateInput(input);
        const result = calculateFibonacci(n);
        console.log(`Fibonacci sequence (${n} terms): ${result.join(', ')}`);
        return result;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

module.exports = {
    calculateFibonacci,
    validateInput,
    displayFibonacciSequence
};