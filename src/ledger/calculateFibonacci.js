function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    let fibSequence = [0, 1];
    
    while (fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2] <= n) {
        fibSequence.push(fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2]);
    }
    
    return fibSequence;
}function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib;
}