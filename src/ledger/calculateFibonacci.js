function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

module.exports = fibonacci;function calculateFibonacci(limit) {
    const sequence = [0, 1];
    
    if (limit <= 0) return [];
    if (limit === 1) return [0];
    
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= limit) {
        const nextValue = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        sequence.push(nextValue);
    }
    
    return sequence;
}

function isFibonacciNumber(num) {
    if (num < 0) return false;
    
    const check1 = Math.sqrt(5 * num * num + 4);
    const check2 = Math.sqrt(5 * num * num - 4);
    
    return Number.isInteger(check1) || Number.isInteger(check2);
}

module.exports = { calculateFibonacci, isFibonacciNumber };