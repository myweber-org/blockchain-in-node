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
};function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        const next = sequence[i - 1] + sequence[i - 2];
        sequence.push(next);
    }
    return sequence;
}function calculateFibonacci(limit) {
    if (limit <= 0) return [];
    if (limit === 1) return [0];

    const sequence = [0, 1];
    while (true) {
        const next = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        if (next > limit) break;
        sequence.push(next);
    }
    return sequence;
}function calculateFibonacci(limit) {
    const sequence = [0, 1];
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= limit) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
}function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

function printFibonacciSequence(limit) {
    for (let i = 1; i <= limit; i++) {
        console.log(`Fibonacci(${i}) = ${fibonacci(i)}`);
    }
}

module.exports = { fibonacci, printFibonacciSequence };function calculateFibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = calculateFibonacci(n - 1, memo) + calculateFibonacci(n - 2, memo);
    return memo[n];
}