function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    let fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib;
}function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function isFibonacciNumber(num) {
    if (num < 0) return false;
    if (num === 0 || num === 1) return true;

    let a = 0;
    let b = 1;
    while (b < num) {
        const temp = b;
        b = a + b;
        a = temp;
    }
    return b === num;
}

module.exports = { calculateFibonacci, isFibonacciNumber };function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    let sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}