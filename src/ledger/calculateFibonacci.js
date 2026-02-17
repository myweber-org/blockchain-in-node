
function calculateFibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = calculateFibonacci(n - 1, memo) + calculateFibonacci(n - 2, memo);
    return memo[n];
}function calculateFibonacci(limit) {
    const sequence = [0, 1];
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= limit) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
}