function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

function generateFibonacciSequence(length) {
    const sequence = [];
    for (let i = 0; i < length; i++) {
        sequence.push(fibonacci(i));
    }
    return sequence;
}

module.exports = { fibonacci, generateFibonacciSequence };