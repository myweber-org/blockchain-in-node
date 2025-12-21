function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function isFibonacciNumber(num) {
    if (num < 0) return false;
    if (num === 0 || num === 1) return true;
    
    let a = 0, b = 1;
    while (b < num) {
        const temp = b;
        b = a + b;
        a = temp;
    }
    return b === num;
}

module.exports = { calculateFibonacci, isFibonacciNumber };function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

console.log(fibonacci(10));